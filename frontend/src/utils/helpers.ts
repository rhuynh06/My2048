// Small helper functions

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