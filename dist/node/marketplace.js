"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("@oceanprotocol/lib");
var DTFactory_json_1 = __importDefault(require("@oceanprotocol/contracts/artifacts/DTFactory.json"));
var DataTokenTemplate_json_1 = __importDefault(require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json"));
var web3_1 = __importDefault(require("web3"));
var web3 = new web3_1.default('http://127.0.0.1:8545');
var config = {
    metadataCacheUri: 'http://aquarius:5000',
    providerUri: 'http://localhost:8030',
    nodeUri: "http://localhost:" + (process.env.ETH_PORT || 8545),
    verbose: lib_1.LogLevel.Error,
    web3Provider: web3,
    factoryAddress: '0x123456789...'
};
var ocean = await lib_1.Ocean.getInstance(config);
var alice = (await ocean.accounts.list())[0];
var datatoken = new lib_1.DataTokens(config.factoryAddress, DTFactory_json_1.default.abi, DataTokenTemplate_json_1.default.abi, web3, lib_1.Logger);
var data = { t: 1, url: ocean.config.metadataCacheUri };
var blob = JSON.stringify(data);
var dataTokenAddress = await datatoken.create(blob, alice.getId());
//# sourceMappingURL=marketplace.js.map