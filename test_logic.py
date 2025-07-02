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
        grid = [
            [0, 2, 0, 2],
            [0, 0, 0, 0],
            [2, 2, 0, 0],
            [2, 2, 0, 2]
        ]
        expected = [
            [4, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 0, 0, 0],
            [4, 2, 0, 0]
        ]
        self.assertEqual(move(deepcopy(grid), 'a'), expected)

    def test_move_right(self):
        grid = [
            [0, 2, 0, 2],
            [0, 0, 0, 0],
            [2, 2, 0, 2],
            [2, 2, 4, 4]
        ]
        expected = [
            [0, 0, 0, 4],
            [0, 0, 0, 0],
            [0, 0, 2, 4], # NOT [0, 0, 4, 2]
            [0, 0, 4, 8]
        ]
        self.assertEqual(move(deepcopy(grid), 'd'), expected)

    def test_move_up(self):
        grid = [
            [0, 2, 0, 2],
            [2, 0, 2, 0],
            [0, 2, 0, 2],
            [2, 0, 2, 0]
        ]
        expected = [
            [4, 4, 4, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        self.assertEqual(move(deepcopy(grid), 'w'), expected)

    def test_move_down(self):
        grid = [
            [0, 2, 0, 2],
            [2, 0, 2, 0],
            [0, 2, 0, 2],
            [2, 0, 2, 0]
        ]
        expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 4, 4, 4]
        ]
        self.assertEqual(move(deepcopy(grid), 's'), expected)

    def test_init_grid(self):
        grid = init_grid(4, 4)
        self.assertEqual(grid.shape, (4, 4))
        self.assertEqual(np.count_nonzero(grid == 2), 2)

    def test_add_new(self):
        grid = np.zeros((4, 4), dtype=int)
        grid[0][0] = 2
        grid[1][1] = 2
        grid = add_new(grid)
        self.assertEqual(np.count_nonzero(grid > 0), 3)
        self.assertIn(grid[grid > 0][-1], [2, 4])

if __name__ == '__main__':
    unittest.main()
