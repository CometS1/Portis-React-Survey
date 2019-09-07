pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SurveyStorage.sol";

contract TestSimpleStorage {
    function testItStoresASurvey() public {

        //TODO: Test for storing a survey
        SurveyStorage surveyStorage = SurveyStorage(DeployedAddresses.SurveyStorage());


        surveyStorage.set(89);

        uint expected = 89;

        Assert.equal(surveyStorage.storedData(), expected, "It should store the value 89.");
    }
}