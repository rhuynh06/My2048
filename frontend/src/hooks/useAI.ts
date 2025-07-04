import { useState } from "react";
import type { Grid, Direction } from "../game/logic";
import { getBestMoveFromAI } from "../utils/api";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<Direction | null>(null);

  const getHint = async (grid: Grid): Promise<void> => {
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

  const getAutoMove = async (grid: Grid): Promise<Direction | null> => {
    try {
      const move = await getBestMoveFromAI(grid);
      return move || null;
    } catch (err) {
      console.error("AI Autoplay Failed", err);
      return null;
    }
  };

  return { getHint, hint, loading, getAutoMove };
}