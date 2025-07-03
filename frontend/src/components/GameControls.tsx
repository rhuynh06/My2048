// Buttons: restart, difficulty, toggles
import styles from "../styles/GameControls.module.css";

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
    <div className={styles.controls}>
      <button className={styles.button} onClick={onRestart}>New Game</button>
      <button
        className={styles.button}
        onClick={onUndo}
        disabled={undoDisabled}
      >
        Undo
      </button>
    </div>
  );
};

export default GameControls;
