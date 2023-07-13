const { ethers } = require("hardhat")

async function main(){
  const Voting = await ethers.getContractFactory("Voting")
  const voting = await Voting.attach("0xf3fBAF233EC6728464BaF57A69b7A57C53E13c94")
  const transaction = await voting.CreateCandidate("0x42616c610a000000000000000000000000000000000000000000000000000000");
  await transaction.wait();
  console.log("Transaction Completed", transaction)


  const totalCandidates = await voting.getCandidate();
  console.log(totalCandidates)
}

main()
.catch((error) =>{
    console.error(error);
    process.exitCode = 1;
})