interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isRainbow?: boolean;
    isTrustWallet?: boolean;
    isTrust?: boolean;
    providers?: Array<{
      isMetaMask?: boolean;
      isRainbow?: boolean;
      isTrust?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    }>;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}