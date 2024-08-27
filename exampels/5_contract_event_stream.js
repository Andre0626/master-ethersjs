import { ethers } from "ethers";
import DAI_ABI from '../abi/dai_abi.json' assert { type: 'json' };

import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`);
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider);
const main = async () => {
    const latestBlock = await provider.getBlockNumber();

    const transferEvents = await daiContract.queryFilter('Transfer', latestBlock - 10, latestBlock);
    console.log('Transfer events:', transferEvents);
}

main();