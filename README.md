# My2048

My2048 is a full-stack, AI-enhanced version of the classic 2048 game. Built with React and FastAPI, this reimagined version includes intelligent hinting and auto-play, difficulty modes, custom tile skins, and mod-ready architecture. It's more than a puzzle game—it's a platform for experimenting with strategy, design, and smart automation. It is a personal project created to deepen my understanding of AI techniques, including search-based algorithms and deep learning training.

---

## Features

- Clean React UI with smooth animations  
- Difficulty modes: Easy (5×5), Medium (4×4), Hard (3×3)  
- AI-powered **hints** and **auto-play** using Expectimax  
- Custom skins (Anime, Minecraft, Programming, Pokémon, and more)  
- Win & Game Over modals  
- Undo support (up to 10 moves)

---

## Tech Stack

- **Frontend**: React + TypeScript + CSS Modules  
- **Backend**: Python + FastAPI + NumPy  
- **AI**: Expectimax tree search with heuristics  
- **Storage**: LocalStorage (score, settings, skins)  
- **API**: REST (AI hinting endpoint)

---

## Run Locally (Recommended for Best Performance)

```bash
# Clone the repository
git clone https://github.com/rhuynh06/My2048.git
cd 2048

# --- Backend Setup ---
cd backend
pip install fastapi uvicorn numpy
uvicorn main:app --reload --port 5050 # Runs at http://localhost:5050

# --- Frontend Setup (open a new terminal window/tab) ---
cd ../frontend
npm install
npm run dev  # Runs at http://localhost:5173

# --- Python Versions ---

# Search-Based AI (Expectimax)
cd ../python_version/search-based
python logic.py   # Play 2048 yourself in the terminal
python ai.py      # Watch the AI play in the terminal
python ui.py      # Play with Tkinter GUI + some AI assistance

# Deep Learning AI
cd ../deep_learning
python train.py   # Train the neural network model
python play.py    # Watch the trained model play
python ui.py      # Play with Tkinter GUI + AI assistance
```

Inspired by [Gabriele Cirulli's original 2048](https://play2048.co/)
