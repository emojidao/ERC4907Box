var ERC4907Demo = artifacts.require("./ERC4907Demo.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC4907Demo,"ERC4907","4907");
};
