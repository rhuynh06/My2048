// Button that triggers AI hint
import styles from "../styles/Button.module.css";

interface HintButtonProps {
  onHint: () => void;
  loading?: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint, loading }) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.hint}`}
      onClick={onHint}
      // disabled={true}
    >
      {loading ? "Thinking..." : "Hint 💡"}
    </button>
  );
};

export default HintButton;
