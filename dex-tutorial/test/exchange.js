const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

const dexInterface = require("../abi/dex.json");

contract("DEX", (accounts) => {
    it("should put 10000 TokenA in the first account", async () => {
        const tokenAInstance = await TokenA.deployed();
        const balance = await tokenAInstance.balanceOf(accounts[0]);
        assert.equal(web3.utils.fromWei(balance), 100000, "100000 wasn't in the first account");
    });

    it("should put 10000 TokenB in the first account", async () => {
        const tokenBInstance = await TokenB.deployed();
        const balance = await tokenBInstance.balanceOf(accounts[0]);
        assert.equal(web3.utils.fromWei(balance), 100000, "100000 wasn't in the first account");
    });

    it("should exchange 100 TokenA to TokenB from the dex", async () => {
        const tokenAInstance = await TokenA.deployed();
        const tokenBInstance = await TokenB.deployed();
        console.log("tokenAInstance.address", tokenAInstance.address);
        console.log("tokenBInstance.address", tokenBInstance.address);
        const dexInstance = new web3.eth.Contract(dexInterface, "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3", {
            from: accounts[0],
        })
        const amount = web3.utils.toWei("90000");
        await tokenAInstance.approve("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3", amount);
        await tokenBInstance.approve("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3", amount);
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await dexInstance.methods.addLiquidity(tokenAInstance.address, tokenBInstance.address, amount, amount, amount, amount, accounts[0], now.getTime()).send();
        const balance = await tokenBInstance.balanceOf(accounts[0]);
        assert.equal(web3.utils.fromWei(balance), 10000, "10000 wasn't in the first account");
    })
});
