const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(currentValues, player) {
  for (const item of lines) {
    const win = [];
    for (const index of item) {
      const value = currentValues[index];
      if (value === player) win.push("val");
      if (win.length === 3) return true;
    }
  }
}
