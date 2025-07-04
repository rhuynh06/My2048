import numpy as np
from logic import move, is_game_over

def count_empty(grid):
    return np.sum(grid == 0)

def max_tile(grid):
    return np.max(grid)

def smoothness(grid):
    smooth = 0
    rows, cols = grid.shape
    for r in range(rows):
        for c in range(cols - 1):
            if grid[r, c] != 0 and grid[r, c + 1] != 0:
                smooth -= abs(np.log2(grid[r, c]) - np.log2(grid[r, c + 1]))
    for c in range(cols):
        for r in range(rows - 1):
            if grid[r, c] != 0 and grid[r + 1, c] != 0:
                smooth -= abs(np.log2(grid[r, c]) - np.log2(grid[r + 1, c]))
    return smooth

def monotonicity(grid):
    rows, cols = grid.shape
    totals = [0, 0, 0, 0]

    for r in range(rows):
        current = 0
        next_ = 1
        while next_ < cols:
            while next_ < cols and grid[r, next_] == 0:
                next_ += 1
            if next_ >= cols:
                break
            current_val = np.log2(grid[r, current]) if grid[r, current] != 0 else 0
            next_val = np.log2(grid[r, next_]) if grid[r, next_] != 0 else 0
            if current_val > next_val:
                totals[0] += next_val - current_val
            elif next_val > current_val:
                totals[1] += current_val - next_val
            current = next_
            next_ += 1

    for c in range(cols):
        current = 0
        next_ = 1
        while next_ < rows:
            while next_ < rows and grid[next_, c] == 0:
                next_ += 1
            if next_ >= rows:
                break
            current_val = np.log2(grid[current, c]) if grid[current, c] != 0 else 0
            next_val = np.log2(grid[next_, c]) if grid[next_, c] != 0 else 0
            if current_val > next_val:
                totals[2] += next_val - current_val
            elif next_val > current_val:
                totals[3] += current_val - next_val
            current = next_
            next_ += 1

    return max(totals[0], totals[1]) + max(totals[2], totals[3])

def heuristic(grid):
    return (
        270 * count_empty(grid)
        + 1.0 * max_tile(grid)
        + 0.1 * smoothness(grid)
        + 47 * monotonicity(grid)
    )

MAX_DEPTH = 3

def expectimax(grid, depth, is_player_turn):
    if depth == 0 or is_game_over(grid):
        return heuristic(grid)

    if is_player_turn:
        max_score = float('-inf')
        for direction in ['w', 'a', 's', 'd']:
            new_grid, moved, _ = move(grid.copy(), direction)
            if not moved:
                continue
            score = expectimax(new_grid, depth - 1, False)
            max_score = max(max_score, score)
        return max_score if max_score != float('-inf') else heuristic(grid)
    else:
        empty_cells = [(r, c) for r in range(4) for c in range(4) if grid[r, c] == 0]
        if not empty_cells:
            return heuristic(grid)
        total = 0
        for r, c in empty_cells[:6]:  # limit branching
            for value, prob in [(2, 0.9), (4, 0.1)]:
                new_grid = grid.copy()
                new_grid[r, c] = value
                total += prob * expectimax(new_grid, depth - 1, True)
        return total / len(empty_cells)

def get_best_move(grid):
    best_move = None
    best_score = float('-inf')
    for direction in ['w', 'a', 's', 'd']:
        new_grid, moved, _ = move(grid.copy(), direction)
        if not moved:
            continue
        score = expectimax(new_grid, MAX_DEPTH - 1, False)
        if score > best_score:
            best_score = score
            best_move = direction
    return best_move
