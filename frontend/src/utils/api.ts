// Functions to call backend AI API
import type { Grid, Direction } from "../game/logic";

export async function getBestMoveFromAI(grid: Grid): Promise<Direction | null> {
  const response = await fetch("http://localhost:5050/hint", {
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
  return data.move as Direction;
}
