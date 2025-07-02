import unittest
import numpy as np
from copy import deepcopy

from logic import init_grid, add_new, compress, combine, move_row, move

class TestGameLogic(unittest.TestCase):

    def test_compress(self):
        self.assertEqual(compress([1, 0, 0, 1]), [1, 1, 0, 0])
        self.assertEqual(compress([1, 0, 0, 1])[::-1], [0, 0, 1, 1])

    def test_combine(self):
        self.assertEqual(combine([1, 1, 1, 0]), [2, 0, 1, 0])
        self.assertEqual(combine([2, 2, 0, 2]), [4, 0, 0, 2])

    def test_move_row(self):
        self.assertEqual(move_row([2, 0, 2, 2]), [4, 2, 0, 0])
        self.assertEqual(move_row([2, 2, 2, 2]), [4, 4, 0, 0])

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
        result = move(deepcopy(grid), 'a')
        np.testing.assert_array_equal(result, expected)

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
            [0, 0, 2, 4],  # Note this is the expected result per your comment
            [0, 0, 4, 8]
        ])
        result = move(deepcopy(grid), 'd')
        np.testing.assert_array_equal(result, expected)

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
        result = move(deepcopy(grid), 'w')
        np.testing.assert_array_equal(result, expected)

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
        result = move(deepcopy(grid), 's')
        np.testing.assert_array_equal(result, expected)

    def test_init_grid(self):
        grid = init_grid(4, 4)
        self.assertEqual(grid.shape, (4, 4))
        # Check exactly two tiles with value 2 in initial grid
        self.assertEqual(np.count_nonzero(grid == 2), 2)

    def test_add_new(self):
        grid = np.zeros((4, 4), dtype=int)
        grid[0][0] = 2
        grid[1][1] = 2
        # add_new returns True if it added a tile, None if no space
        result = add_new(grid)
        self.assertTrue(result)
        # Now count nonzero cells; should be 3
        self.assertEqual(np.count_nonzero(grid > 0), 3)
        # The last added tile should be 2 or 4
        new_tiles = [grid[i, j] for i in range(4) for j in range(4) if (i, j) not in [(0,0), (1,1)] and grid[i,j] != 0]
        self.assertTrue(all(tile in [2, 4] for tile in new_tiles))

if __name__ == '__main__':
    unittest.main()