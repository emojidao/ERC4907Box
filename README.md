# Truffle Box For ERC4907

- [Truffle Box For ERC4907](#Truffle-Box-For-ERC4907)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Installation](#installation)
  - [Support](#support)

## Requirements

The Truffle Box For ERC4907 has the following requirements:

- [Node.js](https://nodejs.org/) 14.x or later
- [NPM](https://docs.npmjs.com/cli/) version 5.2 or later
- [Truffle](https://trufflesuite.com/docs/truffle/how-to/install/)
- [Ganache](https://github.com/trufflesuite/ganache#getting-started)
- Windows, Linux or MacOS

Helpful, but optional:
- An [Infura](https://infura.io/) account and Project ID
- A [MetaMask](https://metamask.io/) account

## Setup

## Installation

1. First ensure you are in a new and empty directory.
    ```shell
    truffle unbox emojidao/Truffle-Box-For-ERC4907
    ```
    If you want to create a directory, you can also run:
    ```shell
    truffle unbox emojidao/Truffle-Box-For-ERC4907 <Directory Name>
    ```
    Running the `unbox` command should install the required dependencies.

2. Now, run the development console. This will spin up and allow you to interact with `ganache`, a local test chain on `localhost:9545`.
    ```shell
    truffle develop
    ```

3. Compile and migrate the smart contracts. Running `migrate` will do both. Note inside the development console we don't have to preface commands with `truffle`.
    ```shell
    migrate
    ```

4. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm install
    npm run start
    ```

5. After migrating your contracts, head to the `client` directory and run `npm run start` to view the application in your `http://localhost:3000/`.

6. To mint your first NFT, you'll need to connect your wallet to a network. To do so, make sure your development console is still running. Then, connect to that network using your wallet. Afterwards, you'll need to use a funded account. You can import an account to your MetaMask wallet by using a private key outputted by the development console.

7. If you minted your NFT on `localhost:9545` on the developer console, you should be able to see the mint on your MetaMask wallet. If you deploy to `Goerli`, you will be able to see the NFT on their test-net site [here](https://testnets.opensea.io/).

8. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```

## Deployment

To deploy your contracts to a public network (such as a testnet or mainnet) there are two approaches. The first uses [Truffle Dashboard](https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard.html) which provides "an easy way to use your existing MetaMask wallet for your deployments". The second, requires copying your private key or mnemonic into your project so the deployment transactions can be signed prior to submission to the network.

### Using Truffle Dashboard (recommended)

Truffle Dashboard ships with Truffle and can be started with `truffle dashboard`. This in turn loads the dashboard at http://localhost:24012 and beyond that you'll just need to run your migration (`truffle migrate --network dashboard`). A more detailed guide to using Truffle Dashboard is available [here](https://trufflesuite.com/blog/introducing-truffle-dashboard/).

### Using the env File

You will need at least one mnemonic to use with the network. The `.dotenv` npm package has been installed for you, and you will need to create a `.env` file for storing your mnemonic and any other needed private information.

The `.env` file is ignored by git in this project, to help protect your private data. In general, it is good security practice to avoid committing information about your private keys to github. The `truffle-config.js` file expects a `MNEMONIC` value to exist in `.env` for running commands on each of these networks, as well as a default `MNEMONIC` for the Arbitrum network we will run locally.

If you are unfamiliar with using `.env` for managing your mnemonics and other keys, the basic steps for doing so are below:

1) Use `touch .env` in the command line to create a `.env` file at the root of your project.
2) Open the `.env` file in your preferred IDE
3) Add the following, filling in your own Infura project key and mnemonics:

```
MNEMONIC="<YOUR MNEMONIC HERE>"
INFURA_KEY="<Your Infura Project ID>"
RINKEBY_MNEMONIC="<Your Rinkeby Mnemonic>"
MAINNET_MNEMONIC="<Your Mainnet Mnemonic>"
```

4) As you develop your project, you can put any other sensitive information in this file. You can access it from other files with `require('dotenv').config()` and refer to the variable you need with `process.env['<YOUR_VARIABLE>']`.

## Support

Support for this box is available via the Truffle community available [here](https://www.trufflesuite.com/community).
