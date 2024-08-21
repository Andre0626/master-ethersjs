import DAI_ABI from '../abi/dai_abi.json' assert { type: 'json' };
import { ethers } from "ethers";
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`);

const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const contract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider);

const main = async () => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();

    console.log(`Symbol: ${symbol}`)
    console.log(`Total supply: ${ethers.utils.formatUnits(totalSupply, 18)}`)
    console.log(`Name: ${name}`)

    const walletBalance = await contract.balanceOf('0x6b175474e89094c44da98b954eedeac495271d0f');
    console.log(`Wallet balance: ${ethers.utils.formatEther(walletBalance)}`);
}

main();