// Initialize variables
let randomNumber = Math.floor(Math.random() * 1000) + 1;
let attempts = 0;
const maxAttempts = 10;
let isFirstTurn = true;

// Function to check the user's guess
function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        document.getElementById("feedback").innerText = "Please enter a valid number.";
        return;
    }

    attempts++;
    document.getElementById("attempts").innerText = `${attempts}/${maxAttempts}`;

    if (guess === randomNumber) {
        document.getElementById("feedback").innerText = "Congratulations! You've guessed the right number!";
        playWinSound();
        showFlyingPuppets();
        endGame();
    } else if (guess < randomNumber) {
        document.getElementById("feedback").innerText = "Too low! Try again.";
    } else {
        document.getElementById("feedback").innerText = "Too high! Try again.";
    }

    guessInput.value = "";

    if (attempts >= maxAttempts) {
        document.getElementById("feedback").innerText = `Game Over! The correct number was ${randomNumber}.`;
        playLoseSound();
        endGame();
    }
}

// Function to play the winning sound
function playWinSound() {
    const winSound = document.getElementById("winSound");
    winSound.play().catch(error => console.error("Error playing win sound:", error));
}

// Function to play the losing sound
function playLoseSound() {
    const loseSound = document.getElementById("loseSound");
    loseSound.play().catch(error => console.error("Error playing lose sound:", error));
}

// Function to show flying puppets within the game container
function showFlyingPuppets() {
    const gameContainer = document.querySelector('.game-container');
    const containerBounds = gameContainer.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
        const puppet = document.createElement("div");
        puppet.classList.add("puppet");

        // Random initial position within the game container
        const randomX = Math.random() * (containerBounds.width - 50);
        const randomY = Math.random() * (containerBounds.height - 50);

        puppet.style.left = `${randomX}px`;
        puppet.style.top = `${randomY}px`;

        gameContainer.appendChild(puppet);

        // Remove the puppet after animation
        setTimeout(() => {
            puppet.remove();
        }, 4000);
    }
}

// Function to end the game
function endGame() {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").disabled = true;
}

// Function to restart the game
function restartGame() {
    randomNumber = Math.floor(Math.random() * 1000) + 1;
    attempts = 0;
    isFirstTurn = true;

    document.getElementById("feedback").innerText = "";
    document.getElementById("attempts").innerText = `${attempts}/${maxAttempts}`;
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessButton").disabled = false;
}

// Play the first turn sound
document.getElementById("guessInput").addEventListener("focus", () => {
    if (isFirstTurn) {
        const firstTurnSound = document.getElementById("firstTurnSound");
        firstTurnSound.play().catch(error => console.error("Error playing first turn sound:", error));
        isFirstTurn = false;
    }
});
