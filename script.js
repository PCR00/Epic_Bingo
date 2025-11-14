const IMAGE_COUNT = 30;  // Total number of images you have
const BOARD_SIZE = 4;    // 4x4 grid = 16 total
const IMAGE_FOLDER = "Images/";
// Fun synonyms for "epic" to use in the title
const EPIC_SYNONYMS = [
  "magnificent",
  "glorious",
  "majestic",
  "massive",
  "monumental",
  "grand",
  "imposing",
  "impressive",
  "proud",
  "royal",
  "heroic",
  "colossal",
  "imperial",
  "operatic",
  "regal",
  "wonderful",
  "splendid",
  "grandiose",
  "Homeric",
  "luxurious",
  "tremendous",
  "remarkable",
  "noble",
  "gallant",
  "formidable",
  "lavish",
  "awesome",
  "cosmic",
  "extraordinary",
  "marvelous",
  "sublime",
  "gorgeous",
  "stupendous",
  "august",
  "superb",
  "baronial",
  "stately",
  "extravagant",
  "terrific",
  "monstrous",
  "apocalyptic",
  "wondrous",
  "magnific",
  "prodigious",
  "awful",
  "striking",
  "divine",
  "heavenly",
  "sumptuous",
  "inflated",
  "celestial",
  "kingly",
  "sensational",
  "princely",
  "opulent",
  "overblown",
  "pompous",
  "palatial",
  "redoubtable",
  "killer",
  "splendiferous",
  "lordly",
  "queenly",
  "resplendent",
  "prepossessing",
  "palatine"
];


function setRandomTitle() {
  const titleElement = document.getElementById("title");
  if (!titleElement) return;

  const word =
    EPIC_SYNONYMS[Math.floor(Math.random() * EPIC_SYNONYMS.length)];

  titleElement.textContent = `${word} Bingo`;
}


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
if (column < 2) {
    // Columns 1 and 2: show the left third
    return `
      object-fit: cover;
      width: 300%;
      height: 100%;
      transform: translateX(0%);
    `;
  } else {
    // Columns 3 and 4: show the right third
    return `
      object-fit: cover;
      width: 300%;
      height: 100%;
      transform: translateX(-66.66%);
    `;
  }
}

function buildBoard() {
  setRandomTitle();  // update the heading each time the board is built
  const board = document.getElementById("bingo-board");
  board.innerHTML = "";

  // 1) Add the login panel once, in the middle column
  const panel = document.createElement("div");
  panel.className = "panel-tile";

  const panelImg = document.createElement("img");
  panelImg.src = "login_panel/panel.png"; // make sure this path exists

  panel.appendChild(panelImg);
  board.appendChild(panel);

  // 2) Add the 16 bingo tiles
  const images = getRandomImages(16);

  images.forEach((imgSrc, idx) => {
    const square = document.createElement("div");
    square.className = "bingo-square";

    const img = document.createElement("img");
    img.src = imgSrc;

    // Logical column: 0,1 (left side) or 2,3 (right side)
    const logicalColumn = idx % BOARD_SIZE; // BOARD_SIZE = 4
    img.style = cropStyle(logicalColumn);

    square.appendChild(img);

    square.addEventListener("click", () => {
      square.classList.toggle("marked");
    });

    board.appendChild(square);
  });
}





document.getElementById("reset-button").addEventListener("click", buildBoard);
window.onload = buildBoard;
