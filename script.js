// Constants and variables
const wizardImage = document.getElementById('wizard-image');
const characterNameElement = document.getElementById('character-name');
const levelCircle = document.getElementById('level-circle');
const xpBar = document.getElementById('xp-bar');
const tutorialBox = document.getElementById('tutorial-box');
const deathMessage = document.getElementById('death-message');
const switchGenderButton = document.getElementById('switch-gender-button');

let xp = 0;
let level = 1;
let isIll = false;
let tutorialStep = 0;
let illnessTimer;
let characterType = "Wizard";

// Predefined stages and assets
const stages = ["basic", "skilled", "master"];
const pastelRainbowColors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"];

// Get the correct asset path for the current character
function assetsPath(type) {
    return `assets/${type.toLowerCase()}/`;
}

// Random background color on page load
function setRandomBackgroundColor() {
    const randomColor = pastelRainbowColors[Math.floor(Math.random() * pastelRainbowColors.length)];
    document.body.style.backgroundColor = randomColor;
}

// Update character display
function updateCharacter() {
    levelCircle.textContent = level;
    characterNameElement.textContent = `${stages[Math.min(level - 1, 2)]} ${characterType}`;
    wizardImage.src = `${assetsPath(characterType)}${stages[Math.min(level - 1, 2)]}.png`;
}

// Update XP bar
function updateXPBar() {
    const percentage = (xp / 100) * 100;
    xpBar.style.width = `${percentage}%`;
}

// Handle tutorial
function showTutorialBox(message, targetElement) {
    tutorialBox.textContent = message;
    const rect = targetElement.getBoundingClientRect();
    tutorialBox.style.left = `${rect.left}px`;
    tutorialBox.style.top = `${rect.top - 50}px`;
    tutorialBox.style.display = 'block';
}

// Handle death
function handleDeath() {
    deathMessage.textContent = `YOUR ${characterType.toUpperCase()} DIED`;
    deathMessage.style.display = 'block';
    clearInterval(illnessTimer);
    setTimeout(() => {
        deathMessage.style.display = 'none';
        startGame();
    }, 3000);
}

// Illness timer
function startIllnessTimer() {
    illnessTimer = setInterval(() => {
        if (Math.random() < 0.1) {
            isIll = true;
            wizardImage.src = `${assetsPath(characterType)}ill.png`;
            setTimeout(() => {
                isIll = false;
                updateCharacter();
            }, 5000);
        }
    }, 3000);
}

// Handle clicks
wizardImage.addEventListener('click', () => {
    if (isIll) {
        wizardImage.src = `${assetsPath(characterType)}dead.png`;
        handleDeath();
        return;
    }

    xp += 10;
    updateXPBar();
    if (xp >= 100) {
        xp = 0;  // Reset XP after leveling up
        level++;
        updateCharacter();
    }
});

// Switch gender button
switchGenderButton.addEventListener('click', () => {
    characterType = characterType === "Wizard" ? "Witch" : "Wizard";
    switchGenderButton.textContent = `Switch to ${characterType === "Wizard" ? "Witch" : "Wizard"}`;
    switchGenderButton.style.backgroundColor = characterType === "Wizard" ? "#d1c4e9" : "#a5d8ff"; // Change color based on gender
    updateCharacter();
});

// Start game
function startGame() {
    xp = 0;
    level = 1;
    isIll = false;
    updateCharacter();
    updateXPBar();
    setRandomBackgroundColor();
    startIllnessTimer();
}

startGame();
