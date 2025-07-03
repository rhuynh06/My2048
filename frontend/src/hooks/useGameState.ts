// Custom hook managing game state + undo stack
import { useState } from "react";
import { initGrid, moveGrid, addRandomTile, isGameOver } from "../game/logic";
import type { Direction, Grid } from "../game/logic";

interface UserGameState {
    grid: Grid;
    score: number;
    highScore: number;
    moves: number;
    history: Grid[];
    gameOver: boolean;
    difficulty: string;
    move: (dir: Direction) => void;
    restart: () => void;
    undo: () => void;
    setDifficulty: (mode: string) => void;
}

const MAX_UNDO = 10;

export function useGameState(): UserGameState {
    const [grid, setGrid] = useState(initGrid());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        Number(localStorage.getItem("highscore") || "0")
    );
    const [moves, setMoves] = useState(0);
    const [history, setHistory] = useState<Grid[]>([])
    const [gameOver, setGameOver] = useState(false);
    const [difficulty, setDifficultyState] = useState("normal");

    const move = (dir: Direction) => {
        // game over?
        if (gameOver) return;

        // no changes?
        const { newGrid, moved, scoreGained } = moveGrid(grid, dir);
        if (!moved) return;

        // move
        const gridAfterNew = addRandomTile(newGrid);
        const newScore = score + scoreGained;

        setHistory(prev => [grid, ...prev.slice(0, MAX_UNDO - 1)]);
        setGrid(gridAfterNew);
        setScore(newScore);
        setMoves(prev => prev + 1);
        setGameOver(isGameOver(gridAfterNew))

        // new high score?
        if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("highscore", String(newScore));
        }
    };

    const restart = () => {
        setGrid(initGrid());
        setScore(0);
        setMoves(0);
        setHistory([]);
        setGameOver(false);
    };

    const undo = () => {
        if (history.length == 0) return;
        const [prev, ...rest] = history;
        setGrid(prev);
        setHistory(rest);
    };

    const setDifficulty = (mode: string) => {
        setDifficultyState(mode);
        restart();
    };

    return {
        grid,
        score,
        highScore,
        moves,
        history,
        gameOver,
        difficulty,
        move,
        restart,
        undo,
        setDifficulty
    };
}