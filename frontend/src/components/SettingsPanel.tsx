// Toggles for skins, AI, mods, difficulty
import styles from "../styles/SettingPanels.module.css";

interface SettingsPanelProps {
  difficulty: string;
  onDifficultyChange: (val: string) => void;
  skinMode: string;
  onSkinChange: (val: string) => void;
  mods: Record<string, boolean>;
  onModToggle: (modName: string) => void;
}

const difficulties = ["easy", "medium", "hard", "normal"];
const modList = ["bomb", "combo", "chain", "undo", "delete", "frozen", "quantum"];
const skinOptions = [
  {
    value: "numbers",
    label: "Numbers",
    preview: "128",
  },
  {
    value: "solo-leveling",
    label: "Solo Leveling",
    preview: "/2048/skins/solo-leveling/128.png",
  },
  {
    value: "slime",
    label: "Reincarnated as a Slime",
    preview: "/2048/skins/slime/128.png",
  },
  {
    value: "programming",
    label: "Programming Tools",
    preview: "/2048/skins/programming/128.png",
  },
  {
    value: "minecraft",
    label: "Minecraft",
    preview: "/2048/skins/minecraft/128.png",
  },
  {
    value: "video-games",
    label: "Video Games",
    preview: "/2048/skins/video-games/128.png",
  },
  {
    value: "board-games",
    label: "Board Games",
    preview: "/2048/skins/board-games/128.png",
  },
  {
    value: "pokemon",
    label: "Pokemon ",
    preview: "/2048/skins/pokemon/128.png",
  },
];

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

      <div className={styles.skinGrid}>
        {skinOptions.map((option) => (
          <div
            key={option.value}
            className={`${styles.skinCard} ${
              skinMode === option.value ? styles.selected : ""
            }`}
            onClick={() => onSkinChange(option.value)}
          >
            <div className={styles.preview}>
              {option.value === "numbers" ? (
                <span className={styles.previewNumber}>{option.preview}</span>
              ) : (
                <img src={option.preview} alt={option.label} />
              )}
            </div>
            <div className={styles.label}>{option.label}</div>
          </div>
        ))}
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