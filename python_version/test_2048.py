import unittest
import numpy as np
from copy import deepcopy
from python_version.logic import init_grid, add_new, compress, combine, move_row, move, is_game_over

class TestGameLogic(unittest.TestCase):

    def test_compress(self):
        self.assertEqual(compress([1, 0, 0, 1]), [1, 1, 0, 0])
        self.assertEqual(compress([1, 0, 0, 1])[::-1], [0, 0, 1, 1])

    def test_combine(self):
        row, score = combine([1, 1, 1, 0])
        self.assertEqual(row, [2, 0, 1, 0])
        self.assertEqual(score, 2)

        row, score = combine([2, 2, 0, 2])
        self.assertEqual(row, [4, 0, 0, 2])
        self.assertEqual(score, 4)

    def test_move_row(self):
        row, score = move_row([2, 0, 2, 2])
        self.assertEqual(row, [4, 2, 0, 0])
        self.assertEqual(score, 4)

        row, score = move_row([2, 2, 2, 2])
        self.assertEqual(row, [4, 4, 0, 0])
        self.assertEqual(score, 8)

    def test_move_left(self):
        grid = np.array([
            [0, 2, 0, 2],
            [0, 0, 0, 0],
            [2, 2, 0, 0],
            [2, 2, 0, 2]
        ])
        expected = np.array([
            [4, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 0, 0, 0],
            [4, 2, 0, 0]
        ])
        result, moved, score = move(deepcopy(grid), 'a')
        np.testing.assert_array_equal(result, expected)
        self.assertTrue(moved)
        self.assertEqual(score, 12)  # 4 + 4 + 4 from combining

    def test_move_right(self):
        grid = np.array([
            [0, 2, 0, 2],
            [0, 0, 0, 0],
            [2, 2, 0, 2],
            [2, 2, 4, 4]
        ])
        expected = np.array([
            [0, 0, 0, 4],
            [0, 0, 0, 0],
            [0, 0, 2, 4],
            [0, 0, 4, 8]
        ])
        result, moved, score = move(deepcopy(grid), 'd')
        np.testing.assert_array_equal(result, expected)
        self.assertTrue(moved)
        self.assertEqual(score, 20)  # 4 + 4 + 8 + 4

    def test_move_up(self):
        grid = np.array([
            [0, 2, 0, 2],
            [2, 0, 2, 0],
            [0, 2, 0, 2],
            [2, 0, 2, 0]
        ])
        expected = np.array([
            [4, 4, 4, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ])
        result, moved, score = move(deepcopy(grid), 'w')
        np.testing.assert_array_equal(result, expected)
        self.assertTrue(moved)
        self.assertEqual(score, 16)  # 4x4 combines

    def test_move_down(self):
        grid = np.array([
            [0, 2, 0, 2],
            [2, 0, 2, 0],
            [0, 2, 0, 2],
            [2, 0, 2, 0]
        ])
        expected = np.array([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 4, 4, 4]
        ])
        result, moved, score = move(deepcopy(grid), 's')
        np.testing.assert_array_equal(result, expected)
        self.assertTrue(moved)
        self.assertEqual(score, 16)

    def test_init_grid(self):
        grid = init_grid(4, 4)
        self.assertEqual(grid.shape, (4, 4))
        self.assertEqual(np.count_nonzero(grid == 2), 2)

    def test_add_new(self):
        grid = np.zeros((4, 4), dtype=int)
        grid[0][0] = 2
        grid[1][1] = 2
        result = add_new(grid)
        self.assertTrue(result)
        self.assertEqual(np.count_nonzero(grid > 0), 3)
        new_tiles = [grid[i, j] for i in range(4) for j in range(4)
                     if (i, j) not in [(0, 0), (1, 1)] and grid[i, j] != 0]
        self.assertTrue(all(tile in [2, 4] for tile in new_tiles))

    def test_is_game_over(self):
        grid = np.array([
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ])
        self.assertTrue(is_game_over(grid))

        grid[3][3] = 0
        self.assertFalse(is_game_over(grid))

if __name__ == '__main__':
    unittest.main()
