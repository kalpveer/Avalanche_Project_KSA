import { ethers } from 'ethers';
import AgriCoinConfig from '../contracts/AgriCoin.json';

export const getProvider = () => {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const getContract = async (signer) => {
  if (!signer) return null;
  return new ethers.Contract(
    AgriCoinConfig.contractAddress,
    AgriCoinConfig.abi,
    signer
  );
};

export const mintTokens = async (amount) => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error("No crypto wallet found. Please install MetaMask or Core.");

    const signer = await provider.getSigner();
    const contract = await getContract(signer);
    
    // CustomERC20 mint takes (to, amount)
    // The contract's mint function already adds the 16 decimals
    const tx = await contract.mint(await signer.getAddress(), amount);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Minting failed", error);
    throw error;
  }
};

export const getBalance = async (address) => {
  try {
    const provider = getProvider();
    if (!provider) return "0";
    
    const contract = new ethers.Contract(
      AgriCoinConfig.contractAddress,
      AgriCoinConfig.abi,
      provider
    );
    
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Failed to fetch balance", error);
    return "0";
  }
};
