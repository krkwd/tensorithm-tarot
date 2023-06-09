// Function to generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to shuffle an array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to handle the "Draw Cards" button click event
function drawCards() {
  const numCards = parseInt(document.getElementById('num-cards').value);
  const cardContainer = document.getElementById('card-container');

  // Clear the card container
  cardContainer.innerHTML = '';

  // Retrieve the card data from the JSON
  fetch('tensordb.json')
    .then(response => response.json())
    .then(data => {
      // Shuffle the card data array
      shuffleArray(data);

      // Draw the specified number of cards
      for (let i = 0; i < numCards; i++) {
        const card = data[i];
        const cardElement = createCardElement(card);
        cardContainer.appendChild(cardElement);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Function to create a card element
function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  const cardImage = document.createElement('img');
  cardImage.className = 'card-image';
  cardImage.src = card.cardpic;
  cardImage.alt = card.cardname;

  const cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';

  const cardName = document.createElement('h2');
  cardName.textContent = card.cardname;

  const cardDesc = document.createElement('p');
  cardDesc.textContent = card.carddesc;

  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardDesc);

  cardElement.appendChild(cardImage);
  cardElement.appendChild(cardInfo);

  return cardElement;
}

// Event listener for the "Draw Cards" button
const drawCardsButton = document.getElementById('draw-cards-button');
drawCardsButton.addEventListener('click', drawCards);
