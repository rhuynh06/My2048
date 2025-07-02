import numpy as np
import random

def init_grid(row = 4, col = 4):
    grid = np.zeros((row, col), dtype=int)
    start_pos = random.sample([(i, j) for i in range(row) for j in range(col)], k=2)
    for pos in start_pos:
        grid[pos] = 2
    return grid

def add_new(grid, row = 4, col = 4):
    new_pos = random.sample([(i, j) for i in range(row) for j in range(col) if (grid[i][j] == 0)], k=1)
    grid[new_pos[0]] = random.choices([2, 4], [80, 20], k=1)[0]
    return grid

def compress(row):
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
    if direction in ['w', 's']:
        for col in range(len(grid[0])):
            column = [grid[row][col] for row in range(len(grid))]
            if direction == 's': column = column[::-1]
            column = move_row(column)
            if direction == 's': column = column[::-1]
            for row in range(len(grid)):
                grid[row][col] = column[row]
    elif direction in ['a', 'd']:
        for i in range(len(grid)):
            row = grid[i]
            if direction == 'd': row = row[::-1]
            row = move_row(row)
            if direction == 'd': row = row[::-1]
            grid[i] = row
    else:
        print('Invalid Move')

    return grid

def display(grid):
    for i in range(len(grid)):
        print(grid[i])