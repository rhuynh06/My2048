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

import "./App.css"
import styles from "./styles/App.module.css";

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

  useEffect(() => {
    const values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
    values.forEach(v => {
      const img = new Image();
      img.src = `/skins/${skinMode}/${v}.png`;
    });
  }, [skinMode]);

  return (
    <div style={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
      <h1 className={styles.title}>2048</h1>

      <div className={styles.topControls}>
        <button
          className={styles.settingsButton}
          onClick={() => setShowSettings(true)}
        >
          ⚙️ Settings
        </button>

        <div className={styles.updateDropdown}>
          <button className={styles.updateButton}>📝 Updates</button>
          <div className={styles.updateList}>
            <UpdateList />
          </div>
        </div>
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
      
      <GameBoard grid={grid} hint={hint} skinMode={skinMode} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <GameControls onRestart={restart} onUndo={undo} undoDisabled={gameOver} />

        <HintButton
          onHint={handleHintClick}
          disabled={difficulty !== "normal"}
          loading={aiLoading}
        />
      </div>
    </div>
  );
}

export default App;
