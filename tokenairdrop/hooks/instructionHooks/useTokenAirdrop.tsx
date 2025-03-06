import { PublicKey, Connection } from "@solana/web3.js";
import { useAnchorProgram } from "@/providers/anchor-provider";
import { BN, web3 } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
const AIRDROP_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_MINT_TOKEN!);

export const useTokenAirdrop = () => {
  const { program, wallet, publicKey, connection } = useAnchorProgram();

  // Helper function to get admin ATA for the token
  const getAdminTokenAccount = async () => {
    if (!wallet.publicKey) throw new Error("Wallet not connected");
    
    return getAssociatedTokenAddress(
      AIRDROP_MINT_ADDRESS,
      wallet.publicKey
    );
  };

  const initializeAirdrop = async (airdropAmount: number) => {
    try {
      if (!program || !wallet.publicKey) {
        throw new Error("Program or wallet not available");
      }

      // Get PDAs
      const [tokenAtaForProgram] = PublicKey.findProgramAddressSync(
        [AIRDROP_MINT_ADDRESS.toBuffer()],
        PROGRAM_ID
      );
      
      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );
      
      // Get the admin's token account
      const tokenAtaForAdmin = await getAdminTokenAccount();

      // Create instruction
      const tx = await program.methods
        .initializeAirdrop(new BN(airdropAmount))
        .accounts({
          tokenAtaForProgram,
          data: dataPda,
          tokenMint: AIRDROP_MINT_ADDRESS,
          tokenAtaForAdmin,
          admin: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      console.log("Airdrop initialized. Transaction signature:", tx);
      return tx;
    } catch (error) {
      console.error("Error initializing airdrop:", error);
      throw error;
    }
  };

  const depositTokens = async (amount: number) => {
    try {
      if (!program || !wallet.publicKey) {
        throw new Error("Program or wallet not available");
      }

      // Get PDAs
      const [tokenAtaForProgram] = PublicKey.findProgramAddressSync(
        [AIRDROP_MINT_ADDRESS.toBuffer()],
        PROGRAM_ID
      );
      
      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );
      
      // Get the admin's token account
      const tokenAtaForAdmin = await getAdminTokenAccount();

      // Create instruction
      const tx = await program.methods
        .depositTokens(new BN(amount))
        .accounts({
          tokenAtaForProgram,
          data: dataPda,
          tokenMint: AIRDROP_MINT_ADDRESS,
          tokenAtaForAdmin,
          admin: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      console.log("Tokens deposited. Transaction signature:", tx);
      return tx;
    } catch (error) {
      console.error("Error depositing tokens:", error);
      throw error;
    }
  };

  const claimAirdrop = async () => {
    try {
      if (!program || !wallet.publicKey) {
        throw new Error("Program or wallet not available");
      }

      // Get PDAs and bumps
      const [tokenAtaForProgram, tokenAtaForProgramBump] = PublicKey.findProgramAddressSync(
        [AIRDROP_MINT_ADDRESS.toBuffer()],
        PROGRAM_ID
      );
      
      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );
      
      // Get the user's token account
      const tokenAtaForUser = await getAssociatedTokenAddress(
        AIRDROP_MINT_ADDRESS,
        wallet.publicKey
      );

      // Create and send transaction
      const tx = await program.methods
        .claimAirdrop(tokenAtaForProgramBump)
        .accounts({
          tokenAtaForProgram,
          data: dataPda,
          tokenMint: AIRDROP_MINT_ADDRESS,
          tokenAtaForUser,
          user: wallet.publicKey,
          admin: wallet.publicKey, // Using same wallet as admin for simplicity
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Airdrop claimed. Transaction signature:", tx);
      return tx;
    } catch (error) {
      console.error("Error claiming airdrop:", error);
      throw error;
    }
  };

  // Get airdrop data
  const getAirdropData = async () => {
    try {
      if (!program || !wallet.publicKey) {
        throw new Error("Program or wallet not available");
      }

      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );

      const data = await program.account.data.fetch(dataPda);
      return {
        admin: data.admin.toString(),
        totalTokens: data.totalTokens.toNumber(),
        tokensDistributed: data.tokensDistributed.toNumber(),
        claimedAddresses: data.claimedAddresses.map(addr => addr.toString()),
        remainingTokens: data.totalTokens.toNumber() - data.tokensDistributed.toNumber()
      };
    } catch (error) {
      console.error("Error fetching airdrop data:", error);
      throw error;
    }
  };

  // Check if current user has already claimed
  const hasUserClaimed = async () => {
    try {
      if (!wallet.publicKey) return false;
      
      const data = await getAirdropData();
      return data.claimedAddresses.includes(wallet.publicKey.toString());
    } catch (error) {
      console.error("Error checking if user claimed:", error);
      return false;
    }
  };

  return { 
    initializeAirdrop, 
    depositTokens, 
    claimAirdrop, 
    getAirdropData,
    hasUserClaimed
  };
};