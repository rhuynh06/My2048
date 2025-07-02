import numpy as np
import random
import tkinter as tk
from tkinter import simpledialog, messagebox

def init_grid(row=4, col=4):
    grid = np.zeros((row, col), dtype=int)
    start_pos = random.sample([(i, j) for i in range(row) for j in range(col)], k=2)
    for pos in start_pos:
        grid[pos] = 2
    return grid

def add_new(grid):
    row, col = grid.shape
    empty = [(i, j) for i in range(row) for j in range(col) if grid[i][j] == 0]
    if not empty: 
        return False  # no empty space to add a new tile
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
    moved = False

    if direction in ['w', 's']:
        for col in range(col_count):
            column = [grid[row][col] for row in range(row_count)]
            if direction == 's':
                column = column[::-1]
            new_column = move_row(column)
            if direction == 's':
                new_column = new_column[::-1]
            for row in range(row_count):
                if grid[row][col] != new_column[row]:
                    moved = True
                grid[row][col] = new_column[row]

    elif direction in ['a', 'd']:
        for i in range(row_count):
            row = list(grid[i])
            if direction == 'd':
                row = row[::-1]
            new_row = move_row(row)
            if direction == 'd':
                new_row = new_row[::-1]
            if not np.array_equal(grid[i], new_row):
                moved = True
            grid[i] = new_row

    else:
        print('Invalid Move')

    return grid, moved

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


# UI part:
class Game2048:
    COLORS = {
        0: "#cdc1b4", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179",
        16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72",
        256: "#edcc61", 512: "#edc850", 1024: "#edc53f", 2048: "#edc22e"
    }

    def __init__(self, master, rows=4, cols=4):
        self.master = master
        self.rows = rows
        self.cols = cols
        self.grid = init_grid(rows, cols)
        self.buttons = []

        master.title("2048 Game")
        master.bind("<Key>", self.key_handler)

        self.frame = tk.Frame(master, bg="#bbada0")
        self.frame.pack(padx=10, pady=10)

        for r in range(rows):
            row_buttons = []
            for c in range(cols):
                btn = tk.Label(self.frame, text="", width=6, height=3, font=("Helvetica", 24, "bold"),
                               bg=self.COLORS[0], fg="#776e65", borderwidth=2, relief="groove")
                btn.grid(row=r, column=c, padx=5, pady=5)
                row_buttons.append(btn)
            self.buttons.append(row_buttons)

        self.update_ui()

    def update_ui(self):
        for r in range(self.rows):
            for c in range(self.cols):
                value = self.grid[r][c]
                self.buttons[r][c].configure(text=str(value) if value != 0 else "",
                                           bg=self.COLORS.get(value, "#3c3a32"),
                                           fg="#f9f6f2" if value > 4 else "#776e65")

    def key_handler(self, event):
        key = event.char.lower()
        if key in ['w', 'a', 's', 'd']:
            old_grid = self.grid.copy()
            self.grid, moved = move(self.grid, key)
            if moved:
                added = add_new(self.grid)
                self.update_ui()
                if is_game_over(self.grid):
                    messagebox.showinfo("Game Over", "No moves left! Game Over!")
                    self.master.quit()
            else:
                # Move didn't change grid
                pass


def get_grid_size():
    root = tk.Tk()
    root.withdraw()
    try:
        rows = simpledialog.askinteger("Input", "Enter number of rows (2-10):", minvalue=2, maxvalue=10)
        cols = simpledialog.askinteger("Input", "Enter number of columns (2-10):", minvalue=2, maxvalue=10)
    except Exception:
        rows, cols = 4, 4
    if not rows or not cols:
        rows, cols = 4, 4
    root.destroy()
    return rows, cols


if __name__ == "__main__":
    rows, cols = get_grid_size()
    root = tk.Tk()
    game = Game2048(root, rows, cols)
    root.mainloop()