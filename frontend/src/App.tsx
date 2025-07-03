import { useState, useEffect } from "react";
import { useGameState } from "./hooks/useGameState";
import { useKeyboard } from "./hooks/useKeyboard";
import { useAI } from "./hooks/useAI";
import { useLocalStorage } from "./hooks/useLocalStorage";

import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import HintButton from "./components/HintButton";
import ScoreBoard from "./components/ScoreBoard";
import Modal from "./components/Modal";
import SettingsPanel from "./components/SettingsPanel";
import UpdateList from "./components/UpdatesList";

function App() {
  const {
    grid,
    score,
    highScore,
    moves,
    gameOver,
    move,
    restart,
    undo,
    difficulty,
    setDifficulty,
  } = useGameState();

  const { getHint, hint, loading: aiLoading } = useAI();
  const [skinMode, setSkinMode] = useLocalStorage("skinMode", "numbers");
  const [mods, setMods] = useLocalStorage("mods", {} as Record<string, boolean>);
  const [showSettings, setShowSettings] = useState(false);
  
  useKeyboard(move);

  const toggleMod = (modName: string) => {
    setMods(prev => ({
      ...prev,
      [modName]: !prev[modName],
    }));
  };



  useEffect(() => {
    if (gameOver) alert("Game Over!");
  }, [gameOver]);

  const handleHintClick = () => {
    getHint(grid, difficulty);
  };

  return (
    <div style={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
      <h1>2048</h1>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setShowSettings(true)}>⚙️ Settings</button>
      </div>

      <Modal show={showSettings} onClose={() => setShowSettings(false)} title="Settings">
        <SettingsPanel
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          skinMode={skinMode}
          onSkinChange={setSkinMode}
          mods={mods}
          onModToggle={toggleMod}
        />
      </Modal>

      <ScoreBoard score={score} highScore={highScore} moves={moves} />
      
      <GameBoard grid={grid} hint={hint} />

      <GameControls onRestart={restart} onUndo={undo} undoDisabled={gameOver} />

      <HintButton
        onHint={handleHintClick}
        disabled={difficulty !== "normal"}
        loading={aiLoading}
      />

      <UpdateList/>
    </div>
  );
}

export default App;
