// Functions to call backend AI API
import type { Grid, Direction } from "../game/logic";

export async function getBestMoveFromAI(grid: Grid): Promise<Direction> {
    const response = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grid })
    });

    if (!response.ok) throw new Error("AI request failed");

    const data = await response.json();
    return data.move as Direction;
}