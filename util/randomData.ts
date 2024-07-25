// src/utils/randomData.ts

export const getRandomData = <T>(data: T[], limit: number): T[] => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
};
