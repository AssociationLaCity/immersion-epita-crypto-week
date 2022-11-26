const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    smart_chain_testnet: {
      networkCheckTimeout: 100000,
      provider: () =>
        new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s3.binance.org:8545/`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    smart_chain: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  mocha: {
  },
  plugins: ["truffle-plugin-verify", "truffle-security"],

  api_keys: {
    bscscan: "5M7NM9EPTZTKHICGBB9MUEMNN9RW91TAVY",
  },
  compilers: {
    solc: {
      version: "0.8.13",
    }
  },
};
