import React, { Component } from "react";
import Web3 from 'web3';
import "./App.css";
import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/ERC4907Demo.json';

function App() {
  var setUserParam = { tokenId: 1, user: "0x0000000000000000000000000000000000000000", expires: 0 }

  const [currentAccount, setCurrentAccount] = useState(null);
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        // Get network provider and web3 instance.
        const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545');

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        console.log("Network: ", await web3.eth.net.getId());
        const contractAddress = contract.networks[await web3.eth.net.getId()].address;
        const abi = contract.abi;

        // Create a contract instance
        const nftContract = new web3.eth.Contract(abi, contractAddress);
        console.log(nftContract);
        console.log("Initialize payment");

        let nftTxn = await nftContract.methods.mint().send({ from: accounts[0] }).on('receipt', function () {
          console.log('receipt')
        });

        console.log("Mining...please wait");
        console.log("Mined: ", nftTxn.transactionHash);
        alert("mint success")

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }
  const setUserHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {

        // Get network provider and web3 instance.
        const web3 = await new Web3(Web3.givenProvider || 'http://localhost:7545');

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        console.log("Network: ", await web3.eth.net.getId());
        const contractAddress = contract.networks[await web3.eth.net.getId()].address;
        const abi = contract.abi;

        // Create a contract instance
        const nftContract = new web3.eth.Contract(abi, contractAddress);
        console.log(nftContract);
        console.log("Initialize payment");

        let nftTxn = await nftContract.methods.setUser(setUserParam.tokenId, setUserParam.user, setUserParam.expires).send({ from: accounts[0] }).on('receipt', function () {
          console.log('receipt')
        });

        alert("setUser success")

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }


  const changeTokenId = (e) => {
    setUserParam.tokenId = +e.target.value;
    console.log('this.setUserParam.tokenId', setUserParam.tokenId);
  }
  const changeUser = (e) => {
    setUserParam.user = e.target.value;
    console.log('this.setUserParam.user', setUserParam.user);
  }

  const changeExpires = (e) => {
    setUserParam.expires = +e.target.value;
    console.log('this.setUserParam.expires', setUserParam.expires);
  }

  const MainArea = () => {
    return (
      <div>
        <button onClick={mintNftHandler} className='cta-button main-button'>
          Mint NFT
        </button>
        <h3>Set User</h3>

        <fieldset>
          <legend>Token Id</legend>
          <input onChange={changeTokenId} />
        </fieldset>
        <fieldset>
          <legend>User:The new user of the NFT</legend>
          <input onChange={changeUser} />
        </fieldset>
        <fieldset>
          <legend>Expires:UNIX timestamp, The new user could use the NFT before expires</legend>
          <input onChange={changeExpires} />
        </fieldset>
        <button onClick={setUserHandler} className='cta-button main-button'>
          Set User
        </button>
      </div>
    );
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='App'>
      <div className='main-app'>
        {currentAccount ? MainArea() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;