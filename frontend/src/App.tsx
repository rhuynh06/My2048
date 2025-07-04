import { useState, useEffect, useRef } from "react";
import { useGameState } from "./hooks/useGameState";
import { useKeyboard } from "./hooks/useKeyboard";
import { useAI } from "./hooks/useAI";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Direction } from "./game/logic";

import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ScoreBoard from "./components/ScoreBoard";
import Modal from "./components/Modal";
import SettingsPanel from "./components/SettingsPanel";
import HintButton from "./components/HintButton";
import AutoplayToggle from "./components/AutoPlayToggle";
import UpdateList from "./components/UpdatesList";

import "./App.css";
import styles from "./styles/App.module.css";
import header from "/header.png";

function App() {
  const {
    grid,
    score,
    highScore,
    moves,
    gameOver,
    difficulty,
    move,
    restart,
    undo,
    setDifficulty,
    continueGame,
    shouldShowWinModal,
    shouldShowGameOverModal,
  } = useGameState();

  const { getHint, hint, loading, getAutoMove } = useAI();
  const [skinMode, setSkinMode] = useLocalStorage("skinMode", "numbers");
  const [mods, setMods] = useLocalStorage("mods", {} as Record<string, boolean>);
  const [showSettings, setShowSettings] = useState(false);
  const [visibleHint, setVisibleHint] = useState<Direction | null>(null);
  const hintTimeoutRef = useRef<number | null>(null);
  const [hintRequestId, setHintRequestId] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  // Player move
  useKeyboard(move);

  // Mods (TO BE ADDED)
  const toggleMod = (modName: string) => {
    setMods((prev) => ({
      ...prev,
      [modName]: !prev[modName],
    }));
  };

  // Hint
  const arrowMap: Record<string, string> = {
    w: '↑',
    a: '←',
    s: '↓',
    d: '→',
  };

  const handleHintClick = () => {
    getHint(grid);
    setHintRequestId(prev => prev + 1); 
  };

  useEffect(() => {
    if (!hint) return;

    // Whenever hint changes or user requested hint again, reset visibleHint and timer
    setVisibleHint(hint);

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

    hintTimeoutRef.current = setTimeout(() => {
      setVisibleHint(null);
    }, 3000);

    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, [hint, hintRequestId]);

  const toggleAutoplay = () => {
    setAutoplay(prev => !prev);
  };

  // Autoplay
  useEffect(() => {
    if (autoplay && !gameOver) {
      autoplayRef.current = setInterval(async () => {
        const nextMove = await getAutoMove(grid);
        if (nextMove) {
          move(nextMove);
        } else {
          setAutoplay(false);
          if (autoplayRef.current) clearInterval(autoplayRef.current);
        }
      }, 100); // to increase speed (min: 10)
    } else {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, grid, gameOver, getAutoMove, move]);

  // Preload Skins
  useEffect(() => {
    const values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
    values.forEach((v) => {
      const img = new Image();
      img.src = `/2048/skins/${skinMode}/${v}.png`;
    });
  }, [skinMode]);

  return (
    <div style={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
      {/* <h1 className={styles.title}>2048</h1> */}
      <img src={header} width="50%" ></img>

      {/* SETTINGS PANEL */}
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

      {/* SETTINGS MODAL */}
      <Modal show={showSettings} onClose={() => setShowSettings(false)} title="Settings">
        <SettingsPanel
          difficulty={difficulty}
          onDifficultyChange={(mode) => {
            setDifficulty(mode);
            setShowSettings(false);
          }}
          skinMode={skinMode}
          onSkinChange={setSkinMode}
          mods={mods}
          onModToggle={toggleMod}
        />
      </Modal>

       {/* WIN MODAL */}
      <Modal
        show={shouldShowWinModal}
        onClose={() => continueGame()}
        title="You Win!"
      >
        <p>Congratulations, you reached 2048!</p>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
          <button onClick={restart}>New Game</button>
          <button onClick={continueGame}>Keep Playing</button>
        </div>
      </Modal>

       {/* LOSE MODAL */}
      <Modal
        show={shouldShowGameOverModal}
        onClose={restart}
        title="Game Over"
      >
        <p>No more moves available.</p>
        <div style={{ marginTop: 20 }}>
          <button onClick={restart}>Try again</button>
        </div>
      </Modal>

      <ScoreBoard score={score} highScore={highScore} moves={moves} />

      <div>
        <GameBoard grid={grid} skinMode={skinMode} />
        {visibleHint && (
          <div className={styles.hintArrow} aria-label={`Hint arrow pointing ${visibleHint}`}>
            {arrowMap[visibleHint]}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <GameControls
          onRestart={restart}
          onUndo={undo}
          undoDisabled={gameOver}
        />

        <HintButton
          onHint={handleHintClick}
          // disabled={difficulty !== "medium"}
          loading={loading}
        />

        <AutoplayToggle
          autoplay={autoplay}
          onToggle={toggleAutoplay}
          // disabled={difficulty !== "medium"}
        />
      </div>
    </div>
  );
}

export default App;