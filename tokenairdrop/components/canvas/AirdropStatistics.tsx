import React, { useEffect, useState } from "react";
import Card from "./Card";
import { PublicKey } from "@solana/web3.js";
import { getAirdropData } from "@/hooks/instructionHooks/getAirdropData";

interface AirdropData {
  totalTokens: number;
  tokensDistributed: number;
  claimedAddresses: PublicKey[];
}

const AirdropStatistics = () => {
  const { fetchAirdropData } = getAirdropData();
  
  const [airdropData, setAirdropData] = useState<AirdropData>({
    totalTokens: 0,
    tokensDistributed: 0,
    claimedAddresses: [],
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAirdropData();
      if (data) {
        setAirdropData({
          totalTokens: data.totalTokens,
          tokensDistributed: data.tokensDistributed,
          claimedAddresses: data.claimedAddresses || [], 
        });
      }
    };
    getData();
  }, [fetchAirdropData]);

  return (
    <div className="flex flex-row gap-4 m-8">
      <Card title="Total Tokens" number={airdropData.totalTokens} subtitle="Total Supply" />
      <Card title="Total Participants" number={airdropData.claimedAddresses.length} subtitle="Unique IDs" className="bg-green-200" />
      <Card title="Tokens Distributed" number={airdropData.tokensDistributed} subtitle="Tokens Claimed" className="bg-green-200" />
      <Card title="Remaining Tokens" number={airdropData.totalTokens - airdropData.tokensDistributed} subtitle="Available for Claim" className="bg-green-200" />
    </div>
  );
};

export default AirdropStatistics;
