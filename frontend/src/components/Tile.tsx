// Single tile component
import styles from "../styles/Tile.module.css";

interface TileProps {
  value: number;
  position: { row: number; col: number };
  isHint?: boolean;
  skinMode: string;
}

const Tile: React.FC<TileProps> = ({ value, position, skinMode }) => {
  const tileClass =
    value === 0 ? styles.empty : styles[`tile-${value}`] || styles["tile-default"];

  const isImageMode = skinMode !== "numbers";

  const renderContent = () => {
    if (value === 0) return "";

    if (isImageMode) {
      const src = `/2048/skins/${skinMode}/${value}.png`;
      return (
        <img
          src={src}
          alt={value.toString()}
          onError={(e) => {
            // default skin (numbers)
            (e.target as HTMLImageElement).replaceWith(value.toString());
          }}
        />
      );
    }

    return value;
  };

  return (
    <div
      className={`${styles.tile} ${tileClass}`}
      style={{
        gridRowStart: position.row + 1,
        gridColumnStart: position.col + 1,
      }}
    >
      {renderContent()}
    </div>
  );
};

export default Tile;
