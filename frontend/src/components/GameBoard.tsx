// Main grid rendering + layout
import Tile from "./Tile";
import type { Grid, Direction } from "../game/logic";
import styles from "../styles/GameBoard.module.css";

interface GameBoardProps {
  grid: Grid;
  hint?: Direction | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ grid, hint }) => {
  const size = grid.length;

  const getHintPosition = (): { row: number; col: number } | null => {
    if (!hint) return null;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const val = grid[i][j];
        if (val === 0) continue;

        switch (hint) {
          case "up":
            if (i > 0 && grid[i - 1][j] === val) return { row: i, col: j };
            break;
          case "down":
            if (i < size - 1 && grid[i + 1][j] === val) return { row: i, col: j };
            break;
          case "left":
            if (j > 0 && grid[i][j - 1] === val) return { row: i, col: j };
            break;
          case "right":
            if (j < size - 1 && grid[i][j + 1] === val) return { row: i, col: j };
            break;
        }
      }
    }
    return null;
  };

  const hintPos = getHintPosition();

  return (
    <div
      className={styles.gameBoard}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {grid.map((row, i) =>
        row.map((value, j) => (
          <Tile
            key={`${i}-${j}`}
            value={value}
            position={{ row: i, col: j }}
            isHint={hintPos ? hintPos.row === i && hintPos.col === j : false}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;