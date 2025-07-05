// Functions to call backend AI API
import type { Grid } from "../game/logic";
import { BACKEND_URL } from "../config";

const site = BACKEND_URL;

export async function getBestMoveFromAI(grid: Grid): Promise<string | null> {
  const response = await fetch(site, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ grid }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get hint: ${response.statusText}`);
  }

  const data = await response.json();
  return data.move;
}
