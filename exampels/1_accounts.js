import { ethers } from "ethers";
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`);
const address = '0x51f332bd2e8a8a0e94ead05425efd35fe0e8434c';

const main = async () => {
const balance = await provider.getBalance(address);
console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
}

main();