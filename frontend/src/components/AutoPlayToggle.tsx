// Toggle AI autoplay on/off
import styles from "../styles/Button.module.css"

interface AutoplayToggleProps {
  autoplay: boolean;
  onToggle: () => void;
  disabled?: boolean
}

const AutoplayToggle: React.FC<AutoplayToggleProps> = ({ autoplay, onToggle, disabled }) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.autoplay}`}
      onClick={onToggle}
      disabled={disabled}>
      {autoplay ? "Stop Autoplay" : "Start Autoplay"}
    </button>
  );
};

export default AutoplayToggle;
