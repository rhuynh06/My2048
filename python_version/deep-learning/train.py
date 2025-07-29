import numpy as np
from env_2048 import Game2048
from dqn_agent import DQNAgent
from pathlib import Path
import matplotlib.pyplot as plt
import torch
import os
import csv

agent = DQNAgent()

if os.path.exists("./model.pth"):
    print("Loading existing model...")
    agent.model.load_state_dict(torch.load("model.pth"))
    agent.target.load_state_dict(agent.model.state_dict())
else:
    print("No saved model found, training from scratch.")

results_file = Path("./training_results.csv")
with open(results_file, "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Episode", "Score", "Epsilon", "MaxTile"])

episodes = 3000  # increase for better results
scores = []

for ep in range(episodes):
    env = Game2048()
    state = env.reset()
    total_reward = 0
    done = False

    while not done:
        action = agent.act(state)
        next_state, reward, done = env.move(action)

        # Normalize the reward (log-scale to stabilize large spikes)
        if reward > 0:
            reward = np.log2(reward + 1)
        else:
            reward = reward  # Keep 0 or negative penalties as-is

        agent.store(state, action, reward, next_state, done)
        agent.train_step()
        state = next_state
        total_reward += reward

    # Decay epsilon
    agent.epsilon = max(agent.epsilon * 0.995, 0.05)

    # Update target network periodically
    if ep % 20 == 0:
        agent.update_target()

    # Log training info
    scores.append(total_reward)
    max_tile = env.get_max_tile()

    with open(results_file, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([ep, round(total_reward, 2), round(agent.epsilon, 4), max_tile])

    if ep % 100 == 0:
        print(f"Episode {ep}, Score: {int(total_reward)}, Epsilon: {agent.epsilon:.2f}, MaxTile: {max_tile}")

# Save model
torch.save(agent.model.state_dict(), Path("./model.pth"))

# Plot results
max_tiles = np.genfromtxt("training_results.csv", delimiter=",", skip_header=1, usecols=[3])

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(scores)
plt.title("Training Score Progress")
plt.xlabel("Episode")
plt.ylabel("Score")
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(max_tiles)
plt.title("Max Tile Over Time")
plt.xlabel("Episode")
plt.ylabel("Max Tile")
plt.grid(True)

plt.tight_layout()
plt.show()