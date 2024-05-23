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

export const getDate = (value) => {
  let format = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (value) {
    return new Date(value).toLocaleDateString("en-IN", format);
  } else {
    return new Date().toLocaleDateString("en-IN", format);
  }
};

export const getReadTime = (content) => {
  let avgReadSec = typeof content === "string" ? 200 : 4;
  const words =
    typeof content === "string"
      ? content.trim().split(/\s+/).length
      : content?.length;
  if (typeof content === "string") {
    return Math.ceil(words / avgReadMin) || 1;
  } else {
    return Math.ceil((words * avgReadSec) / 60) || 1;
  }
};

export const getRandomPosts = (array, total, limit) => {
  let result = [];
  let addIndex = new Set();

  while (result.length < limit) {
    let num = Math.floor(Math.random() * total);
    if (!addIndex.has(num)) {
      result.push(array[num]);
      addIndex.add(num);
    }
  }

  return result;
};
