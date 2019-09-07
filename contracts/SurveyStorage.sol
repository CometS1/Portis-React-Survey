pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract SurveyStorage is Ownable{

    using SafeMath for uint256;

    event NewSurvey(string message, string question, string answer1, string answer2);

    struct Survey {
        address surveyCreator;
        string question;
        string answer1;
        string answer2;

        //Note: String arrays are not currently supported by Solidity,
        //so I will hash the answers and save them as uint. When attempting save them, use the keccak256(abi.encodePacked("String here") hash,
        //and to display them you need to convert them back to strings.
    }

    Survey[] public surveys;
    mapping (address => uint) ownerSurveyCount;
    mapping (uint => address) surveyToOwner;

    constructor() public {
    }

    function createNewSurvey(string memory _question, string memory _answer1, string memory _answer2) public {

        uint surveyId = surveys.push(Survey(msg.sender, _question, _answer1, _answer2)) + 1;
        surveyToOwner[surveyId] = msg.sender;
        ownerSurveyCount[msg.sender] = ownerSurveyCount[msg.sender].add(1);

        emit NewSurvey("Survey created successfully!", _question, _answer1, _answer2);
    }

    function test() public pure returns (uint) {
        return 1;
    }

    function retrieveSurveyQuestion() public view returns (string memory question) {
        return surveys[0].question;
    }

    function retrieveSurveyAnswer1() public view returns (string memory answer1) {
        return surveys[0].answer1;
    }

    function retrieveSurveyAnswer2() public view returns (string memory answer2) {
        return surveys[0].answer2;
    }

}
