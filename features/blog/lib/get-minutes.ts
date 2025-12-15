export function getMinutes(minutes: number) {
  const roundedMinutes = Math.round(minutes);
  return `${roundedMinutes} min`;
}
