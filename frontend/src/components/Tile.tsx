// Single tile component
import styles from "../styles/Tile.module.css";

interface TileProps {
  value: number;
  position: { row: number; col: number };
  isHint?: boolean;
}

const Tile: React.FC<TileProps> = ({ value, position, isHint }) => {
  const tileClass = value === 0 ? styles.empty : styles[`tile${value}`] || styles.tileDefault;
  return (
    <div
      className={`${styles.tile} ${tileClass} ${isHint ? styles.hint : ""}`}
      style={{
        gridRowStart: position.row + 1,
        gridColumnStart: position.col + 1,
      }}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;