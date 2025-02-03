// src/libs/sliceText.js
const sliceText = (text = '', length, ext) => {
  if (!text) {
    return ''; // Return an empty string or a default value if text is undefined or null
  }
  return text.length > length
    ? `${text.slice(0, length)}${ext ? "..." : ""}`
    : text;
};

export default sliceText; // Default export
