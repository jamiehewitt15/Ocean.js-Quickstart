const Web3 = require("web3");
const { Ocean, DataTokens } = require("@oceanprotocol/lib");

const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");
const { testData } = require("./data");

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

const init = async () => {
  const ocean = await Ocean.getInstance(config);
  const blob = `http://localhost:8030/api/v1/services/consume`;

  const accounts = await ocean.accounts.list();
  const alice = accounts[0].id;
  const marketplace = accounts[1].id;
  console.log('Marketplace account address:', marketplace)
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

  dataService = await ocean.assets.createAccessServiceAttributes(
    accounts[0],
    10, // set the price in datatoken
    new Date(Date.now()).toISOString().split(".")[0] + "Z", // publishedDate
    0 // timeout
  );

  // publish asset
  const ddo = await ocean.assets.create(
    testData,
    accounts[0],
    [dataService],
    tokenAddress
  );

  const dataId = ddo.id;
  console.log('Data ID:', dataId);

  console.log('ddo.dataToken:', ddo.dataToken);
  console.log('tokenAddress:', tokenAddress);
  

await datatoken.approve(
    tokenAddress,
    marketplace, // marketplace address,
    '100', // marketplaceAllowance
    alice
)

 const marketplaceAllowance = await datatoken.allowance(
    tokenAddress,
    alice,
    marketplace, // marketplace address,
 );

 console.log("Marketplace Allowance:", marketplaceAllowance);

// Marketplace withdraw Alice tokens from allowance
await datatoken.transferFrom(tokenAddress, alice, '100', marketplace)
const marketplaceBalance = await datatoken.balance(tokenAddress, marketplace)
aliceBalance = await datatoken.balance(tokenAddress, alice)

console.log("Marketplace balance:", marketplaceBalance)
console.log("Alice balance:", aliceBalance)

const asset = await ocean.assets.resolve(dataId)
const accessService = await ocean.assets.getServiceByType(asset.id, 'access')
console.log("accessService", accessService)

};

init();