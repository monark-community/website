"use client";
import React, { createContext, useContext, useCallback } from "react";
import { getEVMChainConfig } from "@/lib/donation-constants";

type EthereumProvider = {
  isMetaMask?: boolean;
  isRainbow?: boolean;
  isTrustWallet?: boolean;
  isTrust?: boolean;
  isCoinbaseWallet?: boolean;
  isOkxWallet?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

interface WalletContextType {
  connectWallet: (
    walletType: string,
    network: string,
    address: string,
    amount?: string
  ) => Promise<string | null>;
  isWalletSupported: (walletType: string) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Detect and connect to browser extension wallets
  const connectWallet = useCallback(
    async (
      walletType: string,
      network: string,
      address: string,
      amount?: string
    ): Promise<string | null> => {
      if (typeof window === "undefined") return null;

      try {
        let provider: EthereumProvider | null = null;

        // Detect specific wallet providers
        if (walletType === "MetaMask") {
          provider =
            window.ethereum?.providers?.find((p) => p.isMetaMask) ||
            (window.ethereum?.isMetaMask ? window.ethereum : null);
        }
        // else if (walletType === 'Rainbow') {
        //   provider = window.ethereum?.providers?.find((p: any) => p.isRainbow) ||
        //             (window.ethereum?.isRainbow ? window.ethereum : null);
        // } else if (walletType === 'Trust Wallet') {
        //   provider = window.ethereum?.providers?.find((p: any) => p.isTrust) ||
        //             (window.ethereum?.isTrustWallet ? window.ethereum : null);
        // } else if (walletType === 'Coinbase') {
        //   provider = window.ethereum?.providers?.find((p: any) => p.isCoinbaseWallet) ||
        //             (window.ethereum?.isCoinbaseWallet ? window.ethereum : null);
        // } else if (walletType === 'OKX') {
        //   provider = window.ethereum?.providers?.find((p: any) => p.isOkxWallet) ||
        //             (window.ethereum?.isOkxWallet ? window.ethereum : null);
        // }

        // Don't fall back to generic provider - require specific wallet
        if (!provider) {
          throw new Error(`${walletType} wallet not detected or installed`);
        }

        // Request account access
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        }) as string[];

        if (accounts.length === 0) {
          throw new Error("No accounts found");
        }

        // Switch to the correct network if it's an EVM network
        const networkConfig = getEVMChainConfig(network);
        if (networkConfig) {
          try {
            // Try to switch to the network
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: networkConfig.chainId }],
            });
          } catch (switchError: unknown) {
            const err = switchError as ProviderRpcError;
            // If the network doesn't exist, add it
            if (err.code === 4902) {
              try {
                await provider.request({
                  method: "wallet_addEthereumChain",
                  params: [networkConfig],
                });
              } catch (addError: unknown) {
                if (addError instanceof Error) {
                  throw new Error(`Failed to add ${network} network to wallet`);
                } else {
                  console.error("Unknown error adding network:", addError);
                }
              }
            } else {
              throw new Error(`Failed to switch to ${network} network`);
            }
          }
        }

        // Only proceed with transaction for EVM networks
        if (networkConfig) {
          // Prepare transaction parameters
          const transactionParams: {
            from: string;
            to: string;
            value?: string; // Optional for non-value transactions
          } = {
            from: accounts[0],
            to: address,
          };

          // Add value if amount is specified
          if (amount && parseFloat(amount) > 0) {
            // Convert amount to wei (assuming ETH/similar)
            const amountInWei = (parseFloat(amount) * 1e18).toString(16);
            transactionParams.value = "0x" + amountInWei;
          }

          // Send transaction
          const txHash = await provider.request({
            method: "eth_sendTransaction",
            params: [transactionParams],
          }) as string;

          return txHash;
        } else {
          // For non-EVM networks, just notify that wallet connection was successful
          // but transaction needs to be done manually
          throw new Error(
            `${network} transactions not supported through browser extension`
          );
        }
      } catch (error) {
        console.error(`Error connecting to ${walletType}:`, error);
        throw error;
      }
    },
    []
  );

  // Check if a wallet type is supported in the current environment
  const isWalletSupported = useCallback((walletType: string): boolean => {
    if (typeof window === "undefined") return false;

    switch (walletType) {
      case "MetaMask":
        return !!(
          window.ethereum?.providers?.find((p) => p.isMetaMask) ||
          (window.ethereum?.isMetaMask ? window.ethereum : null)
        );
      case "Rainbow":
        return !!(
          window.ethereum?.providers?.find((p) => p.isRainbow) ||
          (window.ethereum?.isRainbow ? window.ethereum : null)
        );
      case "Trust Wallet":
        return !!(
          window.ethereum?.providers?.find((p) => p.isTrust) ||
          (window.ethereum?.isTrustWallet ? window.ethereum : null)
        );
      case "Coinbase":
        return !!(
          window.ethereum?.providers?.find((p) => p.isCoinbaseWallet) ||
          (window.ethereum?.isCoinbaseWallet ? window.ethereum : null)
        );
      case "OKX":
        return !!(
          window.ethereum?.providers?.find((p) => p.isOkxWallet) ||
          (window.ethereum?.isOkxWallet ? window.ethereum : null)
        );
      default:
        return false;
    }
  }, []);

  const contextValue: WalletContextType = {
    connectWallet,
    isWalletSupported,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
