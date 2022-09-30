import { ethers } from 'ethers'
import axieABI from './axieABI.json'

const contractAddress = "0x32950db2a7164ae833121501c797d79e7b79d74c"

export const getGenesOnChain = async (axieId: number)=>{
    
    const provider = new ethers.providers.JsonRpcProvider('https://api.roninchain.com/rpc');
            
    const AxieContract = new ethers.Contract(contractAddress, axieABI.abi, provider);
    
    const axieState = await AxieContract.axie(axieId)

    const x = BigInt(axieState.genes.x).toString(2).padStart(256, '0')
    const y = BigInt(axieState.genes.y).toString(2).padStart(256, '0')
    const z = "0x" + BigInt('0b' + (x + y)).toString(16)

    return z

}