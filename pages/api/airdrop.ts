// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { airdropToken } from "@/utils/solana";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
        }

        const { walletAddress } = req.body;

        if (!walletAddress) {
            res.status(400).json({ error: "walletAddress is required!" });
        }

        const signature = await airdropToken(walletAddress);

        if (!signature) {
            throw new Error("signature not found!");
        }

        res.status(200).json({ success: true, signature });
    } catch (error) {
        console.error("airdrop api =>", error);
        res.status(500).json({ error });
    }
}
