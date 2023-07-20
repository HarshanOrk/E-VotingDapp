# E-Voting Dapp

We build a simple E-Voting Dapp for ethereum blockchain. Follow the below instructions to run this Dapp on your machine.

## First Step:-
Environment Setup:- 
1. [Nodejs](https://nodejs.org/en)
2. [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation)
3. [Ganache](https://trufflesuite.com/ganache/)
4. [Reactjs](https://react.dev/learn/start-a-new-react-project)

## Second Step:- 
Create a new folder and clone this repo using 
```
https://github.com/HarshanOrk/E-VotingDapp.git
```
Once you done cloning. install the node modules 
```
npm install 
```
After the installation of node modules. Connect  to ganache from the hardhat by adding config to the hardhat.config.js file.
```
module.exports = {
  solidity: "0.8.17",
  networks:{
    ganache:{
      url:"", //Provider(Ganache) URL, eg:- http://127.0.0.1:7545
      accounts:["privatekey-1"] // Replace the privatekey-1  with Ganache address(Privatekey)
    }
  }
};
```
## Third Step:-
Compile SmartContract
```
npx hardhat compile
```

Run deploy.js file
```
npx hardhat run scripts/deploy.js --network ganache
```

## Final Step:-
Now run React app inside my-app/src folder.

### Contact:
If you face any error or issue feel free to [contact](https://telegram.me/Harshan_Ork) me
