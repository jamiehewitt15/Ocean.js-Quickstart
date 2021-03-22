const Web3 = require("web3");
const web3 = new Web3('http://127.0.0.1:8545')

const { Ocean, DataTokens, Config, ConfigHelper } = require('@oceanprotocol/lib');
const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");


const tokenAmount = '100'
const transferAmount = 1
const blob = 'http://localhost:8030/api/v1/provider/services'

const defaultConfig = new ConfigHelper().getConfig('development')

const config = {
  ...defaultConfig,
  metadataCacheUri: 'http://localhost:5000',
  providerUri: 'http://localhost:8030',
  web3Provider: new Web3(urls.networkUrl),
}

const contracts = {
  "DTFactory": "0xc354ba9AD5dF1023C2640b14A09E61a500F21546",
  "BFactory": "0xF152cF3c67dFD41a317eAe8fAc0e1e8E98724A13",
  "FixedRateExchange": "0x336EFb3c9E56F713dFdA4CDB3Dd0882F3226b6eE",
  "Metadata": "0xfeA10BBb093d7fcb1EDf575Aa7e28d37b9DcFcE9",
  "Ocean": "0xEBe77E16736359Bf0F9013F6017242a5971cAE76"
};

async function init(){

  const ocean = await Ocean.getInstance(config)
  const alice = (await ocean.accounts.list())[0]

  // const alice = await ocean.accounts.list()[0]
  // const bob = await ocean.accounts.list()[0]
  

  // create datatoken class
  const datatoken = new DataTokens(
    contracts.DTFactory,
    factoryABI, 
    datatokensABI, 
    web3
  )
  // deploy datatoken
  const tokenAddress = await datatoken.create(blob, alice)
  console.log('tokenAddress: ', tokenAddress)
  datatoken.mint(tokenAddress, alice, tokenAmount)
}

init()

