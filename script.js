const IMAGE_COUNT = 30;
const IMAGE_FOLDER = "Images/";
const PANEL_IMAGE = "login_panel/panel.png";
const GRID_ROWS = 4;
const GRID_COLUMNS = 5; // includes login panel
const TILE_SIZE = 150;

function getRandomImages(count) {
  const indices = Array.from({ length: IMAGE_COUNT }, (_, i) => i + 1);
  const selected = [];

  while (selected.length < count) {
    const idx = Math.floor(Math.random() * indices.length);
    selected.push(indices.splice(idx, 1)[0]);
  }

  return selected.map(num => `${IMAGE_FOLDER}login${num}.png`);
}

function cropStyle(row, column) {
  let xShift = column < 2 ? 0 : 66.66; // left or right third
  let yShift = row < 2 ? 0 : 50;       // top or bottom half

  return `
    object-fit: cover;
    width: 300%;
    height: 200%;
    transform: translateX(-${xShift}%) translateY(-${yShift}%);
  `;
}

function buildBoard() {
  const container = document.getElementById("bingo-container");
  container.innerHTML = "";

  const images = getRandomImages(16);
  let imageIndex = 0;

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLUMNS; col++) {
      if (col === 2) {
        if (row === 0) {
          // Insert login panel
          const panel = document.createElement("div");
          panel.id = "login-panel";
          const img = document.createElement("img");
          img.src = PANEL_IMAGE;
          panel.appendChild(img);
          container.appendChild(panel);
        }
        continue; // skip this cell on other rows (login panel spans vertically)
      }

      const tile = document.createElement("div");
      tile.classList.add("bingo-tile");

      const img = document.createElement("img");
      img.src = images[imageIndex++];
      img.style = cropStyle(row, col);

      tile.appendChild(img);
      tile.addEventListener("click", () => {
        tile.classList.toggle("marked");
      });

      container.appendChild(tile);
    }
  }
}

document.getElementById("reset-button").addEventListener("click", buildBoard);
window.onload = buildBoard;
