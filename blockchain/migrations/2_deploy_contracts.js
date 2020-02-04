var Election = artifacts.require("./Election.sol");
//artifacts respresents the contract abstarction that is specific to truffle
module.exports = function(deployer) {
  deployer.deploy(Election);
};
