import { Ocean, DataTokens, Config, ConfigHelper } from '@oceanprotocol/lib' 
import factoryABI from '@oceanprotocol/contracts/artifacts/DTFactory.json'
import datatokensABI from '@oceanprotocol/contracts/artifacts/DataTokenTemplate.json'

import Web3 from 'web3'
const web3 = new Web3('http://127.0.0.1:8545')

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
    web3
  )
  // deploy datatoken
  const tokenAddress = await datatoken.create(blob, alice)
  datatoken.mint(tokenAddress, alice, tokenAmount)
}

init()

