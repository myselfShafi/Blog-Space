export const getTruncatedText = (string, maxLength) => {
  if (string) {
    return string?.length > maxLength
      ? string.substring(0, maxLength).concat(" ...")
      : string;
  } else {
    console.error("Invalid text sentence");
    return "----";
  }
};
