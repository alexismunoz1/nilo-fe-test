export const calculateStatPercentage = (statValue: number, maxValue: number = 200): number => {
  return Math.min((statValue / maxValue) * 100, 100);
};

export const formatPokemonNumber = (num: number): string => {
  return `#${num.toString().padStart(3, '0')}`;
};

export const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

