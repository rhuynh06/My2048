import numpy as np
import random

class Game2048:
    def __init__(self, size=4):
        self.size = size
        self.reset()

    def reset(self):
        self.board = np.zeros((self.size, self.size), dtype=int)
        self.score = 0
        self._add_tile()
        self._add_tile()
        return self.get_state()

    def get_state(self):
        state = np.zeros((self.size, self.size, 16))  # 16 = max log2(2^16) tile
        for i in range(self.size):
            for j in range(self.size):
                value = self.board[i][j]
                if value != 0:
                    log2_val = int(np.log2(value))
                    state[i][j][log2_val] = 1
        return state.flatten()


    def _add_tile(self):
        empty = list(zip(*np.where(self.board == 0)))
        if not empty: return
        i, j = random.choice(empty)
        self.board[i][j] = 2 if random.random() < 0.9 else 4

    def _compress(self, row):
        row = row[row != 0]
        return np.concatenate([row, np.zeros(4 - len(row), dtype=int)])

    def _merge(self, row):
        score = 0
        for i in range(3):
            if row[i] == row[i + 1] and row[i] != 0:
                row[i] *= 2
                score += row[i]
                row[i + 1] = 0
        return row, score

    def _move_row_left(self, row):
        row = self._compress(row)
        row, score = self._merge(row)
        row = self._compress(row)
        return row, score

    def move(self, direction):
        rotated = np.rot90(self.board, -direction)
        moved = np.zeros_like(self.board)
        total_score = 0
        for i in range(4):
            row, score = self._move_row_left(rotated[i])
            moved[i] = row
            total_score += score
        moved = np.rot90(moved, direction)
        if np.array_equal(self.board, moved):
            return self.get_state(), -1, self.is_game_over()
        self.board = moved
        self.score += total_score
        self._add_tile()
        return self.get_state(), total_score, self.is_game_over()

    def is_game_over(self):
        if np.any(self.board == 0):
            return False

        # Check for possible merges horizontally and vertically
        for i in range(self.size):
            for j in range(self.size - 1):
                if self.board[i][j] == self.board[i][j + 1] or self.board[j][i] == self.board[j + 1][i]:
                    return False

        return True
    
    def get_max_tile(self):
        return int(self.board.max())
