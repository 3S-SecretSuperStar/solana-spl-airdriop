import Head from "next/head";
import Image from "next/image";
import tokenImage from "@/public/images/token-image.png";
import { FormEvent, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Home() {
    const [isAirdropping, setIsAirdropping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        setIsAirdropping(true);

        const toastId = "airdrop-toast";

        try {
            const walletAddress = inputRef.current?.value;

            if (!walletAddress) {
                toast.error("Please enter wallet address!", {
                    id: toastId,
                });
                setIsAirdropping(false);
                return;
            }

            toast.loading("Airdropping 100 Cyphen Mix Coin to your wallet", {
                id: toastId,
            });

            const response = await axios.post("/api/airdrop", {
                walletAddress,
            });

            const result = response.data;

            if (!result?.success) {
                throw new Error("result not success");
            }

            toast.success("Airdrop Successful! Check your wallet.", {
                id: toastId,
            });

            const airdropForm: HTMLFormElement | null = document.getElementById(
                "airdrop-form"
            ) as HTMLFormElement;

            if (airdropForm) {
                airdropForm.reset();
            }
        } catch (error: any) {
            toast.error("Something went wrong! Please try again later.", {
                id: toastId,
            });
        }

        setIsAirdropping(false);
    };

    return (
        <main className="bg-background-primary text-white min-h-screen p-2 flex flex-col">
            <Head>
                <title>Cyphen Airdrop By Bhagya Mudgal</title>
                <meta
                    name="description"
                    content="Free Cyphen Mix Coin Airdrop on Solana Devnet"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col items-center container max-w-xl mx-auto py-10 space-y-10 flex-grow">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-center">CYPHEN MIX COIN</h1>

                    <div className="w-60 h-60">
                        <Image src={tokenImage} alt="cyphen-token-image" />
                    </div>

                    <a
                        href="https://explorer.solana.com/address/7sY4JTyh2jaGxRRQ2KZ9rP9vXnRNqcbFAfMHXcLsLrmY?cluster=devnet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-400 my-2 underline text-lg"
                    >
                        View on Explorer
                    </a>
                </div>

                <form
                    id="airdrop-form"
                    onSubmit={submitHandler}
                    className="flex flex-col items-center w-full border-2 border-white p-6 space-y-6 rounded-md"
                >
                    <input
                        id="address-input"
                        className="w-full p-2 rounded-md text-black"
                        placeholder="Enter your solana wallet address"
                        ref={inputRef}
                    />
                    <button
                        type="submit"
                        disabled={isAirdropping}
                        className="bg-pink-500 px-4 py-2 w-auto rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Get 100 Cyphen Mix Coin
                    </button>
                </form>
            </div>

            <footer className="p-6 flex justify-center">
                <p className="text-center text-lg">
                    Developed by{" "}
                    <a
                        href="https://www.bhagyamudgal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-400 my-2 underline"
                    >
                        Bhagya Mudgal
                    </a>
                </p>
            </footer>

            <Toaster />
        </main>
    );
}
