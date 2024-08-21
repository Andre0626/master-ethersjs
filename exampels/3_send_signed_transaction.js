import { ethers } from "ethers";
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://rpc.sepolia.org`);

const sender = '0xBB54830c3614b7F75d529b4592B0dA361b0D1BdD';
const receiver = '0x859b68bE9CfB36239D0B9F43eeF9221112b79334';

const senderWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(sender);
    console.log(`Sender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`);

    const receiverBalanceBefore = await provider.getBalance(receiver);
    console.log(`Receiver balance: ${ethers.utils.formatEther(receiverBalanceBefore)}`);

    const sendTx = await senderWallet.sendTransaction({
        to: receiver,
        value: ethers.utils.parseEther('0.02')
    });

    await sendTx.wait();
    console.log(`Transaction hash: ${sendTx}`);

    const senderBalanceAfter = await provider.getBalance(sender);
    console.log(`Sender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`);

    const receiverBalanceAfter = await provider.getBalance(receiver);
    console.log(`Receiver balance: ${ethers.utils.formatEther(receiverBalanceAfter)}`);

}

main();