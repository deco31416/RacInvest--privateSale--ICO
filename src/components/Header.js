import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import Web3Modal from 'web3modal';
import { GlobalContext } from "../context/GlobalContext";
import logo from './../assets/logo512.png';
import CONFIG from './../abi/config.json';
import tokenABI from './../abi/token.json';
import icoAbi from './../abi/abi.json';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getTokenBalance, getNativeBalance, getICORate} from './functions'

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          56: "https://api.avax-test.network/ext/bc/C/rpc"
        }
      }
    }
  };
  
const HeaderComponent = ({setError, setErrMsg}) => {

    const { account, addAccount, delAccount, updateTokenBalance, updateBNBBalance, updateRate, updateProvider } = useContext(GlobalContext);
    
    // const getTokenBalance = async(signer, address) => {
    //     const tokenContract = new ethers.Contract(CONFIG.TOKEN_CONTRACT, tokenABI, signer)
    //     const balanceOf = await tokenContract.balanceOf(address) 
    //     updateTokenBalance(ethers.utils.formatUnits(balanceOf, CONFIG.TOKEN_DECIMAL))
    //     console.log(ethers.utils.formatUnits(balanceOf, CONFIG.TOKEN_DECIMAL));
    // }

    // const getICORate = async(signer) => {
    //     const contract = new ethers.Contract(CONFIG.ICO_CONTRACT_ADDRESS, icoAbi, signer)
    //     const rate = await contract.rate() 
    //     updateRate(rate.toString())
    //     console.log(rate.toString());
    // }

    // const getNativeBalance = async (signer, address) => {
    //     const tokenContract = new ethers.Contract(CONFIG.USDT_ADDRESS, tokenABI, signer)
    //     const balanceOf = await tokenContract.balanceOf(address) 
    //     updateBNBBalance(parseFloat(ethers.utils.formatUnits(balanceOf, 6)).toFixed(4))
    //     console.log(parseFloat(ethers.utils.formatUnits(balanceOf, 6)).toFixed(4))
    // }
    const connectWallet = async () => {
        const web3modal = new Web3Modal({
            providerOptions
        });
        const instance = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        console.log(provider)
        updateProvider(provider)
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        addAccount({ id: address });
        const network = await provider.getNetwork();
        console.log(network)
        if(network.chainId !== CONFIG.NETWORK_ID ) {
            setError(true) 
            setErrMsg('Contract is not deployed on current network. please choose Avalanche Mainnet')
        } else {
            setError(false) 
            setErrMsg('')
            getTokenBalance(signer, address, updateTokenBalance)
            getNativeBalance(signer, address, updateBNBBalance)
            getICORate(signer, updateRate)
        }
        
    }
    useEffect(()=>{
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', accounts => {
                // addAccount({ id: accounts[0] })
                connectWallet()
            })
            window.ethereum.on('chainChanged', chainId => {
                window.location.reload();
            })
        }
    }, [account]);
    return (
        <div className="w-full flex items-center flex-col">
            <div className="max-w-[250px] p-2">
                <img src={logo} alt="logo" />
            </div>
            <div className="mt-4 sm:mt-0">
                {account ? (
                    <div className="flex items-center flex-col">
                        <a
                            href={`${CONFIG.BLOCKCHAIN_EXPLORER}address/${account}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-[#5c3b17] hover:bg-[#cb903f] rounded text-white">
                            {account.slice(0, 5) + '...' + account.slice(38, 42)}
                        </a>
                        <button className="text-xs text-right hover:text-[#cb903f]" onClick={() => {
                                delAccount()
                                updateProvider(null)
                            }
                        }>Disconnect</button>
                    </div>
                ) : (
                    <button className="px-6 py-2 bg-[#5c3b17] hover:bg-[#cb903f] rounded text-white " onClick={() => connectWallet()}>Connect Wallet</button>
                )}
            </div>

        </div>
    );
};

export default HeaderComponent;
