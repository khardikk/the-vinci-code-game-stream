import "./styles.css";
/*
1. Get the user's name
2. Show a menu
3. Menu items:
  a. Start New Game
  b. See Leaderboard
  c. Update Name
*/
const myGameContainer = document.getElementById("game");

class Game {
  constructor(container) {
    this.container = container;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  start() {
    this.name = prompt("Enter your name:") || "Guest";
    this.displayMenu();
  }

  handleMenuClick = function (event) {
    switch (event.target.id) {
      case "start-game":
        this.updateLevel(1);
        this.gameLoop();
        break;
      case "show-leaderboard":
        console.log("Will Show Leaderboard Now...");
        break;
      case "update-name":
        this.name = prompt("Enter name to be updated:") || "Guest";
        this.displayMenu();
    }
  }.bind(this);
  
  displayMenu() {
    this.container.innerHTML = `
    <h1>Welcome ${this.name}</h1>
      <div id = "button container">
      <button id="start-game" class="game-button">Start New Game </button>
      <button id="show-leaderboard" class="game-button">See Leaderboard </button>
      <button id="update-name" class="game-button">Update Name </button>
      </div>`;
    this.container.removeEventListener("click", this.handleMenuClick);
    this.container.addEventListener("click", this.handleMenuClick);
  }
  updateLevel(level = 1) {
    this.generatedNumbers = [];
    this.enteredNumbers = [];
    this.level = level;
  }

  generateNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      this.generatedNumbers.push(this.randomNumber());
    }
  }

  displayNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      alert(this.generatedNumbers[i]);
    }
  }

  getNumbersFromUser() {
    for (let i = 0; i < this.level; i++) {
      let enteredValue = prompt(
        "Enter values in order one at a time: (press enter after every value)",
      );
      if (enteredValue === "" || enteredValue === null) {
        enteredValue = NaN;
      }
      this.enteredNumbers.push(Number(enteredValue));
    }
  }

  verifyLevel() {
    for (let i = 0; i < this.level; i++) {
      if (this.enteredNumbers[i] !== this.generatedNumbers[i]) return false;
    }
    return true;
  }

  gameLoop() {
    this.generateNumbersForLevel();
    this.displayNumbersForLevel();
    this.getNumbersFromUser();
    if (this.verifyLevel()) {
      this.updateLevel(this.level + 1);
      this.gameLoop();
    } else {
      alert(`Your score is: ${this.level}`);
    }
  }
}

let myGameInstance;

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play-button');
  playButton.addEventListener('click', () => {
    if (!myGameInstance) {
      myGameInstance = new Game(myGameContainer);
    }
    myGameInstance.start();
  });
});
