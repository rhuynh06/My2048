import numpy as np
import random

def init_grid(row=4, col=4):
    grid = np.zeros((row, col), dtype=int)
    start_pos = random.sample([(i, j) for i in range(row) for j in range(col)], k=2)
    for pos in start_pos:
        grid[pos] = 2
    return grid

def add_new(grid):
    row, col = grid.shape
    empty = [(i, j) for i in range(row) for j in range(col) if grid[i][j] == 0]
    if not empty: return  # no empty space to add a new tile
    new_pos = random.choice(empty)
    grid[new_pos] = random.choices([2, 4], weights=[80, 20])[0]
    return True

def compress(row):
    row = list(row)
    return [num for num in row if num != 0] + [0] * row.count(0)

def combine(row):
    for i in range(len(row) - 1):
        if row[i] != 0 and row[i] == row[i + 1]:
            row[i] *= 2
            row[i + 1] = 0
    return row

def move_row(row):
    row = compress(row)
    row = combine(row)
    row = compress(row)
    return row

def move(grid, direction):
    row_count, col_count = grid.shape

    if direction in ['w', 's']:
        for col in range(col_count):
            column = [grid[row][col] for row in range(row_count)]
            if direction == 's':
                column = column[::-1]
            column = move_row(column)
            if direction == 's':
                column = column[::-1]
            for row in range(row_count):
                grid[row][col] = column[row]

    elif direction in ['a', 'd']:
        for i in range(row_count):
            row = list(grid[i])
            if direction == 'd':
                row = row[::-1]
            row = move_row(row)
            if direction == 'd':
                row = row[::-1]
            grid[i] = row

    else:
        print('Invalid Move')

    return grid

def display(grid):
    print("-" * (len(grid[0]) * 5))
    for row in grid:
        print(" ".join(f"{num:4}" if num != 0 else "   ." for num in row))
    print("-" * (len(grid[0]) * 5))

def is_game_over(grid):
    # If there's any empty space, game is not over
    if any(0 in row for row in grid):
        return False

    # Check horizontal moves
    for row in grid:
        for i in range(len(row) - 1):
            if row[i] == row[i + 1]:
                return False

    # Check vertical moves
    for col in range(len(grid[0])):
        for row in range(len(grid) - 1):
            if grid[row][col] == grid[row + 1][col]:
                return False

    # No moves left
    return True

def main():
    print("Welcome to 2048!")
    try:
        row = int(input("Insert number of rows: "))
        col = int(input("Insert number of columns: "))
    except ValueError:
        print("Invalid input, using default 4x4 grid.")
        row, col = 4, 4

    grid = init_grid(row, col)

    while True:
        display(grid)
        if is_game_over(grid):
            print('GAME OVER')
            break
        moved = False
        while not moved:
            direction = input("Move (a:left, w:up, s:down, d:right): ").lower()
            if direction not in ['a', 'w', 's', 'd']:
                print("Invalid direction, try again.")
                continue
            old_grid = grid.copy()
            grid = move(grid, direction)
            if not np.array_equal(old_grid, grid):
                moved = True
            else:
                print("Move didn't change the board. Try a different move.")

        add_new(grid)

if __name__ == '__main__':
    main()