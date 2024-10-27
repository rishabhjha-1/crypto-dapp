import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function SendTokens() {
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey as PublicKey,
                    toPubkey: new PublicKey(to),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            await wallet.sendTransaction(transaction, connection);
            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error("Error sending SOL:", error);
            alert("Transaction failed. Check console for details.");
        }
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="To" 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}
