// Button that triggers AI hint
import styles from "../styles/Button.module.css";

interface HintButtonProps {
  onHint: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint, disabled, loading }) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.hint}`}
      onClick={onHint}
      disabled={disabled || loading}
    >
      {loading ? "Thinking..." : "Hint 💡"}
    </button>
  );
};

export default HintButton;
