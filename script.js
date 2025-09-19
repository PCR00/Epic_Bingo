const bingoBoard = document.getElementById('bingo-board');
const loginImageSrc = 'login_panel/panel.png';

function getImageList() {
  const images = [];
  for (let i = 1; i <= 24; i++) {
    images.push(`Images/login${i}.png`);
  }
  return images;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  bingoBoard.innerHTML = '';

  const imageList = getImageList();
  shuffle(imageList);
  const selectedImages = imageList.slice(0, 16);

  let imgIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      // Column 2.5 — place login panel
      if (col === 2) {
        if (row === 0) {
          const loginPanel = document.createElement('div');
          loginPanel.id = 'login-panel';
          const img = document.createElement('img');
          img.src = loginImageSrc;
          loginPanel.appendChild(img);
          bingoBoard.appendChild(loginPanel);
        }
        // Skip rows 1–3 for login slot (row-spanning behavior)
        continue;
      }

      const tile = document.createElement('div');
      tile.className = 'bingo-tile';

      const img = document.createElement('img');
      img.src = selectedImages[imgIndex];
      img.alt = `Login background ${imgIndex + 1}`;

      tile.appendChild(img);
      tile.addEventListener('click', () => tile.classList.toggle('marked'));

      bingoBoard.appendChild(tile);
      imgIndex++;
    }
  }
}

document.getElementById('reset-button').addEventListener('click', createBoard);
createBoard();
