import numpy as np
import random
import copy

class Game2048:
    def __init__(self, rows=4, cols=4):
        self.rows = rows
        self.cols = cols
        self.score = 0
        self.grid = self.init_grid()
        self.history = []  # stack for undo (stores (grid, score))

    def init_grid(self):
        grid = np.zeros((self.rows, self.cols), dtype=int)
        start_pos = random.sample([(i, j) for i in range(self.rows) for j in range(self.cols)], k=2)
        for pos in start_pos:
            grid[pos] = 2
        return grid

    def add_new(self):
        empty = [(i, j) for i in range(self.rows) for j in range(self.cols) if self.grid[i][j] == 0]
        if not empty:
            return False
        new_pos = random.choice(empty)
        self.grid[new_pos] = random.choices([2, 4], weights=[80, 20])[0]
        return True

    def compress(self, row):
        row = list(row)
        return [num for num in row if num != 0] + [0] * row.count(0)

    def combine(self, row):
        score_gain = 0
        for i in range(len(row) - 1):
            if row[i] != 0 and row[i] == row[i + 1]:
                row[i] *= 2
                score_gain += row[i]
                row[i + 1] = 0
        return row, score_gain

    def move_row(self, row):
        row = self.compress(row)
        row, score_gain = self.combine(row)
        row = self.compress(row)
        return row, score_gain

    def move(self, direction):
        row_count, col_count = self.grid.shape
        total_score = 0
        moved_grid = self.grid.copy()

        if direction in ['w', 's']:
            for col in range(col_count):
                column = [moved_grid[row][col] for row in range(row_count)]
                if direction == 's':
                    column = column[::-1]
                new_col, score_gain = self.move_row(column)
                total_score += score_gain
                if direction == 's':
                    new_col = new_col[::-1]
                for row in range(row_count):
                    moved_grid[row][col] = new_col[row]

        elif direction in ['a', 'd']:
            for i in range(row_count):
                row = list(moved_grid[i])
                if direction == 'd':
                    row = row[::-1]
                new_row, score_gain = self.move_row(row)
                total_score += score_gain
                if direction == 'd':
                    new_row = new_row[::-1]
                moved_grid[i] = new_row

        else:
            print('Invalid Move')
            return False

        changed = not np.array_equal(moved_grid, self.grid)
        if changed:
            # Save state for undo before updating
            self.history.append((copy.deepcopy(self.grid), self.score))
            self.grid = moved_grid
            self.score += total_score
            if not self.add_new():
                # No empty space for new tile (game may be over soon)
                pass
        else:
            print("Move didn't change the board.")
            return False

        return True

    def display(self):
        print("-" * (self.cols * 6))
        print(f"Score: {self.score}")
        for row in self.grid:
            print(" ".join(f"{num:5}" if num != 0 else "    ." for num in row))
        print("-" * (self.cols * 6))

    def is_game_over(self):
        if any(0 in row for row in self.grid):
            return False

        for row in self.grid:
            for i in range(len(row) - 1):
                if row[i] == row[i + 1]:
                    return False

        for col in range(self.cols):
            for row in range(self.rows - 1):
                if self.grid[row][col] == self.grid[row + 1][col]:
                    return False

        return True

    def undo(self):
        if self.history:
            self.grid, self.score = self.history.pop()
            print("Undo successful.")
        else:
            print("No moves to undo.")

    def restart(self):
        self.grid = self.init_grid()
        self.score = 0
        self.history.clear()
        print("Game restarted.")

    def swap_tiles(self):
        try:
            print("Enter coordinates of first tile to swap (row col):")
            r1, c1 = map(int, input().split())
            print("Enter coordinates of second tile to swap (row col):")
            r2, c2 = map(int, input().split())
            if (0 <= r1 < self.rows and 0 <= c1 < self.cols and
                0 <= r2 < self.rows and 0 <= c2 < self.cols):
                self.grid[r1][c1], self.grid[r2][c2] = self.grid[r2][c2], self.grid[r1][c1]
                print(f"Swapped ({r1},{c1}) with ({r2},{c2})")
            else:
                print("Coordinates out of bounds.")
        except Exception:
            print("Invalid input for swap.")

    def delete_cell(self):
        try:
            print("Enter coordinates of tile to delete (row col):")
            r, c = map(int, input().split())
            if 0 <= r < self.rows and 0 <= c < self.cols:
                self.grid[r][c] = 0
                print(f"Deleted tile at ({r},{c})")
            else:
                print("Coordinates out of bounds.")
        except Exception:
            print("Invalid input for delete.")

    def run(self):
        print("Welcome to 2048!")
        while True:
            self.display()
            if self.is_game_over():
                print('GAME OVER')
                break

            print("Controls: a:left, w:up, s:down, d:right, u:undo, r:restart,")
            print("         swap: swap two tiles, del: delete a tile, q: quit")

            command = input("Your move: ").lower()

            if command == 'q':
                print("Quitting...")
                break

            elif command == 'r':
                self.restart()

            elif command == 'u':
                self.undo()

            elif command == 'swap':
                self.swap_tiles()

            elif command == 'del':
                self.delete_cell()

            elif command in ['a', 'w', 's', 'd']:
                self.move(command)

            else:
                print("Invalid command.")

if __name__ == '__main__':
    try:
        rows = int(input("Insert number of rows: "))
        cols = int(input("Insert number of columns: "))
    except ValueError:
        print("Invalid input, using default 4x4 grid.")
        rows, cols = 4, 4

    game = Game2048(rows, cols)
    game.run()