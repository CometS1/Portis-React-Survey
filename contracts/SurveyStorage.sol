pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "../src/constants.js";

contract SurveyStorage is Ownable{

    using SafeMath for uint256;

    event NewSurvey(string message, string question, uint[] answers);

    uint surveyNumber;

    struct Survey {
        address surveyCreator;
        string question;
        uint[] answers;

        //Note: String arrays are not currently supported by Solidity,
        //so I will hash the answers and save them as uint. When attempting save them, use the keccak256(abi.encodePacked("String here") hash,
        //and to display them you need to convert them back to strings.
    }

    Survey[] public surveys;
    mapping (address => uint) ownerSurveyCount;
    mapping (uint => address) surveyToOwner;

    constructor() public {
        surveyNumber = 0;
    }

    function createNewSurvey(string memory _question, uint[] memory _answers) public {
        surveyNumber++;

        uint surveyId = surveys.push(Survey(msg.sender, _question, _answers)) + 1;
        surveyToOwner[surveyId] = msg.sender;
        ownerSurveyCount[msg.sender] = ownerSurveyCount[msg.sender].add(1);

        emit NewSurvey("Survey created successfully!", _question, _answers);
    }

}
