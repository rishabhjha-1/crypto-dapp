import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { useState } from "react"

export function Airdrop() {
    const wallet=useWallet()
    const [sol,setSol]=useState<number>()
    const {connection}=useConnection()
    async function sendAirDropToUser(){
        await connection.requestAirdrop(wallet.publicKey as PublicKey ,2*1000000000)
    }
  return (
    <div>
        <input type="text" placeholder="enter amount" value={sol} onChange={(e) => setSol(Number(e.target.value))} />
        <button onClick={sendAirDropToUser}>Send AirDrop</button>
    </div>
  )
}
