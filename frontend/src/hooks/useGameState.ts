// Custom hook managing game state + undo stack
import { useState } from "react";
import { initGrid, moveGrid, addRandomTile, isGameOver, getMaxTile } from "../game/logic";
import type { Direction, Grid } from "../game/logic";

const MAX_UNDO = 10;
export type Difficulty = "easy" | "medium" | "hard";
const difficultySizes: Record<Difficulty, number> = {
  easy: 5,
  medium: 4,
  hard: 3,
};

interface UserGameState {
  grid: Grid;
  score: number;
  highScore: number;
  moves: number;
  history: Grid[];
  gameOver: boolean;
  hasWon: boolean;
  difficulty: Difficulty;
  move: (dir: Direction) => void;
  restart: () => void;
  undo: () => void;
  setDifficulty: (mode: Difficulty) => void;
  continueGame: () => void;
  shouldShowWinModal: boolean;
  shouldShowGameOverModal: boolean;
}

export function useGameState(): UserGameState {
  const [difficulty, setDifficultyState] = useState<Difficulty>("medium");
  const [grid, setGrid] = useState(() =>
    initGrid(difficultySizes["medium"], difficultySizes["medium"])
  );
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highscore") || "0")
  );
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<Grid[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [continuedAfterWin, setContinuedAfterWin] = useState(false);

  const move = (dir: Direction) => {
    if (gameOver || (hasWon && !continuedAfterWin)) return;

    const { newGrid, scoreGained, moved } = moveGrid(grid, dir);

    if (!moved) return;

    const gridAfterNew = addRandomTile(newGrid);
    const newScore = score + scoreGained;

    setHistory((prev) => [grid, ...prev.slice(0, MAX_UNDO - 1)]);
    setGrid(gridAfterNew);
    setScore(newScore);
    setMoves((prev) => prev + 1);

    if (isGameOver(gridAfterNew)) setGameOver(true);

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("highscore", String(newScore));
    }

    const maxTile = getMaxTile(gridAfterNew);
    if (!hasWon && maxTile >= 2048) {
      setHasWon(true);
    }
  };

  const restart = () => {
    const size = difficultySizes[difficulty];
    setGrid(initGrid(size, size));
    setScore(0);
    setMoves(0);
    setHistory([]);
    setGameOver(false);
    setHasWon(false);
    setContinuedAfterWin(false);
  };

  const undo = () => {
    if (history.length === 0) return;
    const [prev, ...rest] = history;
    setGrid(prev);
    setHistory(rest);
    setGameOver(false);
  };

  const setDifficulty = (mode: Difficulty) => {
    setDifficultyState(mode);
    const size = difficultySizes[mode];
    setGrid(initGrid(size, size));
    setScore(0);
    setMoves(0);
    setHistory([]);
    setGameOver(false);
    setHasWon(false);
    setContinuedAfterWin(false);
  };

  const continueGame = () => {
    setHasWon(false);
    setContinuedAfterWin(true);
  };

  return {
    grid,
    score,
    highScore,
    moves,
    history,
    gameOver,
    hasWon,
    difficulty,
    move,
    restart,
    undo,
    setDifficulty,
    continueGame,
    shouldShowWinModal: hasWon && !continuedAfterWin,
    shouldShowGameOverModal: gameOver && !hasWon,
  };
}