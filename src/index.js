import { Ocean, DataTokens, Logger, Config, ConfigHelper, contracts } from '@oceanprotocol/lib' 
import factory from '@oceanprotocol/contracts/artifacts/DTFactory.json'
import datatokensTemplate from '@oceanprotocol/contracts/artifacts/DataTokenTemplate.json'
import { TestContractHandler } from './TestContractHandler.js' // There is no export of `TestContractHandler` from the @oceanprotocol package

import Web3 from 'web3'
// import { AbiItem } from 'web3-utils/types';
const web3 = new Web3('http://127.0.0.1:8545')

const tokenAmount = '100'
const transferAmount = 1
const blob = 'http://localhost:8030/api/v1/provider/services'

const defaultConfig = new ConfigHelper().getConfig(
  'rinkeby',
  'YOUR_INFURA_PROJECT_ID'
)

const config = {
  ...defaultConfig,
  metadataCacheUri: 'https://your-metadata-cache.com',
  providerUri: 'https://your-provider.com'
}

async function init(){
  const ocean = await Ocean.getInstance(config)
  const alice = await ocean.accounts.list()[0]
  const bob = await ocean.accounts.list()[0]

  // Initialize Ocean contracts v3
  // const contracts = new contracts(
  //   factory.abi,
  //   datatokensTemplate.abi,
  //   datatokensTemplate.bytecode,
  //   factory.bytecode,
  //   web3
  // )

  // create datatoken class
  const datatoken = new DataTokens(
    contracts.factoryAddress,
    factory.abi, 
    datatokensTemplate.abi, 
    web3,
    Logger
  )
  // deploy datatoken
  const tokenAddress = await datatoken.create(blob, alice)
  datatoken.mint(tokenAddress, alice, tokenAmount)
}

init()

