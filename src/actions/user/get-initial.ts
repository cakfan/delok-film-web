export function getInitialName(str: string) {
  // Split the string into an array of words
  const words = str.trim().split(/\s+/);

  if (words.length === 0) {
    return ""; // Return an empty string if the input string is empty
  }

  // Take the first word and extract the first letter
  const firstWord = words[0];
  const initial = firstWord.charAt(0).toUpperCase();

  return initial;
}
