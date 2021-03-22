const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");

const urls = {
  networkUrl: "http://localhost:8545",
  aquarius: "http://localhost:5000",
  providerUri: "http://localhost:8030",
};

const contracts = {
    "DTFactory": "0xc354ba9AD5dF1023C2640b14A09E61a500F21546",
    "BFactory": "0xF152cF3c67dFD41a317eAe8fAc0e1e8E98724A13",
    "FixedRateExchange": "0x336EFb3c9E56F713dFdA4CDB3Dd0882F3226b6eE",
    "Metadata": "0xfeA10BBb093d7fcb1EDf575Aa7e28d37b9DcFcE9",
    "Ocean": "0xEBe77E16736359Bf0F9013F6017242a5971cAE76"
};

const config = {
  ...defaultConfig,
  metadataCacheUri: urls.aquarius,
  providerUri: urls.providerUri,
  web3Provider: new Web3(urls.networkUrl),
};

module.exports = {
  config,
  contracts,
  urls,
};