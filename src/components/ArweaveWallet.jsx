import React, { useState } from "react";
import Arweave from "arweave";
import { ethers } from "ethers";
import './ArweaveWallet.css';
import bgPateng from '../assets/bgpateng.png'; // Import gambar dari folder assets

const ArweaveWallet = () => {
  const [address, setAddress] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [walletFile, setWalletFile] = useState(null);

  const generateWallet = async () => {
    const arweave = Arweave.init();
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;

    const arweaveWallet = await arweave.wallets.generate();
    const address = await arweave.wallets.jwkToAddress(arweaveWallet);

    setAddress(address);
    setSeedPhrase(mnemonic);
    setWalletFile(new Blob([JSON.stringify(arweaveWallet)], { type: 'application/json' }));
  };

  const downloadWallet = () => {
    const url = URL.createObjectURL(walletFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arweave_wallet.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="wallet-container">
      <div className="header">
        <img src={bgPateng} alt="Profile" className="profile-image" />
        <h1>GENERATE AR WALLET</h1>
      </div>
      <button className="generate-btn" onClick={generateWallet}>Generate</button>
      {address && (
        <div className="wallet-info">
          <div className="info-section">
            <h3>Your Address:</h3>
            <span>{address}</span>
          </div>
          <div className="info-section">
            <h3>Seed Phrase:</h3>
            <span>{seedPhrase}</span>
          </div>
          <button className="download-btn" onClick={downloadWallet}>Download Json Wallet</button>
        </div>
      )}
      <footer>
        <p>Created By : <a href="https://t.me/bangpateng_airdrop" target="_blank" rel="noopener noreferrer">Bang Pateng</a></p>
      </footer>
    </div>
  );
};

export default ArweaveWallet;
