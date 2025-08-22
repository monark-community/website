interface EthereumProvider {
  isMetaMask?: boolean;
  isRainbow?: boolean;
  isTrustWallet?: boolean;
  isTrust?: boolean;
  isCoinbaseWallet?: boolean;
  isOkxWallet?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

interface Window {
  ethereum?: EthereumProvider & {
    providers?: EthereumProvider[];
  };
}