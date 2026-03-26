class FlashCardApp {
  constructor() {
    this.deck = null;
    this.cards = [];
    this.currentCardIndex = 0;
    this.originalOrder = [];
    this.hiddenFields = new Set();

    this.initializeEventListeners();
    this.loadDeck();
  }

  async loadDeck() {
    try {
      // For MVP, hardcode loading the us-states deck
      const response = await fetch("decks/us-states/deck.json");

      if (!response.ok) {
        throw new Error(`Failed to load deck: ${response.status}`);
      }

      this.deck = await response.json();
      this.cards = this.deck.cards;
      this.originalOrder = [...this.cards];

      this.renderDeckInfo();
      this.renderCard();
    } catch (error) {
      this.showError(`Error loading deck: ${error.message}`);
    }
  }

  initializeEventListeners() {
    // Button clicks
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.nextCard());
    document
      .getElementById("prev-btn")
      .addEventListener("click", () => this.prevCard());
    document
      .getElementById("shuffle-btn")
      .addEventListener("click", () => this.shuffleDeck());
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetDeck());

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.key) {
        case "n":
        case "ArrowRight":
          this.nextCard();
          break;
        case "p":
        case "ArrowLeft":
          this.prevCard();
          break;
        case "s":
          this.shuffleDeck();
          break;
        case "r":
          this.resetDeck();
          break;
        default:
          // Check if it's a number for toggling field visibility
          if (!isNaN(e.key) && e.key !== " ") {
            this.toggleField(parseInt(e.key));
          }
      }
    });
  }

  renderDeckInfo() {
    document.getElementById("deck-name").textContent = this.deck.name;
    document.getElementById("deck-description").textContent =
      this.deck.description;
  }

  renderCard() {
    if (!this.cards.length) {
      this.showError("No cards in deck");
      return;
    }

    const card = this.cards[this.currentCardIndex];
    const cardContent = document.getElementById("card-content");
    const cardCounter = document.getElementById("card-counter");

    // Update counter
    cardCounter.textContent = `Card ${this.currentCardIndex + 1} of ${this.cards.length}`;

    // Clear previous content
    cardContent.innerHTML = "";

    // Get all key-value pairs from the card
    const entries = Object.entries(card);

    entries.forEach(([key, value], index) => {
      const fieldNumber = index + 1;
      const fieldDiv = document.createElement("div");
      fieldDiv.className = "card-field";

      const fieldKey = document.createElement("span");
      fieldKey.className = "field-key";
      fieldKey.textContent = `${fieldNumber}. ${key}: `;

      const fieldValue = document.createElement("span");
      fieldValue.className = "field-value";
      fieldValue.textContent = value;

      // Apply hidden state if needed
      if (this.hiddenFields.has(fieldNumber)) {
        fieldValue.style.visibility = "hidden";
      }

      // Make the entire field clickable to toggle
      fieldDiv.addEventListener("click", () => this.toggleField(fieldNumber));
      fieldDiv.style.cursor = "pointer";

      fieldDiv.appendChild(fieldKey);
      fieldDiv.appendChild(fieldValue);
      cardContent.appendChild(fieldDiv);
    });
  }

  toggleField(fieldNumber) {
    if (this.hiddenFields.has(fieldNumber)) {
      this.hiddenFields.delete(fieldNumber);
    } else {
      this.hiddenFields.add(fieldNumber);
    }
    this.renderCard();
  }

  nextCard() {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
    this.renderCard();
  }

  prevCard() {
    this.currentCardIndex =
      (this.currentCardIndex - 1 + this.cards.length) % this.cards.length;
    this.renderCard();
  }

  shuffleDeck() {
    // Fisher-Yates shuffle
    const shuffled = [...this.cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.cards = shuffled;
    this.currentCardIndex = 0;
    this.renderCard();
  }

  resetDeck() {
    this.cards = [...this.originalOrder];
    this.currentCardIndex = 0;
    this.hiddenFields.clear();
    this.renderCard();
  }

  showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FlashCardApp();
});
