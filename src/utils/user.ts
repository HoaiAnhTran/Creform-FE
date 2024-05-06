export const getAcronymUsername = (username: string): string => {
  const wordsArray = username.trim().split(' ');
  if (wordsArray.length === 1) {
    return username.charAt(0).toUpperCase();
  }
  return `${wordsArray[0].charAt(0).toUpperCase()}${wordsArray[wordsArray.length - 1].charAt(0).toUpperCase()}`;
};
