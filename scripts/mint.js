/*
  You can use this script to quickly manually mintNFTs. To do so:
  Run `truffle exec ./scripts/mint.js`
 */
var ERC4907Demo = artifacts.require("./ERC4907Demo.sol");

function getErrorMessage(error) {
  if (error instanceof Error) return error.message
  return String(error)
}

const main = async (cb) => {
  try {
    const demo = await ERC4907Demo.deployed();
    const txn = await demo.mint();
    console.log(txn);
  } catch(err) {
    console.log('Doh! ', getErrorMessage(err));
  }
  cb();
}

module.exports = main;