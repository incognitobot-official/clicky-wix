const wizardImage = document.getElementById('wizard-image');
const wizardType = document.getElementById('wizard-type');
const levelIndicator = document.getElementById('level');
const switchGenderBtn = document.getElementById('switch-gender');
const tutorialBox = document.getElementById('tutorial-box');

let characterType = 'wizard'; // Default type: wizard
let stage = 0; // 0: Basic, 1: Skilled, 2: Master
let xp = 0;
let isIll = false;
let tutorialStep = 0;

const stages = ['basic', 'skilled', 'master'];
const pastelRainbowColors = ['#FFCCE5', '#FFCCF9', '#FFC3C3', '#FFF8C3', '#D4F1CC', '#C5DFFF', '#D5AAFF'];

// Function to get the assets path
const assetsPath = (type) => `assets/${type}/`;

// Function to set a random pastel rainbow background color
function setRandomBackgroundColor() {
    const randomColor = pastelRainbowColors[Math.floor(Math.random() * pastelRainbowColors.length)];
    document.body.style.backgroundColor = randomColor;
}

window.addEventListener('load', setRandomBackgroundColor);

// Function to update the character image, type, and level
function updateCharacter() {
    const stageName = stages[stage];
    wizardImage.src = `${assetsPath(characterType)}${stageName}.png`;
    wizardType.textContent = `${stageName.charAt(0).toUpperCase() + stageName.slice(1)} ${characterType === 'wizard' ? 'Wizard' : 'Witch'}`;
    levelIndicator.textContent = `${stage + 1}`;
}

// Function to update the switch gender button
function updateSwitchGenderButton() {
    switchGenderBtn.textContent = `Switch to ${characterType === 'wizard' ? 'Witch' : 'Wizard'}`;
    switchGenderBtn.style.backgroundColor = characterType === 'wizard' ? '#A4C3FF' : '#D5AAFF'; // Blue for witch, violet for wizard
}

// Switch between wizard and witch
switchGenderBtn.addEventListener('click', () => {
    characterType = characterType === 'wizard' ? 'witch' : 'wizard';
    updateCharacter();
    updateSwitchGenderButton();
});

// Handle clicks on the wizard image
wizardImage.addEventListener('click', (event) => {
    // Tutorial steps
    if (tutorialStep === 0) {
        tutorialBox.textContent = "When you collect enough experience, you will level up. Track your level here";
        tutorialStep++;
    } else if (tutorialStep === 1) {
        wizardImage.src = `${assetsPath(characterType)}ill.png`;
        tutorialBox.textContent = "Don't click when your wizard is ill or they will die :(";
        tutorialStep++;
    } else if (tutorialStep === 2) {
        tutorialBox.textContent = "Good luck!";
        tutorialStep++;
    } else if (tutorialStep === 3) {
        // Begin the actual game
        tutorialBox.style.opacity = 0; // Fade out tutorial box
        setTimeout(() => tutorialBox.style.display = 'none', 500); // Hide after fade
        startGame();
        tutorialStep ++;
    }

    if (tutorialStep >= 4) {
        // Normal game behavior
        xp += 1;

        // Show floating XP effect at the mouse position
        const xpEffect = document.createElement('div');
        xpEffect.textContent = '+1 XP';
        xpEffect.className = 'xp-effect';
        document.body.appendChild(xpEffect);

        xpEffect.style.left = `${event.clientX}px`;
        xpEffect.style.top = `${event.clientY}px`;

        setTimeout(() => {
            xpEffect.remove();
        }, 1000); // Effect lasts for 1 second

        // Check for evolution
        if (xp >= 100) {
            xp = 0;
            stage++;
            if (stage > 2) stage = 2; // Cap at Master
        }
        updateCharacter();
    }
});

// Random illness timer
let illnessTimer;
function startIllnessTimer() {
    illnessTimer = setInterval(() => {
        if (Math.random() < 0.1) {
            isIll = true;
            wizardImage.src = `${assetsPath(characterType)}ill.png`;
            setTimeout(() => {
                isIll = false;
                wizardImage.src = `${assetsPath(characterType)}${stages[stage]}.png`;
            }, 5000); // Reset after 5 seconds
        }
    }, 3000); // Illness check every 3 seconds
}

// Start the game and reset stats
function startGame() {
    xp = 0;
    stage = 0;
    updateCharacter();
    startIllnessTimer();
}

updateCharacter();
updateSwitchGenderButton();
