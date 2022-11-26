const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

module.exports = function (deployer) {
  deployer.deploy(TokenA, "0x9BBD4f0D7C053a20E9159DB916AF84398Fbc729f");
  deployer.deploy(TokenB, "0x9BBD4f0D7C053a20E9159DB916AF84398Fbc729f");
};

