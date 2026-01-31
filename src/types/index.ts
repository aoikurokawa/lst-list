export interface LST {
  mint: string;
  symbol: string;
  name: string;
  logoUrl: string;
  decimals: number;
  priceInSol: number;
  priceInUsd: number;
  apy: number;
  tvlSol: number;
  tvlUsd: number;
}

export interface LSTStats {
  totalLSTs: number;
  totalTvlUsd: number;
  totalTvlSol: number;
  averageApy: number;
  highestApy: { symbol: string; apy: number };
  largestByTvl: { symbol: string; tvlUsd: number };
}

// Sanctum LST List Response
export interface SanctumLSTMetadata {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  logo_uri: string;
}

// Sanctum Sol Value Response
export interface SanctumSolValueResponse {
  solValues: {
    [mint: string]: string; // lamports per token
  };
  errs: Record<string, unknown>;
}

// Sanctum APY Response
export interface SanctumApyResponse {
  apys: {
    [mint: string]: number;
  };
  errs: Record<string, unknown>;
}

// Jupiter Price Response
export interface JupiterPriceResponse {
  data: {
    [mint: string]: {
      id: string;
      type: string;
      price: string;
    };
  };
  timeTaken: number;
}
