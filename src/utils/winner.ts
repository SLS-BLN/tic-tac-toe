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

export function calculateWinner(
  currentValues: (number | string)[],
  playerSymbol: string
): boolean {
  for (const line of lines) {
    const win = [];
    for (const index of line) {
      const value = currentValues[index];
      if (value === playerSymbol) win.push(playerSymbol);
      if (win.length === 3) return true;
    }
  }
  return false;
}
