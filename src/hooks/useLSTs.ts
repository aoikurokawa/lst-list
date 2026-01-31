import { useQuery } from "@tanstack/react-query";
import {
  fetchPrices,
  fetchSolanaLSTYields,
  getSolPrice,
} from "../api/defillama";
import type { LST, LSTStats } from "../types";

const NATIVE_SOL_MINT = "So11111111111111111111111111111111111111112";

// Logo URLs for known LSTs
const LST_LOGOS: Record<string, string> = {
  J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn:
    "https://storage.googleapis.com/token-metadata/JitoSOL-256.png",
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So:
    "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
  bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1:
    "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png",
  jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v:
    "https://static.jup.ag/jupSOL/icon.png",
  "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm":
    "https://arweave.net/Z6osoyfFLsB3zGEfIOMkYR22dowlhIMgxl8KPDjLvzU",
  LSTxxxnJzKDFSLr4dUkPcmCf5VyryEqzPLz5j4bpxFp:
    "https://storage.googleapis.com/static-marginfi/lst.png",
  BNso1VUJnh4zcfpZa6986Ea66P6TCp59hvtNJ8b1X85:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/33513.png",
  Bybit2vBJGhPF52GBdNaQfUJ6ZpThSgHBobjWZpLPb4B:
    "https://s2.coinmarketcap.com/static/img/coins/64x64/32659.png",
  he1iusmfkpAdwvxLNGV8Y1iSbj4rUy6yMhEA3fotn9A:
    "https://arweave.net/xB4Ey_oMy6hGHqgfSiB3xUxFvM8mj6n5NJIU5sHgAJ0",
  HUBsveNpjo5pWqNkH57QzxjQASdTVXcSK7bVKTSZtcSX:
    "https://arweave.net/R6QEwG1a7XV6hVvN3dT3gtOr4mLsxCrQJLxV8dLNpXk",
  vSoLxydx6akxyMD9XEcPvGYNGq6Nn66oqVb3UkGkei7:
    "https://arweave.net/Yp42iQVfSi-lHsODUUGYpfjAZPE1LcaZYR2S0Dxj8Kc",
  Comp4ssDzXcLeu2MnLuGNNFC4cmLPMng8qWHPvzAMU1h:
    "https://arweave.net/UPQXB9fxGn-g3a_2tX-ZjmkFNJJ0l3R3cHKG2BUiPmM",
  Dso1bDeDjCQxTrWHqUUi63oBvV7Mdm6WaobLbQ7gnPQ:
    "https://drift-public.s3.eu-central-1.amazonaws.com/dSOL.svg",
  BonK1YhkXEGLZzwtcvRTip3gAL9nCeQD7ppZBLXhtTs:
    "https://arweave.net/ms-FdIyJ6T-MDiXjJwuCDtFmLpJf5GD2k2S6iZ-P7Bk",
  LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X:
    "https://shdw-drive.genesysgo.net/FbvQ6PhcTZ5Sm4LSZwBRCFso3RMXF8MYWc4BwUWzBJqD/lanternsol.png",
  picobAEvs6w7QEknPce34wAE4gknZA9v5tTonnmHYdX:
    "https://arweave.net/1VFk5YLU_OisU0YKFzbLnCZsB0j2Q2mmqXr7ZyWx7hU",
  phaseZSfPxTDBpiVb96H4XFSD8xHeHxLnROyBqGCXV:
    "https://phase.fi/images/phaseSOL.png",
  stSOL9HYE6jR9m1VqUqoVpxGfLsczuGn7QiMLRF1LKBR:
    "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/stSOL9HYE6jR9m1VqUqoVpxGfLsczuGn7QiMLRF1LKBR/logo.png",
  edge86g9cVz87xcpKpy3J77vbp4wYd9idEV562CCntt:
    "https://arweave.net/ozLbPdTYcwUCFzGJQdMkLUVgPSwPn_L7mTrjNjrLzPY",
  strng7mqqc1MBJJV6vMzYbEqnwVGvKKGKedeCvtktWA:
    "https://raw.githubusercontent.com/igneous-labs/lst-offchain-metadata/master/stronghold/stronghold_logo.png",
  suPer8CPwxoJPQ7zksGMwFvjBQhjAHwUMmPV4FVatBw:
    "https://superstakedao.nyc3.digitaloceanspaces.com/logo.png",
  pWrSoLAhue6jUxUkbWgmEy5rD9VJRxdTsMHyZdqQTkB:
    "https://shdw-drive.genesysgo.net/HaryyMfBduZqCRWp5KFNHYHyWJRrMVYXthQQzFNqwyvf/power.png",
};

// Friendly names for projects
const PROJECT_NAMES: Record<string, string> = {
  "jito-liquid-staking": "Jito",
  "marinade-liquid-staking": "Marinade",
  blazestake: "BlazeStake",
  "sanctum-infinity": "Sanctum Infinity",
  "jupiter-staked-sol": "Jupiter",
  solblaze: "SolBlaze",
  "lido-on-solana": "Lido",
  "marginfi-lst": "marginfi",
  "binance-staked-sol": "Binance",
  "bybit-staked-sol": "Bybit",
  socean: "Socean",
  eversol: "Eversol",
  laine: "Laine",
  cogent: "Cogent",
  sanctum: "Sanctum",
};

async function fetchAllLSTData(): Promise<LST[]> {
  // Fetch yields data from DeFiLlama (includes TVL and APY)
  const yieldsData = await fetchSolanaLSTYields();

  // Get all mints from yields data
  const mints = yieldsData
    .filter((pool) => pool.underlyingTokens?.[0])
    .map((pool) => pool.underlyingTokens![0]);

  // Add SOL for price reference
  const allMints = [...new Set([...mints, NATIVE_SOL_MINT])];

  // Fetch prices
  const priceData = await fetchPrices(allMints);
  const solPriceUsd = getSolPrice(priceData);

  // Combine data, deduplicating by mint address
  const seenMints = new Set<string>();
  const lsts: LST[] = [];

  for (const pool of yieldsData) {
    const mint = pool.underlyingTokens?.[0];
    if (!mint || seenMints.has(mint)) continue;
    seenMints.add(mint);

    const coinKey = `solana:${mint}`;
    const priceInfo = priceData.coins[coinKey];
    const priceInUsd = priceInfo?.price || 0;
    const priceInSol = solPriceUsd > 0 ? priceInUsd / solPriceUsd : 0;

    lsts.push({
      mint,
      symbol: pool.symbol,
      name: `${PROJECT_NAMES[pool.project] || formatProjectName(pool.project)} Staked SOL`,
      logoUrl: LST_LOGOS[mint] || "",
      decimals: priceInfo?.decimals || 9,
      priceInSol,
      priceInUsd,
      apy: pool.apy || 0,
      tvlSol: solPriceUsd > 0 ? pool.tvlUsd / solPriceUsd : 0,
      tvlUsd: pool.tvlUsd,
    });
  }

  // Sort by TVL descending
  return lsts.sort((a, b) => b.tvlUsd - a.tvlUsd);
}

function formatProjectName(project: string): string {
  return project
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function useLSTs() {
  return useQuery({
    queryKey: ["lsts"],
    queryFn: fetchAllLSTData,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useLSTStats(lsts: LST[] | undefined): LSTStats | null {
  if (!lsts || lsts.length === 0) return null;

  const lstsWithApy = lsts.filter((lst) => lst.apy > 0);
  const averageApy =
    lstsWithApy.length > 0
      ? lstsWithApy.reduce((sum, lst) => sum + lst.apy, 0) / lstsWithApy.length
      : 0;

  const highestApy = lstsWithApy.reduce(
    (max, lst) =>
      lst.apy > max.apy ? { symbol: lst.symbol, apy: lst.apy } : max,
    { symbol: "", apy: 0 },
  );

  const totalTvlUsd = lsts.reduce((sum, lst) => sum + lst.tvlUsd, 0);
  const totalTvlSol = lsts.reduce((sum, lst) => sum + lst.tvlSol, 0);

  const largestByTvl = lsts.reduce(
    (max, lst) =>
      lst.tvlUsd > max.tvlUsd
        ? { symbol: lst.symbol, tvlUsd: lst.tvlUsd }
        : max,
    { symbol: "", tvlUsd: 0 },
  );

  return {
    totalLSTs: lsts.length,
    totalTvlUsd,
    totalTvlSol,
    averageApy,
    highestApy,
    largestByTvl,
  };
}
