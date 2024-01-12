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
let introDialog = document.querySelector(".dialog")

class Game {
  constructor(container) {
    this.container = container;
    this.userInputContainer = document.createElement("div");
    this.scoreContainer = document.createElement("div");
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
      console.log(this.generatedNumbers);
    }
  }

  displayNumbersForLevel(index = 0) {
    if (index < this.level) {
      this.container.innerHTML = `
        <h1>Welcome ${this.name}</h1>
        <div id="numbers-container">
          <div class="number">${this.generatedNumbers[index]}</div>
        </div>`;

      setTimeout(() => {
        this.container.innerHTML = ""; // Clear the container
        this.displayNumbersForLevel(index + 1); // Display the next number
      }, 2000);
    } else {
      this.getNumbersFromUser();
  }
}

getNumbersFromUser() {
  this.userInputContainer.innerHTML = ''; // Clear the container
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter the complete number';
    this.userInputContainer.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
      this.enteredNumbers = input.value;
      console.log(`Entered numbers: ${this.enteredNumbers}`);

           // Check if entered number is correct and display the score
           if (this.verifyLevel()) {
            this.updateLevel(this.level + 1);
            this.gameLoop();
          } else {
            this.displayScore();
          }
        });
    
        this.userInputContainer.appendChild(submitButton);
        this.container.appendChild(this.userInputContainer);
      }

      displayScore() {
        const gameOverContainer = document.createElement('div');
        gameOverContainer.innerHTML = `
          <div id="game-over">Game Over! Your final score is: ${this.level}</div>
          <div id="countdown">Exiting in <span id="countdown-value">3</span> seconds</div>
        `;
        this.container.appendChild(gameOverContainer);
      
        let countdownValue = 3;
        const countdownElement = document.getElementById('countdown-value');
      
       
        const countdownInterval = setInterval(() => {
          countdownValue--;
          countdownElement.textContent = countdownValue;
      
         
          if (countdownValue === 0) {
            clearInterval(countdownInterval);
            this.container.removeChild(gameOverContainer);
            this.displayMenu();
          }
        }, 1000);
      }

  verifyLevel() {
    const enteredDigits = this.enteredNumbers.split('').map(Number);
    for (let i = 0; i < this.level; i++) {
      console.log(`Comparing entered: ${enteredDigits[i]} with generated: ${this.generatedNumbers[i]}`);
      if (enteredDigits[i] !== this.generatedNumbers[i]) {
        return false;
      }
    }
    return true;
  }

  gameLoop() {
    this.generateNumbersForLevel();
    this.displayNumbersForLevel();
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
