import { BN } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
} from "@solana/web3.js";
import { useAnchorProgram } from "@/providers/anchor-provider";
import { useCallback, useEffect, useState } from "react";

interface AirdropData {
  totalTokens: number;
  tokensDistributed: number;
  claimedAddresses: PublicKey[];
}

export const getAirdropData = () => {
  const { program } = useAnchorProgram();
  const { publicKey } = useWallet();
  const [airdropData, setAirdropData] = useState<AirdropData | null>(null);

  const fetchAirdropData = useCallback(async () => {
    if (!program || !publicKey) return null;

    try {
      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), publicKey.toBuffer()],
        program.programId
      );

      const dataAccount = await program.account.data.fetch(dataPda);

      const formattedData: AirdropData = {
        totalTokens: new BN(dataAccount.totalTokens).toNumber(),
        tokensDistributed: new BN(dataAccount.tokensDistributed).toNumber(),
        claimedAddresses: dataAccount.claimedAddresses.map(
          (addr: PublicKey | string) =>
            typeof addr === "string" ? new PublicKey(addr) : addr
        ),
      };
      
      setAirdropData(formattedData);
      return formattedData;
    } catch (error) {
      console.error("Error fetching airdrop data:", error);
      return null;
    }
  }, [program, publicKey]);

  useEffect(() => {
    if (program && publicKey) {
      fetchAirdropData();
    }
  }, [fetchAirdropData, program, publicKey]);

  return { airdropData, fetchAirdropData };
};
