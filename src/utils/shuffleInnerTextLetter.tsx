export const shuffleInnerTextLetter = (world: string): string => {
  const chars = Array.from(world);
  if (chars.length <= 3) return world;

  const first = chars[0];
  const last = chars[chars.length - 1];
  const middle = chars.slice(1, -1);

  for (let i = middle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = middle[i];
    middle[i] = middle[j];
    middle[j] = tmp;
  }

  const origMiddle = Array.from(world).slice(1, -1);
  const resultMiddle = middle.map((char, index) => {
    const isUpper = origMiddle[index] === origMiddle[index].toUpperCase();
    return isUpper ? char.toUpperCase() : char.toLowerCase();
  });
  return [first, ...resultMiddle, last].join("");
};

export const shuffleTextPreservingPunctuation = (text: string): string => {
  return text.replace(/\p{L}+/gu, (match) => {
    return shuffleInnerTextLetter(match);
  });
};
