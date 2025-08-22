export interface MonarkWalletAddress {
  network: string;
  address: string;
}

export interface NetworkInfo {
  id: string;
  name: string;
  symbol: string;
  chainId?: number;
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
  isEVM?: boolean;
}

// Comprehensive network metadata
export const NETWORK_INFO: { [key: string]: NetworkInfo } = {
  ETH: {
    id: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    chainId: 1,
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"],
    isEVM: true,
  },
  BTC: {
    id: "BTC",
    name: "Bitcoin",
    symbol: "BTC",
    isEVM: false,
  },
  SOL: {
    id: "SOL",
    name: "Solana",
    symbol: "SOL",
    isEVM: false,
  },
  AVAX: {
    id: "AVAX",
    name: "Avalanche",
    symbol: "AVAX",
    chainId: 43114,
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io/"],
    isEVM: true,
  },
  SUI: {
    id: "SUI",
    name: "Sui",
    symbol: "SUI",
    isEVM: false,
  },
  TON: {
    id: "TON",
    name: "The Open Network",
    symbol: "TON",
    isEVM: false,
  },
  TRON: {
    id: "TRON",
    name: "Tron",
    symbol: "TRX",
    isEVM: false,
  },
  HBAR: {
    id: "HBAR",
    name: "Hedera Hashgraph",
    symbol: "HBAR",
    isEVM: false,
  },
  VAULTA: {
    id: "VAULTA",
    name: "Vaulta",
    symbol: "A",
    isEVM: false,
  },
};

// Block explorer base URLs
export const blockExplorers: { [key: string]: string } = {
  SOL: "https://solscan.io/account/",
  SUI: "https://suiscan.xyz/mainnet/account/",
  TON: "https://tonviewer.com/",
  TRON: "https://tronscan.org/#/address/",
  AVAX: "https://snowtrace.io/address/",
  ETH: "https://etherscan.io/address/",
  BTC: "https://btcscan.org/address/",
  HBAR: "https://hashscan.io/mainnet/account/",
  VAULTA: "https://eosflare.io/account/",
};

// Monark's official wallet addresses for donations
export const MONARK_WALLET_ADDRESSES: MonarkWalletAddress[] = [
  {
    network: "SOL",
    address: "4enXL4gz4ytFtCkL5V2YzU5VfFtFnUkHdWYv8jX28LyW",
  },
  {
    network: "SUI",
    address: "0x90ea46396a8c22be6d800142972061bbe84399a6205b1a4bf4c963c971d5795f",
  },
  {
    network: "TON",
    address: "UQDuqiVlh40OOpeufMZzesOC7WrsC98m1Gah2T7-kJ7-Y8zw",
  },
  {
    network: "TRON",
    address: "TJD4KYYewNwNe5YBurZPRKr16h87iQnHCh",
  },
  {
    network: "AVAX",
    address: "0x9771876B04E0f3008cc7733C5f23E1C76650E139",
  },
  {
    network: "ETH",
    address: "0x9771876B04E0f3008cc7733C5f23E1C76650E139",
  },
  {
    network: "BTC",
    address: "bc1pxpg6xr0mj8w0qdym9tfg4suqcz5av0nnyr7xckcnssd5hxxk6weqa3n87y",
  },
  {
    network: "HBAR",
    address: "0x000000000000000000000000000000000092fcc7",
  },
  {
    network: "VAULTA",
    address: "monark",
  },
];

// Function to generate crypto currencies from the wallet addresses
export const getExplorerUrlForNetwork = (network: string): string => {
  const wallet = MONARK_WALLET_ADDRESSES.find(w => w.network === network);
  const explorerBase = blockExplorers[network];
  if(!wallet || !explorerBase) {
    console.warn(`No explorer URL or network found for: '${network}'.`);
    return "";
  }
  return `${explorerBase}${wallet?.address}`;
}

// Helper function to get wallet address for a specific network
export const getMonarkWalletAddress = (network: string): string => {
  const wallet = MONARK_WALLET_ADDRESSES.find(w => w.network === network);
  return wallet?.address || "";
};

// Helper function to get explorer URL for a specific network
export const getExplorerUrl = (network: string): string => {
  return blockExplorers[network];
};

// Helper function to get all supported networks
export const getSupportedNetworks = (): string[] => {
  return MONARK_WALLET_ADDRESSES.map(w => w.network);
};

// Get network information by network ID
export const getNetworkInfo = (networkId: string): NetworkInfo | null => {
  return NETWORK_INFO[networkId] || null;
};

// Get network token symbol
export const getNetworkToken = (networkId: string): string => {
  const networkInfo = getNetworkInfo(networkId);
  return networkInfo?.symbol || networkId;
};

// Get network name
export const getNetworkName = (networkId: string): string => {
  const networkInfo = getNetworkInfo(networkId);
  return networkInfo?.name || networkId;
};

// Check if network is EVM compatible
export const isEVMNetwork = (networkId: string): boolean => {
  const networkInfo = getNetworkInfo(networkId);
  return networkInfo?.isEVM || false;
};

// Get EVM chain configuration for wallet switching
export const getEVMChainConfig = (networkId: string) => {
  const networkInfo = getNetworkInfo(networkId);
  if (!networkInfo?.isEVM || !networkInfo.chainId) {
    return null;
  }
  
  return {
    chainId: `0x${networkInfo.chainId.toString(16)}`,
    chainName: networkInfo.name,
    rpcUrls: networkInfo.rpcUrls || [],
    nativeCurrency: {
      name: networkInfo.name,
      symbol: networkInfo.symbol,
      decimals: 18,
    },
    blockExplorerUrls: networkInfo.blockExplorerUrls || [],
  };
};

export interface WalletOption {
  name: string;
  type: string;
  supportsBrowserExtension: boolean;
  supportsMobile: boolean;
}

// Wallet options for different networks
// NOTE: Currently only MetaMask is enabled for testing. Other wallets are disabled but code is preserved.
export const WALLET_OPTIONS_BY_NETWORK: { [network: string]: WalletOption[] } = {
  "ETH": [
    { name: "MetaMask", type: "MetaMask", supportsBrowserExtension: true, supportsMobile: true },
    { name: "Rainbow", type: "Rainbow", supportsBrowserExtension: false, supportsMobile: false },
    { name: "Trust Wallet", type: "Trust Wallet", supportsBrowserExtension: false, supportsMobile: false },
    { name: "Coinbase", type: "Coinbase", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "AVAX": [
    { name: "MetaMask", type: "MetaMask", supportsBrowserExtension: true, supportsMobile: true },
    { name: "Rainbow", type: "Rainbow", supportsBrowserExtension: false, supportsMobile: false },
    { name: "Trust Wallet", type: "Trust Wallet", supportsBrowserExtension: false, supportsMobile: false },
    { name: "Coinbase", type: "Coinbase", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "SOL": [
    { name: "Phantom", type: "Phantom", supportsBrowserExtension: false, supportsMobile: false },
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "BTC": [
    { name: "Trust Wallet", type: "Trust Wallet", supportsBrowserExtension: false, supportsMobile: false },
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "TRON": [
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "SUI": [
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "TON": [
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "HBAR": [
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
  "VAULTA": [
    { name: "OKX", type: "OKX", supportsBrowserExtension: false, supportsMobile: false },
  ],
};

// Get wallet options for a specific network
export const getWalletOptionsForNetwork = (network: string): WalletOption[] => {
  return WALLET_OPTIONS_BY_NETWORK[network] || [];
};

// Get wallet icon component name for a wallet type
export const getWalletIconName = (walletType: string): string => {
  switch (walletType) {
    case "MetaMask":
      return "WalletMetamask";
    case "Rainbow":
      return "WalletRainbow";
    case "Trust Wallet":
      return "WalletTrust";
    case "Phantom":
      return "WalletPhantom";
    case "Coinbase":
      return "WalletCoinbase";
    case "OKX":
      return "WalletOkx";
    default:
      return "WalletIcon";
  }
};