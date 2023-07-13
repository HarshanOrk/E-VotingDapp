const { ethers } = require("hardhat")

async function main(){
     
  const contract = await ethers.getContractFactory("Voting")
  const transaction = await contract.deploy();
  await transaction.deployed();
  console.log(`Contract deployed at: ${transaction.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})