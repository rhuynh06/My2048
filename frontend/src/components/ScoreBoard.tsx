// Current score + high score display
import styles from "../styles/ScoreBoard.module.css";

interface ScoreBoardProps {
  score: number;
  highScore: number;
  moves?: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore, moves }) => {
  return (
    <>
      <div className={styles.scoreboard}>
        <div className={styles.scoreItem}>
          <div className={styles.label}>Score</div>
          <div className={styles.value}>{score}</div>
        </div>
        <div className={styles.scoreItem}>
          <div className={styles.label}>Best</div>
          <div className={styles.value}>{highScore}</div>
        </div>
      </div>
      {moves !== undefined && (
        <div className={styles.moves}>Moves: {moves}</div>
      )}
    </>
  );
};

export default ScoreBoard;
