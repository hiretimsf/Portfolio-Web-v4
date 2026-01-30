/**
 * Computes the Levenshtein distance between two strings for fuzzy matching
 */
export const levenshtein = (a: string, b: string): number => {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const matrix: number[][] = Array.from({ length: bLen + 1 }, () =>
    Array(aLen + 1).fill(0),
  );

  for (let i = 0; i <= aLen; i++) matrix[0]![i] = i;
  for (let j = 0; j <= bLen; j++) matrix[j]![0] = j;

  for (let j = 1; j <= bLen; j++) {
    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j]![i] = Math.min(
        matrix[j]![i - 1]! + 1,
        matrix[j - 1]![i]! + 1,
        matrix[j - 1]![i - 1]! + cost,
      );
    }
  }

  return matrix[bLen]![aLen]!;
};
