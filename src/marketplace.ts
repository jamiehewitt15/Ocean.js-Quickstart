
import { Ocean, DataTokens, Logger, LogLevel } from '@oceanprotocol/lib' 
import factory from '@oceanprotocol/contracts/artifacts/DTFactory.json'
import { TestContractHandler } from '../TestContractHandler'
// import { LoggerInstance } from '../../src/utils'
import datatokensTemplate from '@oceanprotocol/contracts/artifacts/DataTokenTemplate.json'

import Web3 from 'web3'
const web3 = new Web3('http://127.0.0.1:8545')

// Alice's config
const config = {
  metadataCacheUri: 'http://aquarius:5000',
  providerUri: 'http://localhost:8030',
  nodeUri: `http://localhost:${process.env.ETH_PORT || 8545}`,
  verbose: LogLevel.Error,
  web3Provider: web3,
  factoryAddress: '0x123456789...'
}
const ocean = await Ocean.getInstance(config)
const alice = (await ocean.accounts.list())[0]

const datatoken = new DataTokens(
  config.factoryAddress,
  factory.abi,
  datatokensTemplate.abi,
  web3,
  Logger
)
const data = { t: 1, url: ocean.config.metadataCacheUri }
const blob = JSON.stringify(data)

const dataTokenAddress = await datatoken.create(blob, alice.getId())