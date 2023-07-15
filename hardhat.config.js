require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    localganache:{
      url:"http://127.0.0.1:7545",
      accounts:["",""]//Private key
    }
  }
};

//npx hardhat run ./scripts/deploy.js --network localganache
