import numpy as np
from logic import move, init_grid, add_new, is_game_over, display
import time

# ---------- AI logic functions ----------

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
    empty_weight = 270
    max_weight = 1.0
    smooth_weight = 0.1
    mono_weight = 47

    return (empty_weight * count_empty(grid) +
            max_weight * max_tile(grid) +
            smooth_weight * smoothness(grid) +
            mono_weight * monotonicity(grid))

MAX_DEPTH = 3

def expectimax(grid, depth, is_player_turn):
    if depth == 0:
        return heuristic(grid)

    if is_player_turn:
        max_score = float('-inf')
        moves = ['w', 'a', 's', 'd']
        for move_dir in moves:
            new_grid, moved, _ = move(grid.copy(), move_dir)
            if not moved:
                continue
            score = expectimax(new_grid, depth - 1, False)
            if score > max_score:
                max_score = score
        if max_score == float('-inf'):
            return heuristic(grid)
        return max_score
    else:
        empties = [(r, c) for r in range(grid.shape[0]) for c in range(grid.shape[1]) if grid[r, c] == 0]
        if not empties:
            return heuristic(grid)

        scores = []
        sample_empties = empties if len(empties) <= 6 else empties[:6]

        for pos in sample_empties:
            for tile_value, prob in [(2, 0.9), (4, 0.1)]:
                new_grid = grid.copy()
                new_grid[pos] = tile_value
                score = expectimax(new_grid, depth - 1, True)
                scores.append(score * prob / len(sample_empties))

        return sum(scores)

def get_best_move(grid):
    moves = ['w', 'a', 's', 'd']
    best_move = None
    best_score = float('-inf')

    for move_dir in moves:
        new_grid, moved, _ = move(grid.copy(), move_dir)
        if not moved:
            continue
        score = expectimax(new_grid, MAX_DEPTH - 1, False)
        if score > best_score:
            best_score = score
            best_move = move_dir
    return best_move


# ---------- Terminal AI runner ----------

def run_ai_terminal():
    print("Starting AI automated 2048 in terminal...")
    grid = init_grid(4, 4)
    score = 0

    display(grid)
    print(f"Score: {score}")

    while True:
        if is_game_over(grid):
            print("GAME OVER")
            break

        move_dir = get_best_move(grid)
        if move_dir is None:
            print("No valid moves left! Game over.")
            break

        print(f"AI Move: {move_dir.upper()}")
        grid, moved, gained = move(grid, move_dir)
        if moved:
            score += gained
            add_new(grid)
            display(grid)
            print(f"Score: {score}")

            if np.max(grid) >= 2048:
                print("AI reached 2048! Congratulations!")
                break
        else:
            print("Move didn't change board - AI stopped.")
            break

        time.sleep(0.5)  # pause so you can watch progress


if __name__ == "__main__":
    run_ai_terminal()