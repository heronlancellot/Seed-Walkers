import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NFT from '../components/NFT'
import Walker from '../components/Walker'

import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";

export default function Home() {

  const [WalletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 5) {
        window.alert("Change the network to Goerli");
        throw new Error("Change newtork to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {

    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(err){
      console.error(err);
    }
  };

  useEffect(() => {

    if(!WalletConnected) {

      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }

  }, [WalletConnected]);

  const ButtonMetamask = () => {

    if(!WalletConnected){
        return (
          <button onClick={connectWallet}> 
            Connect your Wallet
          </button>
        )
      };
  }

  return (
    <>
      <Head>
        <title>Seed-Walker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ButtonMetamask/>
      <Header/>
      <NFT/>
      <Walker/>
      <Footer/>
      
    </>
  )
}
