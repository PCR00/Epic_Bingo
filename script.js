document.addEventListener("DOMContentLoaded", () => {
  const IMAGE_FOLDER = "Images/";
  const PANEL_IMAGE = "login_panel/panel.png";
  const TOTAL_IMAGES = 30;
  const NUM_SQUARES = 16;

  function getRandomImages() {
    let selected = [];
    while (selected.length < NUM_SQUARES) {
      let num = Math.floor(Math.random() * TOTAL_IMAGES) + 1;
      if (!selected.includes(num)) {
        selected.push(num);
      }
    }
    return selected.map(num => `${IMAGE_FOLDER}login${num}.png`);
  }

  function createBingoBoard() {
    const board = document.getElementById("bingo-board");
    if (!board) {
      console.error("Element with id 'bingo-board' not found.");
      return;
    }
    board.innerHTML = "";

    const imageSources = getRandomImages();

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const square = document.createElement("div");
        square.classList.add("bingo-square");

        // Insert the login panel in column 2.5 (i.e., col == 2), across rows 0–3
        if (col === 2) {
          const panel = document.createElement("img");
          panel.src = PANEL_IMAGE;
          panel.classList.add("login-panel");
          // Only add once at row 0, and span 4 rows
          if (row === 0) {
            square.style.gridRow = "span 4";
            square.style.gridColumn = "3"; // 1-based index in CSS Grid
            square.appendChild(panel);
            board.appendChild(square);
          }
        } else {
          const imgIndex = row * 4 + col - (col > 2 ? 1 : 0); // Skip panel column
          const img = document.createElement("img");
          img.src = imageSources[imgIndex];
          square.appendChild(img);
          board.appendChild(square);
        }
      }
    }
  }

  document.getElementById("reset-button").addEventListener("click", createBingoBoard);
  createBingoBoard();
});
