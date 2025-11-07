export const shuffleInnerTextLetter = (world: string): string => {
  const chars = Array.from(world);
  if (chars.length <= 3) return world;

  const first = chars[0];
  const last = chars[chars.length - 1];
  const middle = chars.slice(1, -1);

  const shuffleMiddle = [...middle];

  for (let i = shuffleMiddle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleMiddle[i], shuffleMiddle[j]] = [shuffleMiddle[j], shuffleMiddle[i]];
  }

  const resultMiddle = shuffleMiddle.map((char, index) => {
    const originalChar = middle[index];
    const isUpper = originalChar === originalChar.toUpperCase();
    return isUpper ? char.toUpperCase() : char.toLowerCase();
  });

  return [first, ...resultMiddle, last].join("");
};

export const shuffleTextPreservingPunctuation = (text: string): string => {
  return text.replace(/\p{L}+/gu, (match) => {
    return shuffleInnerTextLetter(match);
  });
};
