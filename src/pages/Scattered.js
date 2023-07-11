import "../App.css";
import React, { useState, useEffect } from "react";

function Scattered() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const initial = [
    //0 array
    [1, 0, 0, 0, 7, 0, 3, 0, 4],
    [0, 5, 0, 0, 6, 0, 0, 9, 0],
    [0, 0, 4, 0, 5, 0, 7, 0, 0],
    [0, 0, 0, 8, 0, 6, 0, 0, 0],
    [6, 1, 8, 0, 0, 0, 4, 2, 9],
    [0, 0, 0, 4, 0, 2, 0, 0, 0],
    [0, 0, 3, 0, 2, 0, 9, 0, 0],
    [0, 4, 0, 0, 8, 0, 0, 7, 0],
    [9, 0, 6, 0, 4, 0, 0, 0, 3],
  ];
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));

  useEffect(() => {
    checkSudokuinitial();
  }, []);

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value);
    var grid = getDeepCopy(sudokuArr);

    if (val >= 0) {
      grid[row][col] = val % 10;
    } else {
      grid[row][col] = 0;
    }

    setSudokuArr(grid);
  }

  function compareSudokus(currentSudoku, solvedSudoku) {
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          if (currentSudoku[i][j] !== 0) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  function checkSudoku() {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudokus(sudokuArr, sudoku);
    if (compare.isComplete) {
      alert("Done!");
    } else if (compare.isSolvable) {
      alert("keep going");
    } else {
      alert("Wrong");
    }
  }

  function checkSudokuinitial() {
    let solutionsFound = helpsolver(getDeepCopy(initial));
    if (solutionsFound === 1) {
      let compare = compareSudokus(sudokuArr, initial);
      if (compare.isComplete) {
        alert("Correct Sudoku Puzzle");
      } else {
        alert("Keep going");
      }
    } else if (solutionsFound > 1) {
      alert("Invalid Sudoku: Multiple Solutions");
    } else {
      alert("Invalid Sudoku: No solution");
    }
  }

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  function checkCol(grid, col, num) {
    return grid.map((row) => row[col]).indexOf(num) === -1;
  }

  function checkBox(grid, row, col, num) {
    let boxArr = [],
      rowStart = row - (row % 3),
      colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1;
  }

  function checkScatter(grid, row, col, num) {
    let rowStart = row % 3;
    let colStart = col % 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[rowStart + i * 3][colStart + j * 3] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function checkValid(grid, row, col, num) {
    if (
      checkRow(grid, row, num) &&
      checkCol(grid, col, num) &&
      checkBox(grid, row, col, num) &&
      checkScatter(grid, row, col, num)
    ) {
      return true;
    }
    return false;
  }

  function solver(grid) {
    const emptyCells = findEmptyCells(grid);

    if (emptyCells.length === 0) {
      // Base case: all cells filled, puzzle solved
      return true;
    }

    const [row, col] = emptyCells[0]; // Select the first empty cell

    for (let num = 1; num <= 9; num++) {
      if (checkValid(grid, row, col, num)) {
        grid[row][col] = num;

        if (solver(grid)) {
          // Recursively solve the puzzle
          return true;
        }

        grid[row][col] = 0; // Undo the current cell assignment
      }
    }

    return false; // No valid number found, backtrack
  }

  function helpsolver(grid) {
    const emptyCells = findEmptyCells(grid);

    if (emptyCells.length === 0) {
      // Base case: all cells filled, puzzle solved
      return 1; // Return 1 to indicate a valid solution
    }

    const [row, col] = emptyCells[0]; // Select the first empty cell

    let solutionCount = 0;

    for (let num = 1; num <= 9; num++) {
      if (checkValid(grid, row, col, num)) {
        grid[row][col] = num;

        const solutionsFound = helpsolver(grid);

        solutionCount += solutionsFound;

        if (solutionCount > 1) {
          // If more than one solution found, stop further exploration
          return solutionCount;
        }

        grid[row][col] = 0; // Undo the current cell assignment
      }
    }

    return solutionCount; // Return the total number of solutions found
  }
  function findEmptyCells(grid) {
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push([row, col]);
        }
      }
    }
    return emptyCells;
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(sudokuArr);
    if (solver(sudoku)) {
      setSudokuArr(sudoku);
    } else {
      alert("The Sudoku puzzle is not solvable.");
    }
  }

  function resetSudoku() {
    let sudoku = getDeepCopy(initial);
    setSudokuArr(sudoku);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>Disjoint Groups Sudoku Puzzle</h3>
        <div className=" flex">
          <table>
            <tbody>
              {arr.map((row, rIndex) => {
                return (
                  <tr
                    key={rIndex}
                    className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                  >
                    {arr.map((col, cIndex) => {
                      return (
                        <td
                          key={rIndex + cIndex}
                          className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                        >
                          <div
                            className={
                              sudokuArr[row][col] === 0 ? "boldfont" : ""
                            }
                          >
                            <input
                              onChange={(e) => onInputChange(e, row, col)}
                              value={
                                sudokuArr[row][col] === 0
                                  ? ""
                                  : sudokuArr[row][col]
                              }
                              className={
                                ((Math.floor(rIndex / 3) +
                                  Math.floor(cIndex / 3)) %
                                  2 ===
                                0
                                  ? "cellInput cellcolor1"
                                  : "cellInput cellcolor2") +
                                (initial[row][col] === 0
                                  ? " font-normal"
                                  : " font-bold")
                              }
                              disabled={initial[row][col] !== 0}
                              // className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="buttonContainer w-1/3 flex-col align-center">
            <button className="checkButton" onClick={checkSudoku}>
              {" "}
              Check{" "}
            </button>
            <button className="solveButton" onClick={solveSudoku}>
              {" "}
              Solve{" "}
            </button>
            <button className="resetButton" onClick={resetSudoku}>
              {" "}
              Reset{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scattered;
