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

const skinLegendMap: Record<string, (string | number)[]> = {
  numbers: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  "solo-leveling": [
    "/2048/skins/solo-leveling/2.png",
    "/2048/skins/solo-leveling/4.png",
    "/2048/skins/solo-leveling/8.png",
    "/2048/skins/solo-leveling/16.png",
    "/2048/skins/solo-leveling/32.png",
    "/2048/skins/solo-leveling/64.png",
    "/2048/skins/solo-leveling/128.png",
    "/2048/skins/solo-leveling/256.png",
    "/2048/skins/solo-leveling/512.png",
    "/2048/skins/solo-leveling/1024.png",
    "/2048/skins/solo-leveling/2048.png",
  ],
  slime: [
    "/2048/skins/slime/2.png",
    "/2048/skins/slime/4.png",
    "/2048/skins/slime/8.png",
    "/2048/skins/slime/16.png",
    "/2048/skins/slime/32.png",
    "/2048/skins/slime/64.png",
    "/2048/skins/slime/128.png",
    "/2048/skins/slime/256.png",
    "/2048/skins/slime/512.png",
    "/2048/skins/slime/1024.png",
    "/2048/skins/slime/2048.png",
  ],
  programming: [
    "/2048/skins/programming/2.png",
    "/2048/skins/programming/4.png",
    "/2048/skins/programming/8.png",
    "/2048/skins/programming/16.png",
    "/2048/skins/programming/32.png",
    "/2048/skins/programming/64.png",
    "/2048/skins/programming/128.png",
    "/2048/skins/programming/256.png",
    "/2048/skins/programming/512.png",
    "/2048/skins/programming/1024.png",
    "/2048/skins/programming/2048.png",
  ],
  minecraft: [
    "/2048/skins/minecraft/2.png",
    "/2048/skins/minecraft/4.png",
    "/2048/skins/minecraft/8.png",
    "/2048/skins/minecraft/16.png",
    "/2048/skins/minecraft/32.png",
    "/2048/skins/minecraft/64.png",
    "/2048/skins/minecraft/128.png",
    "/2048/skins/minecraft/256.png",
    "/2048/skins/minecraft/512.png",
    "/2048/skins/minecraft/1024.png",
    "/2048/skins/minecraft/2048.png",
  ],
  "video-games": [
    "/2048/skins/video-games/2.png",
    "/2048/skins/video-games/4.png",
    "/2048/skins/video-games/8.png",
    "/2048/skins/video-games/16.png",
    "/2048/skins/video-games/32.png",
    "/2048/skins/video-games/64.png",
    "/2048/skins/video-games/128.png",
    "/2048/skins/video-games/256.png",
    "/2048/skins/video-games/512.png",
    "/2048/skins/video-games/1024.png",
    "/2048/skins/video-games/2048.png",
  ],
  "board-games": [
    "/2048/skins/board-games/2.png",
    "/2048/skins/board-games/4.png",
    "/2048/skins/board-games/8.png",
    "/2048/skins/board-games/16.png",
    "/2048/skins/board-games/32.png",
    "/2048/skins/board-games/64.png",
    "/2048/skins/board-games/128.png",
    "/2048/skins/board-games/256.png",
    "/2048/skins/board-games/512.png",
    "/2048/skins/board-games/1024.png",
    "/2048/skins/board-games/2048.png",
  ],
  pokemon: [
    "/2048/skins/pokemon/2.png",
    "/2048/skins/pokemon/4.png",
    "/2048/skins/pokemon/8.png",
    "/2048/skins/pokemon/16.png",
    "/2048/skins/pokemon/32.png",
    "/2048/skins/pokemon/64.png",
    "/2048/skins/pokemon/128.png",
    "/2048/skins/pokemon/256.png",
    "/2048/skins/pokemon/512.png",
    "/2048/skins/pokemon/1024.png",
    "/2048/skins/pokemon/2048.png",
  ],
};

const difficulties = ["easy", "medium", "hard", "normal"];
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