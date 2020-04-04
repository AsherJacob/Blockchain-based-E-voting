# De-Mocracy (Decentralized Democracy)

Voting is one of the founding pillars of any democracy and hence it is imperative that this process is carried out in the most secure and transparent way. Existing voting systems are centralized in nature, are susecptible to tampering, and have often raised suspicion among the common man. We aim to build a decentralized voting application where eligble voters will be able to register, cast their vote and personally verify these votes. 

## Getting Started

This web application uses NodeJS along with the ExpressJS framework to develop the server and MongoDB as our database. For the blockchain aspect of this application, we use the ethereum blockchain to deploy our smart contracts and store data. 

### Prerequisites

The following dependencies need to be installed before moving forward

```
nodejs
npm (node package manager)
Metamask  (extension in your Web browser)
web3js
ganache-cli
```


### Installing

First, clone the repository using the command

```
git clone https://github.com/debindv/integration3
```
After cloning the repository, navigate into the directory and run the following command to install the other dependencies 

```
npm install
```

After installing nodejs and npm, open your terminal and execute the following command

```
npm i -g ganache-cli
```


## Setting up Blockchain environment


Run ganache with this command

```
ganache-cli
```

Next open Metamask and move to the Localhost:8545 network

Then copy one of the private keys shown in your terminal and import an account.

Go to  remix.ethereum.org and paste the smart contract (Election.sol)
Then compile it and copy the ABI of the smart contract and paste it in the contractABI field in app.js.
Before deploying it, make sure the 'Environment' field has 'Web3 Provider'.

Once its deployed, copy the contract address and paste it in app.js next to the variable contractAddress and copy the account address and paste it next to the variable coinbase


## Deployment

In another terminal, run the command

```
npm start
```
When the project is successfully run navigate to localhost:3000 there you will get the projects landing page.

## Group Members

* Debin D Varghese
* Udaya Shanker M
* Joan Iype Zacharia
* Asher Jacob


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Brad Traversy - It was through his videos on YouTube channel , Traversy Media that we learned to set up a server and perform user authentication
* Akhil (itsmeakhil) - Whose ethmedichain repository helped us to integrate the blockchain part of this app.

