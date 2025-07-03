import torch
import torch.nn as nn
import torch.optim as optim
import random
import numpy as np
from collections import deque

class DQN(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(16, 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, 4)  # 4 moves
        )

    def forward(self, x):
        return self.net(x)

class DQNAgent:
    def __init__(self):
        self.model = DQN()
        self.target = DQN()
        self.target.load_state_dict(self.model.state_dict())
        self.memory = deque(maxlen=20000)
        self.optimizer = optim.Adam(self.model.parameters(), lr=0.001)
        self.criterion = nn.MSELoss()
        self.epsilon = 1.0
        self.gamma = 0.99

    def act(self, state):
        if random.random() < self.epsilon:
            return random.randint(0, 3)
        state = torch.tensor(state, dtype=torch.float32).flatten().unsqueeze(0)
        with torch.no_grad():
            q_values = self.model(state)
        return torch.argmax(q_values).item()

    def store(self, s, a, r, s_next, done):
        self.memory.append((s, a, r, s_next, done))

    def train_step(self, batch_size=64):
        if len(self.memory) < batch_size:
            return
        batch = random.sample(self.memory, batch_size)
        s_batch, a_batch, r_batch, s_next_batch, done_batch = zip(*batch)

        import numpy as np

        # Convert lists of numpy arrays to a single numpy ndarray first
        s_batch = torch.tensor(np.array(s_batch), dtype=torch.float32).reshape(batch_size, -1)
        s_next_batch = torch.tensor(np.array(s_next_batch), dtype=torch.float32).reshape(batch_size, -1)

        a_batch = torch.tensor(a_batch, dtype=torch.int64).unsqueeze(1)
        r_batch = torch.tensor(r_batch, dtype=torch.float32).unsqueeze(1)
        done_batch = torch.tensor(done_batch, dtype=torch.float32).unsqueeze(1)

        q_vals = self.model(s_batch).gather(1, a_batch)
        with torch.no_grad():
            q_next = self.target(s_next_batch).max(1)[0].unsqueeze(1)
            q_target = r_batch + self.gamma * q_next * (1 - done_batch)

        loss = self.criterion(q_vals, q_target)
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()


    def update_target(self):
        self.target.load_state_dict(self.model.state_dict())
