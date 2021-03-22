const Web3 = require("web3");
const web3 = new Web3('http://127.0.0.1:8545')
const { Ocean, DataTokens, Logger } = require("@oceanprotocol/lib");

const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");

import { Ocean, DataTokens, Logger } from '@oceanprotocol/lib' 
import { TestContractHandler } from '../TestContractHandler'
import { LoggerInstance } from '../../src/utils'
const Web3 = require('web3')

const factory = require('@oceanprotocol/contracts/artifacts/DTFactory.json')
const datatokensTemplate = require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json')

// Alice's config
const config = {
  metadataCacheUri: 'http://aquarius:5000',
  providerUri: 'http://localhost:8030',
  nodeUri: `http://localhost:${process.env.ETH_PORT || 8545}`,
  verbose: LogLevel.Error,
  web3Provider: web3,
  factoryAddress: '0x123456789...'
}
async function init(){
  const ocean = await Ocean.getInstance(config)
  const alice = (await ocean.accounts.list())[0]

  const datatoken = new DataTokens(
    config.factoryAddress,
    factory.abi,
    datatokensTemplate.abi,
    web3,
    LoggerInstance
  )
  const data = { t: 1, url: ocean.config.metadataCacheUri }
  const blob = JSON.stringify(data)

  const dataTokenAddress = await datatoken.create(blob, alice.getId())
}
init()



const asset = {
  main: {
    type: 'dataset',
    name: 'test-dataset',
    dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z', // remove milliseconds
    author: 'oceanprotocol-team',
    license: 'MIT',
    files: [
      {
        url:
          'https://raw.githubusercontent.com/tbertinmahieux/MSongsDB/master/Tasks_Demos/CoverSongs/shs_dataset_test.txt',
        checksum: 'efb2c764274b745f5fc37f97c6b0e761',
        contentLength: '4535431',
        contentType: 'text/csv',
        encoding: 'UTF-8',
        compression: 'zip'
      }
    ]
  }
}

// create a service
service1 = await ocean.assets.createAccessServiceAttributes(
  alice,
  10, // set the price in datatoken
  new Date(Date.now()).toISOString().split('.')[0] + 'Z', // publishedDate
  0 // timeout
)

// publish asset
const ddo = await ocean.assets.create(asset, alice, [downloadService], dataTokenAddress)

const did = ddo.id