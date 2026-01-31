import axios from "axios";

const DEFILLAMA_PRICES_API = "https://coins.llama.fi";
const DEFILLAMA_YIELDS_API = "https://yields.llama.fi";

export interface DefiLlamaPrice {
  decimals: number;
  symbol: string;
  price: number;
  timestamp: number;
  confidence: number;
}

export interface DefiLlamaPricesResponse {
  coins: {
    [key: string]: DefiLlamaPrice;
  };
}

export interface DefiLlamaPool {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number | null;
  apy: number;
  underlyingTokens: string[] | null;
  pool: string;
}

export interface DefiLlamaYieldsResponse {
  data: DefiLlamaPool[];
}

export async function fetchPrices(
  mints: string[],
): Promise<DefiLlamaPricesResponse> {
  const coinIds = mints.map((mint) => `solana:${mint}`).join(",");
  const { data } = await axios.get<DefiLlamaPricesResponse>(
    `${DEFILLAMA_PRICES_API}/prices/current/${coinIds}`,
  );
  return data;
}

export async function fetchSolanaLSTYields(): Promise<DefiLlamaPool[]> {
  const { data } = await axios.get<DefiLlamaYieldsResponse>(
    `${DEFILLAMA_YIELDS_API}/pools`,
  );

  // Get all Solana liquid staking pools - broader filter to catch more LSTs
  return data.data.filter((pool) => {
    if (pool.chain !== "Solana") return false;
    if (!pool.underlyingTokens || pool.underlyingTokens.length !== 1)
      return false;

    // Include pools that look like LSTs based on project name or symbol
    const isLSTProject =
      pool.project.toLowerCase().includes("staked") ||
      pool.project.toLowerCase().includes("staking") ||
      pool.project.toLowerCase().includes("liquid") ||
      pool.project.includes("sol") ||
      pool.symbol.toLowerCase().includes("sol");

    // Also include known LST projects
    const knownProjects = [
      "jito-liquid-staking",
      "marinade-liquid-staking",
      "blazestake",
      "sanctum-infinity",
      "jupiter-staked-sol",
      "solblaze",
      "lido-on-solana",
      "marginfi-lst",
      "binance-staked-sol",
      "bybit-staked-sol",
      "sanctum",
      "socean",
      "eversol",
      "laine",
      "cogent",
    ];

    return (
      isLSTProject ||
      knownProjects.some((p) => pool.project.toLowerCase().includes(p))
    );
  });
}

export function getSolPrice(priceData: DefiLlamaPricesResponse): number {
  const solKey = "solana:So11111111111111111111111111111111111111112";
  return priceData.coins[solKey]?.price || 0;
}
