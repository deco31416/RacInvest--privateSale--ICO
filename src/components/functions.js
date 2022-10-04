import { ethers } from "ethers";
import CONFIG from './../abi/config.json';
import tokenABI from './../abi/token.json';
import icoAbi from './../abi/abi.json';


export const getTokenBalance = async(signer, address, updateTokenBalance) => {
    const tokenContract = new ethers.Contract(CONFIG.TOKEN_CONTRACT, tokenABI, signer)
    const balanceOf = await tokenContract.balanceOf(address) 
    updateTokenBalance(ethers.utils.formatUnits(balanceOf, CONFIG.TOKEN_DECIMAL))
    console.log(ethers.utils.formatUnits(balanceOf, CONFIG.TOKEN_DECIMAL));
}

export const getICORate = async(signer, updateRate) => {
    const contract = new ethers.Contract(CONFIG.ICO_CONTRACT_ADDRESS, icoAbi, signer)
    const rate = await contract.rate() 
    updateRate(rate.toString())
    console.log(rate.toString());
}

export const getNativeBalance = async (signer, address, updateBNBBalance) => {
    const tokenContract = new ethers.Contract(CONFIG.USDT_ADDRESS, tokenABI, signer)
    const balanceOf = await tokenContract.balanceOf(address) 
    updateBNBBalance(parseFloat(ethers.utils.formatUnits(balanceOf, 6)).toFixed(4))
    console.log(parseFloat(ethers.utils.formatUnits(balanceOf, 6)).toFixed(4))
}