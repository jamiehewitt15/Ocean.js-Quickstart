const { Ocean, DataTokens, Config, ConfigHelper } = require('@oceanprotocol/lib');
const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");

const { Web3 } = require('web3')


const tokenAmount = '100'
const transferAmount = 1
const blob = 'http://localhost:8030/api/v1/provider/services'

const defaultConfig = new ConfigHelper().getConfig('development')

const config = {
  ...defaultConfig,
  metadataCacheUri: 'http://localhost:5000',
  providerUri: 'http://localhost:8030'
}

const contracts = {
  DTFactory: "0x4946dF766a79d105aeD4e2e798c4b35FB75BF7Da",
};

async function init(){
  const ocean = await Ocean.getInstance(config)
  const alice = await ocean.accounts.list()[0]
  const bob = await ocean.accounts.list()[0]

  // create datatoken class
  const datatoken = new DataTokens(
    contracts.DTFactory,
    factoryABI, 
    datatokensABI, 
    new Web3('http://127.0.0.1:8545')
  )
  // deploy datatoken
  const tokenAddress = await datatoken.create(blob, alice)
  console.log('tokenAddress: ', tokenAddress)
  datatoken.mint(tokenAddress, alice, tokenAmount)
}

init()

