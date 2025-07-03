import tkinter as tk
from tkinter import messagebox
import numpy as np
import threading
import time

from python_version.logic import init_grid, move, add_new, is_game_over
from python_version.ai import get_best_move, max_tile

class Game2048UI:
    COLORS = {
        0: "#cdc1b4", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179",
        16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72",
        256: "#edcc61", 512: "#edc850", 1024: "#edc53f", 2048: "#edc22e"
    }

    def __init__(self, master, rows=4, cols=4):
        self.master = master
        self.rows = rows
        self.cols = cols
        self.grid = init_grid(rows, cols)
        self.score = 0
        self.buttons = []
        self.ai_running = False

        master.title("2048 with AI")
        master.bind("<Key>", self.key_handler)

        self.frame = tk.Frame(master, bg="#bbada0")
        self.frame.pack(padx=10, pady=10)

        # Create grid buttons
        for r in range(rows):
            row_buttons = []
            for c in range(cols):
                btn = tk.Label(self.frame, text="", width=6, height=3, font=("Helvetica", 24, "bold"),
                               bg=self.COLORS[0], fg="#776e65", borderwidth=2, relief="groove")
                btn.grid(row=r, column=c, padx=5, pady=5)
                row_buttons.append(btn)
            self.buttons.append(row_buttons)

        # Score label
        self.score_label = tk.Label(master, text=f"Score: {self.score}", font=("Helvetica", 18, "bold"))
        self.score_label.pack(pady=(5, 0))

        # Control buttons
        self.controls_frame = tk.Frame(master)
        self.controls_frame.pack(pady=10)

        self.hint_button = tk.Button(self.controls_frame, text="Get AI Hint", command=self.show_hint)
        self.hint_button.grid(row=0, column=0, padx=5)

        self.auto_button = tk.Button(self.controls_frame, text="Start Auto Play", command=self.toggle_auto_play)
        self.auto_button.grid(row=0, column=1, padx=5)

        self.status_label = tk.Label(master, text="", font=("Helvetica", 14))
        self.status_label.pack()

        self.update_ui()

    def update_ui(self):
        for r in range(self.rows):
            for c in range(self.cols):
                value = self.grid[r][c]
                self.buttons[r][c].configure(text=str(value) if value != 0 else "",
                                            bg=self.COLORS.get(value, "#3c3a32"),
                                            fg="#f9f6f2" if value > 4 else "#776e65")
        self.score_label.config(text=f"Score: {self.score}")
        self.master.update_idletasks()

    def key_handler(self, event):
        if self.ai_running:
            return

        key = event.keysym.lower()
        keys_map = {
            'w': 'w', 'up': 'w',
            'a': 'a', 'left': 'a',
            's': 's', 'down': 's',
            'd': 'd', 'right': 'd',
        }

        if key in keys_map:
            self.make_move(keys_map[key])

    def make_move(self, direction):
        old_grid = self.grid.copy()
        self.grid, moved, gained_score = move(self.grid, direction)
        if moved:
            self.score += gained_score
            add_new(self.grid)
            self.update_ui()
            if is_game_over(self.grid):
                messagebox.showinfo("Game Over", f"No moves left! Game Over!\nFinal score: {self.score}")
                self.ai_running = False
            elif max_tile(self.grid) >= 2048:
                messagebox.showinfo("Congratulations!", f"You reached 2048!\nFinal score: {self.score}")
                self.ai_running = False
        else:
            self.status_label.config(text="Move didn't change the board. Try a different move.")

    def show_hint(self):
        move = get_best_move(self.grid)
        if move:
            self.status_label.config(text=f"AI Hint: Press '{move.upper()}'")
        else:
            self.status_label.config(text="No valid moves! Game Over.")

    def toggle_auto_play(self):
        if self.ai_running:
            self.ai_running = False
            self.auto_button.config(text="Start Auto Play")
            self.status_label.config(text="Auto play stopped.")
        else:
            self.ai_running = True
            self.auto_button.config(text="Stop Auto Play")
            self.status_label.config(text="Auto play started.")
            threading.Thread(target=self.auto_play_loop, daemon=True).start()

    def auto_play_loop(self):
        while self.ai_running:
            move_dir = get_best_move(self.grid)
            if move_dir is None:
                self.status_label.config(text="No valid moves left! Game over.")
                self.ai_running = False
                break

            self.grid, moved, gained_score = move(self.grid, move_dir)
            if moved:
                self.score += gained_score
                add_new(self.grid)
                self.update_ui()
                self.status_label.config(text=f"Auto move: {move_dir.upper()}")

                if max_tile(self.grid) >= 2048:
                    messagebox.showinfo("Congratulations!", f"AI reached 2048!\nFinal score: {self.score}")
                    self.ai_running = False
                    break

                if is_game_over(self.grid):
                    messagebox.showinfo("Game Over", f"No moves left! Game Over!\nFinal score: {self.score}")
                    self.ai_running = False
                    break

            else:
                self.status_label.config(text="Auto move didn't change board, stopping.")
                self.ai_running = False
                break

            time.sleep(0.3)

if __name__ == "__main__":
    root = tk.Tk()
    game_ui = Game2048UI(root, 4, 4)
    root.mainloop()