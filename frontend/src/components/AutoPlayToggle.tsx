// Toggle AI autoplay on/off
import styles from "../styles/Button.module.css"

interface AutoplayToggleProps {
  autoplay: boolean;
  onToggle: () => void;
}

const AutoplayToggle: React.FC<AutoplayToggleProps> = ({ autoplay, onToggle }) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.autoplay}`}
      onClick={onToggle}
      // disabled={true}
    >
      {autoplay ? "Stop Autoplay" : "Start Autoplay"}
    </button>
  );
};

export default AutoplayToggle;
