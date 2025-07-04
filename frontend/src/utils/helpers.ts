// Small helper functions
import type { Grid, Direction } from "../game/logic";

// Shifts non-zero elements LEFT
function compress(row: number[]): number[] {
    const nonzeros = row.filter(n => n != 0);
    const zeros = Array(row.length - nonzeros.length).fill(0);
    return [...nonzeros, ...zeros]
}

// Merges adjacent tiles, accumualate score
function combine(row: number[]): { newRow: number[], score: number } {
    let score = 0;
    const newRow = [...row];

    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] != 0 && newRow[i] == newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow[i + 1] = 0;
        }
    }

    return { newRow, score };
}

// Shifts, Merges, Shifts again -> 1 Move Motion
export function moveRow(row: number[]): { newRow: number[], score: number } {
    const compressed = compress(row);
    const combined = combine(compressed);
    const finalRow = compress(combined.newRow);
    return { newRow: finalRow, score: combined.score };
}

// Compares 2 grids
export function gridsEqual(g1: Grid, g2: Grid): boolean {
  for (let i = 0; i < g1.length; i++) {
    for (let j = 0; j < g1.length; j++) {
      if (g1[i][j] !== g2[i][j]) return false;
    }
  }
  return true;
}

// letters to Direction
export function convert(moveLetter: string | null ): Direction | null {
  switch(moveLetter) {
    case 'a':
      return 'left';
    case 'w':
      return 'up';
    case 's':
      return 'down';
    case 'd':
      return 'right';
    default:
      console.warn("Unknown move letter:", moveLetter);
      return null;
  }
}

