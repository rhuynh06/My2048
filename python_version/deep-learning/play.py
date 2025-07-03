from env_2048 import Game2048
from dqn_agent import DQNAgent
import torch
import time
import os

agent = DQNAgent()
agent.model.load_state_dict(torch.load('model.pth'))
agent.model.eval()

env = Game2048()
state = env.reset()
done = False

def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

def display(board, score):
    clear_console()
    print(f"Score: {score}")
    print("-" * 25)
    for row in board:
        print("|", end="")
        for val in row:
            if val == 0:
                print("    .", end=" |")
            else:
                print(f"{val:5}", end="|")
        print("\n" + "-" * 25)

while not done:
    display(env.board, env.score)
    action = agent.act(state)
    state, reward, done = env.move(action)
    time.sleep(0.1)

display(env.board, env.score)
print("Game Over! Final Score:", env.score)