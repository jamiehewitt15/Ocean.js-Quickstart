const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");

const urls = {
  networkUrl: "http://localhost:8545",
  aquarius: "http://localhost:5000",
  providerUri: "http://localhost:8030",
};

const contracts = {
  "DTFactory": "0x_YOUR_DTFactory_ADDRESS_",
  "BFactory": "0x_YOUR_DTFactory_ADDRESS_",
  "FixedRateExchange": "0x_YOUR_DTFactory_ADDRESS_",
  "Metadata": "0x_YOUR_Metadata_ADDRESS_",
  "Ocean": "0x_YOUR_Ocean_ADDRESS_"
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