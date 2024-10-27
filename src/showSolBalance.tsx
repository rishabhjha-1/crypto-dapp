import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance,setBalance]=useState(0)

    async function getBalance() { 
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        }
    }
    
    getBalance();
    return <div>
        <p>SOL Balance:</p> <div id="balance">{balance}</div>
    </div>
}