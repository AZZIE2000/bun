"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(false);
  const [grid, setGrid] = useState<number[][]>([]);
  const [gridSize, setGridSize] = useState({ h: 0, w: 0 });
  const [animationStep, setAnimationStep] = useState(0);
  const [colorCounter, setColorCounter] = useState(1);
  useEffect(() => {
    setInterval(() => {
      setTime(!time);
    }, 100);
  }, [start]);

  useEffect(() => {
    runGame();
  }, [time]);

  useEffect(() => {
    const screenH = window.screen.height;
    const screenW = window.screen.width;
    const cellSize = 10;
    const cols = Math.floor(screenW / cellSize);
    const rows = Math.floor(screenH / cellSize);
    const grid: number[][] = [];
    for (let i = 0; i < rows; i++) {
      grid.push(Array(cols).fill(0));
    }
    setGrid(grid);
    setGridSize({ h: cellSize, w: cellSize });
  }, []);

  const runGame = async () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    let TempGrid;

    TempGrid = JSON.parse(JSON.stringify(grid));
    for (let i = TempGrid.length - 1; i >= 0; i--) {
      for (let j = 0; j < TempGrid[i].length; j++) {
        const cellState = TempGrid[i][j];
        if (cellState) {
          if (
            i + 1 < TempGrid.length &&
            (TempGrid[i + 1][j] === 0 || TempGrid[i + 1][j] > 0)
          ) {
            if (TempGrid[i + 1][j] === 0) {
              TempGrid[i + 1][j] = TempGrid[i][j];
              TempGrid[i][j] = 0;
            } else if (TempGrid[i + 1][j] > 0) {
              const dir = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
              if (
                TempGrid[i + 1][j + dir] === 0 &&
                TempGrid[i + 1][j - dir] === 0
              ) {
                TempGrid[i + 1][j + dir] = TempGrid[i][j];
                TempGrid[i][j] = 0;
              } else if (TempGrid[i + 1][j + dir] === 0) {
                TempGrid[i + 1][j + dir] = TempGrid[i][j];
                TempGrid[i][j] = 0;
              } else if (TempGrid[i + 1][j - dir] === 0) {
                TempGrid[i + 1][j - dir] = TempGrid[i][j];
                TempGrid[i][j] = 0;
              }
            }
          }
        }
      }
    }
    setGrid(TempGrid);
    setAnimationStep(animationStep + 1);
    if (animationStep === grid.length - 1) {
      setStart(false);
      setAnimationStep(0);
    }
    // }
  };
  useEffect(() => {
    console.log(colorCounter);
  }, [colorCounter]);
  return (
    <main
      draggable={false}
      onMouseDown={() => {
        setStart(true);
      }}
      onMouseUp={() => {
        setStart(false);
      }}
      className="h-full w-screen bg-white"
    >
      {grid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((col, j) => (
            <div
              onTouchMove={() => {
                if (!grid[i][j]) {
                  const newGrid = [...grid];
                  newGrid[i][j] = colorCounter == 360 ? 1 : colorCounter;

                  setColorCounter(colorCounter == 360 ? 1 : colorCounter + 1);
                  setGrid(newGrid);
                }
              }}
              onMouseMove={() => {
                if (!grid[i][j]) {
                  const newGrid = [...grid];
                  newGrid[i][j] = colorCounter == 360 ? 1 : colorCounter;

                  setColorCounter(colorCounter == 360 ? 1 : colorCounter + 1);
                  setGrid(newGrid);
                }
              }}
              key={j}
              style={{
                height: `${gridSize.h}px`,
                width: `${gridSize.w}px`,
                backgroundColor:
                  grid[i][j] === 0 ? `white` : `hsl(${grid[i][j]}, 100%, 50%)`,
              }}
              className={`  rounded-full hue-rotate-60  `}
            ></div>
          ))}
        </div>
      ))}
    </main>
  );
}
