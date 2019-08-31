const SurveyStorage = artifacts.require("SurveyStorage");

contract("SurveyStorage", accounts => {
  it("...should store the survey Are You The Video Game Boy?", async () => {
    const surveyStorageInstance = await SurveyStorage.deployed();

    // TODO: Set survey question and answers
    await surveyStorageInstance.set("Are You The Video Game Boy?", { from: accounts[0] });

    // Get survey question and answers
    const storedData = await surveyStorageInstance.storedData.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
