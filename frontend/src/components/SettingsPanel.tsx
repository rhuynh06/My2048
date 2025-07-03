// Toggles for skins, AI, mods, difficulty
import React from "react";

interface SettingsPanelProps {
  difficulty: string;
  onDifficultyChange: (val: string) => void;
  skinMode: string;
  onSkinChange: (val: string) => void;
  mods: Record<string, boolean>;
  onModToggle: (modName: string) => void;
}

const difficulties = ["easy", "medium", "hard", "normal"];
const skins = ["numbers", "solo-leveling", "reincarned as a slime", "manwhas", "animes", "soccer players", "programming"]
const modList = ["bomb", "combo", "chain", "undo", "delete", "frozen", "quantum"];

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  difficulty,
  onDifficultyChange,
  skinMode,
  onSkinChange,
  mods,
  onModToggle,
}) => {
  return (
    <div>
      <div>
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Skin: </label>
        <select value={skinMode} onChange={(e) => onSkinChange(e.target.value)}>
          {skins.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>Mods:</strong>
        {modList.map((mod) => (
          <div key={mod}>
            <label>
              <input
                type="checkbox"
                checked={mods[mod] || false}
                onChange={() => onModToggle(mod)}
              />
              {mod.charAt(0).toUpperCase() + mod.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;