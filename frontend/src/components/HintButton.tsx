// Button that triggers AI hint
import styles from "../styles/HintButton.module.css";

interface HintButtonProps {
  onHint: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint, disabled, loading }) => {
  return (
    <button
      className={styles.hintButton}
      onClick={onHint}
      disabled={disabled || loading}
    >
      {loading ? "Thinking..." : "Hint"}
    </button>
  );
};

export default HintButton;
