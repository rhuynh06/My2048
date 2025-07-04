// Buttons: restart, difficulty, toggles
import styles from "../styles/Button.module.css";

interface GameControlProps {
  onRestart: () => void;
  onUndo: () => void;
  undoDisabled: boolean;
}

const GameControls: React.FC<GameControlProps> = ({
  onRestart,
  onUndo,
  undoDisabled,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <button 
        className={`${styles.buttonBase}
        ${styles.primary}`}
        onClick={onRestart}
      >
        New Game
      </button>
      <button
        className={`${styles.buttonBase} ${styles.primary}`}
        onClick={onUndo}
        disabled={undoDisabled}
      >
        Undo ↩️
      </button>
    </div>
  );
};

export default GameControls;
