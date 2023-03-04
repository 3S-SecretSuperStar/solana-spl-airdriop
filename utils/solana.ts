import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

export const airdropToken = async (walletAddress: string) => {
    try {
        const toWallet = new PublicKey(walletAddress);

        const tokenMint = new PublicKey(
            "7sY4JTyh2jaGxRRQ2KZ9rP9vXnRNqcbFAfMHXcLsLrmY"
        );
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const ownerKeypair = Keypair.fromSecretKey(
            Uint8Array.from(JSON.parse(process.env.WALLET_KEYPAIR!))
        );

        // Get the token account of the owner wallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            ownerKeypair,
            tokenMint,
            ownerKeypair.publicKey
        );

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            ownerKeypair,
            tokenMint,
            toWallet
        );

        // Transfer the token
        const signature = await transfer(
            connection,
            ownerKeypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            ownerKeypair.publicKey,
            100 * LAMPORTS_PER_SOL
        );

        return signature;
    } catch (error) {
        console.error("airdropToken =>", error);
        return null;
    }
};
