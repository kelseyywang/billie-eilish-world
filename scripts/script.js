const TOTAL_GAME_SEC = 60;
const NUM_WORDS = 5;
let currSong;
let currWords;
let score = 0;

function startGame() {
  document.getElementById("game-input").style.visibility = "visible";
  document.getElementById("game-input").value = "";
  removeElement("game-start-button");
  score = 0;
  countdown();
  currSong = selectRandomSong();
  currWords = selectRandomLyrics(currSong);
  document.getElementById("game-lyrics-title").innerHTML = "Lyrics:";
  document.getElementById("game-lyrics-title").style.visibility = "visible";
  document.getElementById("game-lyrics").innerHTML = currWords;
}

function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

function addElement(parentId, elementTag, elementId, html) {
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute("id", elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}

function countdown() {
  for (let i = 0; i <= TOTAL_GAME_SEC; i++) {
    setTimeout(displaySecRemaining.bind(null, TOTAL_GAME_SEC - i), 1000 * i);
  }
}

function displaySecRemaining(sec) {
  document.getElementById("game-time").innerHTML =
    "Remaining: " + sec + " seconds";
  if (sec === 0) {
    finishGame();
  }
}

function selectRandomSong() {
  let songTitles = Object.keys(LYRICS_MAP);
  let numSongs = songTitles.length;
  return songTitles[Math.floor(Math.random() * numSongs)];
}

function selectRandomLyrics(title) {
  let full_lyrics = LYRICS_MAP[title];
  let lyrics_words = full_lyrics.split(/ +/);
  let randIndex = Math.floor(Math.random() * (lyrics_words.length - NUM_WORDS));
  let randLyrics = lyrics_words
    .slice(randIndex, randIndex + NUM_WORDS)
    .join(" ");
  return randLyrics;
}

function enterGuess(ele) {
  if (event.key === "Enter") {
    let cleanedGuess = ele.value
      .replace(/\'/g, "")
      .replace(/ +/g, " ")
      .trim()
      .toLowerCase();
    let cleanedAnswer = currSong.toLowerCase();
    if (cleanedGuess === cleanedAnswer) {
      score += 1;
    }
    document.getElementById("game-input").value = "";
    currSong = selectRandomSong();
    currWords = selectRandomLyrics(currSong);
    document.getElementById("game-lyrics").innerHTML = currWords;
  }
}

function finishGame() {
  document.getElementById("game-time").innerHTML =
    "Game over! Score = " + score;
  document.getElementById("game-lyrics").innerHTML = "";
  document.getElementById("game-lyrics-title").style.visibility = "hidden";
  document.getElementById("game-input").style.visibility = "hidden";
  addElement("game-screen-id", "button", "game-start-button", "Play Again!");
  document.getElementById("game-start-button").onclick = startGame;
}
