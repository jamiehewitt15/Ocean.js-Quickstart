const Web3 = require("web3");
const { Ocean, DataTokens } = require("@oceanprotocol/lib");

const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");
const { testData } = require("./data");



const init = async () => {
  const ocean = await Ocean.getInstance(config);
  const blob = `http://localhost:8030/api/v1/services/consume`;

  const accounts = await ocean.accounts.list();
  const alice = accounts[0].id;
  const bob = accounts[1].id;
  console.log('Bob account address:', bob);
  console.log('Alice account address:', alice)

  const datatoken = new DataTokens(
    contracts.DTFactory,
    factoryABI,
    datatokensABI,
    new Web3(urls.networkUrl)
  );
  const tokenAddress = await datatoken.create(blob, alice);
  console.log(`Deployed datatoken address: ${tokenAddress}`);

  await datatoken.mint(tokenAddress, alice, '100', alice)
  let aliceBalance = await datatoken.balance(tokenAddress, alice)
  console.log('Alice token balance:', aliceBalance)

  const transaction = await datatoken.transfer(tokenAddress, bob, '50', alice)
  const transactionId = transaction['transactionHash']
  console.log('transactionId', transactionId)

  const bobBalance = await datatoken.balance(tokenAddress, bob)
  aliceBalance = await datatoken.balance(tokenAddress, alice)

  console.log('Alice token balance:', aliceBalance)
  console.log('Bob token balance:', bobBalance)

  dataService = await ocean.assets.createAccessServiceAttributes(
    accounts[0],
    10, // set the price in datatoken
    new Date(Date.now()).toISOString().split(".")[0] + "Z", // publishedDate
    0 // timeout
  );

  // publish asset
  const createData = await ocean.assets.create(
    testData,
    accounts[0],
    [dataService],
    tokenAddress
  );

  const dataId = createData.id;
  console.log('Data ID:', dataId);

  const dataDownload = await ocean.assets.simpleDownload(tokenAddress, urls.providerUri, transactionId, bob)
  console.log('dataDownload', dataDownload)
};

init();