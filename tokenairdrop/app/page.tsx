"use client";

import AirdropStatistics from "@/components/canvas/AirdropStatistics";
import { Button } from "@/components/ui/button";
import { useAnchorProgram } from "@/providers/anchor-provider";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
  const { wallet } = useAnchorProgram();
  const adminWallet = process.env.NEXT_PUBLIC_ADMIN_ADDRESS; 
  const [airdropAmount, setAirdropAmount] = useState("");

  const [connectedWalletAddress, setConnectedWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    setConnectedWalletAddress(wallet?.publicKey?.toString() || null);
  }, [wallet]);

  const InitializeAirdrop = () => {
    console.log("Wallet Address:", connectedWalletAddress);
    console.log(adminWallet)
    console.log(airdropAmount)
  };


  if (connectedWalletAddress === null) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div>
      <div className="mb-8 flex flex-row justify-between">
      <h2>Token Airdrop</h2>

      {/* Dialog for Admin Panel */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Admin Panel</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Initialize Airdrop</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter airdrop amount"
              value={airdropAmount}
              onChange={(e) => setAirdropAmount(e.target.value)}
            />
            <Button variant="secondary" onClick={InitializeAirdrop}>Initialize Airdrop</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>

        <p>Connected Wallet: {connectedWalletAddress}</p>

        <AirdropStatistics />
      </div>
    </>
  );
}




// {connectedWalletAddress === adminWallet ? (
//   <Button onClick={InitializeAirdrop}>Admin Panel</Button>
// ) : (
//   <Button>User Panel</Button>
// )}