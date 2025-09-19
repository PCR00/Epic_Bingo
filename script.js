const IMAGE_COUNT = 30;  // Total number of images you have
const BOARD_SIZE = 4;    // 4x4 grid = 16 total
const IMAGE_FOLDER = "Images/";

function getRandomImages(count) {
  const indices = Array.from({ length: IMAGE_COUNT }, (_, i) => i + 1);
  const selected = [];

  while (selected.length < count) {
    const idx = Math.floor(Math.random() * indices.length);
    selected.push(indices.splice(idx, 1)[0]);
  }

  return selected.map(num => `${IMAGE_FOLDER}login${num}.png`);
}

function cropStyle(column) {
  return column < 2
    ? "clip-path: inset(0 50% 0 0);"
    : "clip-path: inset(0 0 0 50%);";
}

function buildBoard() {
  const board = document.getElementById("bingo-board");
  board.innerHTML = ""; // Clear previous board
  const images = getRandomImages(16);

  images.forEach((imgSrc, idx) => {
    const square = document.createElement("div");
    square.classList.add("bingo-square");
    const column = idx % BOARD_SIZE;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.style = cropStyle(column);

    square.appendChild(img);
    square.addEventListener("click", () => {
      square.classList.toggle("marked");
    });

    board.appendChild(square);
  });
}

document.getElementById("reset-button").addEventListener("click", buildBoard);
window.onload = buildBoard;
