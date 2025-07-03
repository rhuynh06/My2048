// Featuring future updates and serve as place for idea dumps
import styles from "../styles/UpdateList.module.css";

const updates = [
  "toggle numbers (default)",
  "toggle solo leveling",
  "toggle reincarnated as a slime",
  "toggle soccer players",
  "toggle programming tools & languages",
  "more skins...",
  "difficulties (easy, med, hard, normal)",
  "restart option",
  "keep highest score via local db",
  {
    title: "Mods",
    items: [
      "Bomb (3x3 range)",
      "Combo Mult",
      "Chain Mult",
      "Undo",
      "Delete",
      "Frozen Tile",
      "Tile w/ multiple values",
      "Swap 2 Tiles?",
    ],
  },
];

const UpdateList: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2>Coming Updates</h2>
      <ul>
        {updates.map((item, idx) =>
          typeof item === "string" ? (
            <li key={idx}>{item}</li>
          ) : (
            <li key={idx}>
              <strong>{item.title}</strong>
              <ul>
                {item.items.map((subItem, subIdx) => (
                  <li key={subIdx}>{subItem}</li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default UpdateList;
