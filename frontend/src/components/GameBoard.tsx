import Tile from "./Tile";
import type { Grid, Direction } from "../game/logic";
import styles from "../styles/GameBoard.module.css";

interface GameBoardProps {
  grid: Grid;
  skinMode: string;
  hintDirection?: Direction | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ grid, skinMode }) => {
  const size = grid.length;

  return (
    <div className={styles.boardContainer}>
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
              skinMode={skinMode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;