from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from ai import get_best_move

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HintRequest(BaseModel):
    grid: list[list[int]]

@app.post("/hint")
def get_hint(data: HintRequest):
    np_grid = np.array(data.grid)
    best_move = get_best_move(np_grid)
    return {"move": best_move}
