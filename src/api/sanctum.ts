import axios from "axios";
import type { SanctumSolValueResponse, SanctumApyResponse } from "../types";
import { SANCTUM_EXTRA_API, LAMPORTS_PER_SOL } from "../utils/constants";

const sanctumClient = axios.create({
  baseURL: SANCTUM_EXTRA_API,
});

export async function fetchSolValues(
  mints: string[],
): Promise<SanctumSolValueResponse> {
  // API requires repeated lst params
  const params = new URLSearchParams();
  mints.forEach((mint) => params.append("lst", mint));

  const { data } = await sanctumClient.get<SanctumSolValueResponse>(
    "/sol-value/current",
    {
      params,
    },
  );
  return data;
}

export async function fetchApys(mints: string[]): Promise<SanctumApyResponse> {
  // API requires repeated lst params
  const params = new URLSearchParams();
  mints.forEach((mint) => params.append("lst", mint));

  const { data } = await sanctumClient.get<SanctumApyResponse>("/apy/latest", {
    params,
  });
  return data;
}

export function lamportsToSol(lamports: string | number): number {
  return Number(lamports) / LAMPORTS_PER_SOL;
}
