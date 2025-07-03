from env_2048 import Game2048
from dqn_agent import DQNAgent
from pathlib import Path
import matplotlib.pyplot as plt
import torch
import os

agent = DQNAgent()

if os.path.exists("model.pth"):
    print("Loading existing model...")
    agent.model.load_state_dict(torch.load("model.pth"))
    agent.target.load_state_dict(agent.model.state_dict())
else:
    print("No saved model found, training from scratch.")

episodes = 1000 # incerase for better results!
scores = []

for ep in range(episodes):
    env = Game2048()
    state = env.reset()
    total_reward = 0
    done = False

    while not done:
        action = agent.act(state)
        next_state, reward, done = env.move(action)
        agent.store(state, action, reward, next_state, done)
        agent.train_step()
        state = next_state
        total_reward += reward

    agent.epsilon = max(agent.epsilon * 0.995, 0.05)
    if ep % 20 == 0:
        agent.update_target()
    scores.append(total_reward)
    if ep % 100 == 0:
        print(f"Episode {ep}, Score: {total_reward}, Epsilon: {agent.epsilon:.2f}")

plt.plot(scores)
plt.title("Training Score Progress")
plt.xlabel("Episode")
plt.ylabel("Score")
plt.show()

torch.save(agent.model.state_dict(), Path("./model.pth"))
