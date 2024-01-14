function addText() {
  let text = document.getElementById("inputText").value;
  let readingLevel = analyzeText(text);
  displayResult(readingLevel);
  inputText.value = "";
}

function analyzeText(text) {
  const words = text.match(/\w+/g);
  const sentences = text.match(/[\w|\)][.?!](\s|$)/g);
  const syllables = text
    .toLowerCase()
    .split(" ")
    .reduce((count, word) => {
      return count + countSyllables(word);
    }, 0);

  const wordsLength = words ? words.length : 0;
  const sentencesLength = sentences ? sentences.length : 0;
  const syllablesCount = syllables;

  if (wordsLength === 0 || sentencesLength === 0) {
    return "Insufficient text for analysis.";
  }

  const readingLevel =
    0.39 * (wordsLength / sentencesLength) +
    11.8 * (syllablesCount / wordsLength) -
    15.59;
  return `Reading Level: ${readingLevel.toFixed(2)}`;
}

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  return word.match(/[aeiouy]{1,2}/g).length;
}

function displayResult(result) {
  document.getElementById("result").innerText = result;
}

document.querySelector("button").addEventListener("click", addText);
