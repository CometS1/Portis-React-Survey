var SurveyStorage = artifacts.require("SurveyStorage");

module.exports = function(deployer) {
  deployer.deploy(SurveyStorage);
};
