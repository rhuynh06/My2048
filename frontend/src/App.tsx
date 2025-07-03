// import GameBoard from './components/GameBoard';
// import ScoreBoard from './components/ScoreBoard';
// import GameControls from './components/GameControls';
// import SettingsPanel from './components/SettingsPanel';
// import { useGameState } from './hooks/useGameState';
import UpdateList from './components/UpdatesList';

const App: React.FC = () => {
  // // Custom hook to manage game state & logic
  // const {
  //   grid,
  //   score,
  //   highScore,
  //   difficulty,
  //   mode,
  //   move,
  //   restart,
  //   undo,
  //   setDifficulty,
  //   toggleMode,
  //   // add other handlers as needed
  // } = useGameState();

  return (
    <div className="app-container" style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>2048 React</h1>

      {/* <ScoreBoard score={score} highScore={highScore} />

      <GameBoard grid={grid} />

      <GameControls
        onRestart={restart}
        onUndo={undo}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        mode={mode}
        onModeToggle={toggleMode}
        // Add handlers for AI hints, autoplay toggles later
      />

      <SettingsPanel
        difficulty={difficulty}
        mode={mode}
        // pass other props and callbacks as needed for toggles
      /> */}

      <UpdateList/>
    </div>
  );
};

export default App;
