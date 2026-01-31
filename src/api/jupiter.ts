import axios from 'axios';
import type { JupiterPriceResponse } from '../types';
import { JUPITER_PRICE_API, NATIVE_SOL_MINT } from '../utils/constants';

export async function fetchPrices(mints: string[]): Promise<JupiterPriceResponse> {
  // Always include SOL to get USD price reference
  const allMints = [...new Set([...mints, NATIVE_SOL_MINT])];

  const { data } = await axios.get<JupiterPriceResponse>(JUPITER_PRICE_API, {
    params: { ids: allMints.join(',') },
  });

  return data;
}

export function getSolPrice(priceData: JupiterPriceResponse): number {
  const solData = priceData.data[NATIVE_SOL_MINT];
  return solData ? parseFloat(solData.price) : 0;
}
