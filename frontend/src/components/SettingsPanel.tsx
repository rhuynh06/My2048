// Toggles for skins, AI, mods, difficulty
import type { Difficulty } from "../hooks/useGameState";
import styles from "../styles/SettingPanels.module.css";

interface SettingsPanelProps {
  difficulty: string;
  onDifficultyChange: (value : Difficulty) => void;
  skinMode: string;
  onSkinChange: (val: string) => void;
  mods: Record<string, boolean>;
  onModToggle: (modName: string) => void;
}

const skinLegendMap: Record<string, (string | number)[]> = {
  numbers: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  "solo-leveling": [
    "skins/solo-leveling/2.png",
    "skins/solo-leveling/4.png",
    "skins/solo-leveling/8.png",
    "skins/solo-leveling/16.png",
    "skins/solo-leveling/32.png",
    "skins/solo-leveling/64.png",
    "skins/solo-leveling/128.png",
    "skins/solo-leveling/256.png",
    "skins/solo-leveling/512.png",
    "skins/solo-leveling/1024.png",
    "skins/solo-leveling/2048.png",
  ],
  slime: [
    "skins/slime/2.png",
    "skins/slime/4.png",
    "skins/slime/8.png",
    "skins/slime/16.png",
    "skins/slime/32.png",
    "skins/slime/64.png",
    "skins/slime/128.png",
    "skins/slime/256.png",
    "skins/slime/512.png",
    "skins/slime/1024.png",
    "skins/slime/2048.png",
  ],
  programming: [
    "skins/programming/2.png",
    "skins/programming/4.png",
    "skins/programming/8.png",
    "skins/programming/16.png",
    "skins/programming/32.png",
    "skins/programming/64.png",
    "skins/programming/128.png",
    "skins/programming/256.png",
    "skins/programming/512.png",
    "skins/programming/1024.png",
    "skins/programming/2048.png",
  ],
  minecraft: [
    "skins/minecraft/2.png",
    "skins/minecraft/4.png",
    "skins/minecraft/8.png",
    "skins/minecraft/16.png",
    "skins/minecraft/32.png",
    "skins/minecraft/64.png",
    "skins/minecraft/128.png",
    "skins/minecraft/256.png",
    "skins/minecraft/512.png",
    "skins/minecraft/1024.png",
    "skins/minecraft/2048.png",
  ],
  "video-games": [
    "skins/video-games/2.png",
    "skins/video-games/4.png",
    "skins/video-games/8.png",
    "skins/video-games/16.png",
    "skins/video-games/32.png",
    "skins/video-games/64.png",
    "skins/video-games/128.png",
    "skins/video-games/256.png",
    "skins/video-games/512.png",
    "skins/video-games/1024.png",
    "skins/video-games/2048.png",
  ],
  "board-games": [
    "skins/board-games/2.png",
    "skins/board-games/4.png",
    "skins/board-games/8.png",
    "skins/board-games/16.png",
    "skins/board-games/32.png",
    "skins/board-games/64.png",
    "skins/board-games/128.png",
    "skins/board-games/256.png",
    "skins/board-games/512.png",
    "skins/board-games/1024.png",
    "skins/board-games/2048.png",
  ],
  pokemon: [
    "skins/pokemon/2.png",
    "skins/pokemon/4.png",
    "skins/pokemon/8.png",
    "skins/pokemon/16.png",
    "skins/pokemon/32.png",
    "skins/pokemon/64.png",
    "skins/pokemon/128.png",
    "skins/pokemon/256.png",
    "skins/pokemon/512.png",
    "skins/pokemon/1024.png",
    "skins/pokemon/2048.png",
  ],
};

const difficulties = ["easy", "medium", "hard"];
const modList = ["bomb", "combo", "chain", "delete", "frozen", "quantum"];
const skinOptions = [
  {
    value: "numbers",
    label: "Numbers",
    preview: "128",
  },
  {
    value: "solo-leveling",
    label: "Solo Leveling",
    preview: "skins/solo-leveling/128.png",
  },
  {
    value: "slime",
    label: "Reincarnated as a Slime",
    preview: "skins/slime/128.png",
  },
  {
    value: "programming",
    label: "Programming Tools",
    preview: "skins/programming/128.png",
  },
  {
    value: "minecraft",
    label: "Minecraft",
    preview: "skins/minecraft/128.png",
  },
  {
    value: "video-games",
    label: "Video Games",
    preview: "skins/video-games/128.png",
  },
  {
    value: "board-games",
    label: "Board Games",
    preview: "skins/board-games/128.png",
  },
  {
    value: "pokemon",
    label: "Pokemon ",
    preview: "skins/pokemon/128.png",
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
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        >
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

      <div className={styles.skinLegend}>
        <strong>Tile Progression:</strong>
        <div className={styles.legendTiles}>
          {skinLegendMap[skinMode]?.map((item, index) => (
            <div key={index} className={styles.legendTile}>
              {typeof item === "number" ? (
                <span className={styles.previewNumber}>{item}</span>
              ) : (
                <img src={item} alt={`Tile ${index}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TO BE ADDED... */}
      <div style={{ marginTop: 10 }}>
        {/* <strong>Mods:</strong> */}
        <strong>TO BE ADDED</strong>
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