import { ethers } from "ethers";
import ERC20_ABI from '../abi/ERC20_abi.json' assert { type: 'json' };

import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://rpc.sepolia.org`);

const sender = '0xBB54830c3614b7F75d529b4592B0dA361b0D1BdD';
const receiver = '0x859b68bE9CfB36239D0B9F43eeF9221112b79334';

const senderWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const tokenAddress = '0x779877A7B0D9E8603169DdbD7836e478b4624789';
const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
const main = async () => {

    const balance = await contract.balanceOf(sender);
    console.log(`Balance of sender: ${ethers.utils.formatUnits(balance, 18)}`);

    const contractConnected = contract.connect(senderWallet);
    const tx = await contractConnected.transfer(receiver, ethers.utils.parseUnits('1', 18));
    await tx.wait();
    console.log('Transaction:', tx);

    const receiverBalance = await contract.balanceOf(receiver);
    console.log('Receiver balance:', ethers.utils.formatUnits(receiverBalance, 18));

    const senderBalanceAfter = await contract.balanceOf(sender);
    console.log('Sender balance after:', ethers.utils.formatUnits(senderBalanceAfter, 18));
}

main();