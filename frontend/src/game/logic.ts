// Pure game logic functions (move, merge, spawn)
import { moveRow } from "../utils/helpers";

type Direction = 'up' | 'down' | 'left' | 'right';
type Grid = number[][];

export function initGrid(n = 4): Grid {
    // Empty grid of size n x n (square)
    const grid: Grid = Array.from({ length: n }, () => Array(n).fill(0))

    // Add 2 random tiles
    let newGrid = addRandomTile(grid);
    newGrid = addRandomTile(newGrid);
    return newGrid;
}

export function addRandomTile(grid: Grid): Grid {
    const size = grid.length;
    const emptyCells = [];

    // Get empty cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] == 0) emptyCells.push([i, j]);
        }
    }

    // No empty cells -> No changes
    if (emptyCells.length == 0) return grid;

    // Randomly pick from empty cells
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // 90% Chance 2, 10% Chance 4
    const newValue = Math.random() < 0.9 ? 2 : 4

    // Clone to avoid mutation
    const newGrid = grid.map(row => row.slice());
    newGrid[row][col] = newValue;
    return newGrid;
}

export function move(grid: Grid, direction: Direction): { newGrid: Grid, newScore: number, moved: boolean} {
    const size = grid.length;
    let moved = false;
    let totalScore = 0;

    // Clone grid so we don't mutate original
    const newGrid: Grid = grid.map(row => [...row]);

    // Helper to get/set rows or columns depending on direction
    function getLine(index: number): number[] {
        if (direction === 'left' || direction === 'right') { // rows
            return [...newGrid[index]];
        } else { // columns
            const col = [];
            for (let r = 0; r < size; r++) col.push(newGrid[r][index]);
            return col;
        }
    }

    function setLine(index: number, line: number[]) {
        if (direction === 'left' || direction === 'right') {
            newGrid[index] = [...line];
        } else {
            for (let r = 0; r < size; r++) newGrid[r][index] = line[r];
        }
    }

    for (let i = 0; i < size; i++) {
        const line = getLine(i);

        if (direction === 'right' || direction === 'down') {
            line.reverse();
        }

        const { newRow, score } = moveRow(line);
        totalScore += score;

        if (!moved && newRow.some((val, idx) => val !== line[idx])) {
            moved = true;
        }

        if (direction === 'right' || direction === 'down') {
            newRow.reverse();
        }

        setLine(i, newRow);
    }

    return { newGrid, newScore: totalScore, moved };
}

export function isGameOver(grid: Grid): boolean {
    const size = grid.length;

    // If any cell empty, not over (FALSE)
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] == 0) return false;
        }
    }

    // Check for possible moves
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Horizontally
            if (grid[i][j] === grid[i][j + 1]) return false;
        }
    }
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            // Vertically
            if (grid[i][j] === grid[i + 1][j]) return false;
        }
    }

    return true;
}