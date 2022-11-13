import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const Header = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    await disconnectAsync();
  };

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    try {
      if (isConnected) {
        await disconnectAsync();
      }
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });

      const userData = { address: account, chain: chain.id, network: "evm" };

      const { data } = await axios.post("/api/auth/request-message", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = data.message;

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = await signIn("credentials", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/user",
      });
    } catch (error) {
      toast.error("You need to connect to MetaMask to continue...");
      setTimeout(() => {
        window.open("https://metamask.io/download.html", "_blank");
      }, 2000);
    }
  };

  return (
    <div className="nav w-full bg-black text-white py-4 flex items-center justify-end px-8">
      {session ? (
        <button
          className="bg-yellow-600 px-4 py-2 rounded-md"
          onClick={() => handleSignOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="bg-yellow-600 px-4 py-2 rounded-md"
          onClick={() => handleAuth()}
        >
          Conectar Wallet
        </button>
      )}
    </div>
  );
};

export default Header;
