const {ethers} = require("hardhat");
const {expect} = require("chai")

describe("Voting", function () {
  let voting;
  let owner;
  let notOwner;
  let candidateName = ""; //value in bytes32 (example:- 0x42616c610a000000000000000000000000000000000000000000000000000000)
  let candidateIndex = 0;

  beforeEach(async () => {
    const Voting = await ethers.deployContract("Voting");
    voting = await Voting.waitForDeployment();
    [owner, notOwner] = await ethers.getSigners();
  });

  it("should create a candidate", async () => {
    await voting.connect(owner).CreateCandidate(candidateName);
    expect(await voting.getCandidate()).to.equal(1);
  });
  
  it("should not create a candidate", async() =>{
    await expect(voting.connect(notOwner).CreateCandidate(candidateName))
      .to.be.revertedWith("You are not Owner");
  });
  
  it("should vote only once", async() =>{
    await voting.connect(owner).CreateCandidate(candidateName);
    await voting.Vote(candidateIndex);
    await expect(voting.Vote(candidateIndex))
    .to.be.revertedWith("Already Voted !");
  });

  it("should allow voting for a candidate", async () => {
    await voting.connect(owner).CreateCandidate(candidateName);
    await voting.Vote(candidateIndex);
    const candidate = await voting.Candidates(candidateIndex);
    expect(candidate.votes).to.equal(1, "Number of votes for the candidate should be 1");
  });
});

