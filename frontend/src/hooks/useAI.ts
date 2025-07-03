// Hook for AI integration (calling backend, processing hints)
import { useState } from "react";
import type { Grid, Direction } from "../game/logic";
import { getBestMoveFromAI } from "../utils/api";

export function useAI() {
    const [loading, setLoading] = useState(false);
    const [hint, setHint] = useState<Direction | null>(null);

    const getHint = async (grid: Grid, difficulty: string) => {
        if (difficulty != "normal") return;
        setLoading(true);
        try {
            const move = await getBestMoveFromAI(grid);
            setHint(move);
        } catch (err) {
            console.error("AI Failed", err);
        } finally {
            setLoading(false);
        }
    };

    return { getHint, hint, loading };
}