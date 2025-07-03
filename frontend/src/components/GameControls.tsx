// Buttons: restart, difficulty, toggles
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
        <div style={{ marginTop: 20 }}>
            <button onClick={onRestart}>Restart</button>
            <button onClick={onUndo} disabled={undoDisabled}>Undo</button>
        </div>
    );
};

export default GameControls;
