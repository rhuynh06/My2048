// Button that triggers AI hint
interface HintButtonProps {
    onHint: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint, disabled, loading }) => {
    return (
        <button onClick={onHint} disabled={disabled || loading}>
            {loading ? "Thinking..." : "Hint"}
        </button>
    );
};

export default HintButton;