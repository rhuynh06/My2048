// Current score + high score display
interface ScoreBoardProps {
    score: number;
    highScore: number;
    moves?: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore, moves }) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <div>Score: <strong>{score}</strong></div>
            <div>High Score: <strong>{highScore}</strong></div>
            {moves !== undefined && <div>Moves: {moves}</div>}
        </div>
    );
};

export default ScoreBoard;
