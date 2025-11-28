class Tamagotchi {
    constructor() {
        this.hunger = 0;      // 0 = Full, 100 = Starving
        this.energy = 100;    // 100 = Energetic, 0 = Exhausted
        this.happiness = 100; // 100 = Happy, 0 = Sad

        this.thoughtBubble = document.getElementById('thought-bubble');
        this.tacoImg = document.getElementById('taco-img');

        this.ui = {
            hunger: document.getElementById('hunger-bar'),
            energy: document.getElementById('energy-bar'),
            happiness: document.getElementById('happiness-bar')
        };

        this.startGameLoop();
        this.updateUI();
    }

    // --- Core Logic ---

    think() {
        let thought = "";

        // Priority logic as requested
        if (this.hunger > 70) {
            thought = "dame comida!";
        } else if (this.energy < 30) {
            thought = "estoy hambriento!"; // User requested specific text for energy < 30
        } else if (this.happiness > 80) {
            thought = "estoy muy feliz";
        } else {
            // Default thoughts based on other states
            if (this.happiness < 30) thought = "estoy triste...";
            else if (this.energy > 80) thought = "quiero jugar!";
            else thought = "Miau...";
        }

        this.showThought(thought);
    }

    showThought(text) {
        this.thoughtBubble.innerText = text;
        this.thoughtBubble.classList.add('visible');

        // Hide thought after 3 seconds if it's just a status update, 
        // but for critical states (hunger/energy), we might want to keep it?
        // Let's keep it simple: show it, and the loop will update it if the condition persists.
    }

    // --- Actions ---

    feed() {
        this.hunger = Math.max(0, this.hunger - 20);
        this.energy = Math.min(100, this.energy + 5);
        this.animateAction('bounce');
        this.updateUI();
        this.think();
    }

    sleep() {
        this.energy = Math.min(100, this.energy + 40);
        this.hunger = Math.min(100, this.hunger + 10); // Sleeping makes you hungry
        this.animateAction('bounce');
        this.updateUI();
        this.think();
    }

    play() {
        if (this.energy < 20) {
            this.showThought("estoy muy cansado para jugar...");
            return;
        }
        this.happiness = Math.min(100, this.happiness + 15);
        this.energy = Math.max(0, this.energy - 15);
        this.hunger = Math.min(100, this.hunger + 10);
        this.animateAction('bounce');
        this.updateUI();
        this.think();
    }

    pet() {
        this.happiness = Math.min(100, this.happiness + 5);
        this.animateAction('bounce');
        this.updateUI();
        this.think();
    }

    // --- Game Loop ---

    startGameLoop() {
        setInterval(() => {
            // Decay stats over time
            this.hunger = Math.min(100, this.hunger + 2);
            this.energy = Math.max(0, this.energy - 2);
            this.happiness = Math.max(0, this.happiness - 1);

            this.updateUI();
            this.think();
        }, 3000); // Update every 3 seconds
    }

    // --- Helpers ---

    updateUI() {
        this.ui.hunger.style.width = `${this.hunger}%`;
        this.ui.energy.style.width = `${this.energy}%`;
        this.ui.happiness.style.width = `${this.happiness}%`;

        // Color changes based on critical levels
        this.updateColor(this.ui.hunger, this.hunger, true); // true = high is bad
        this.updateColor(this.ui.energy, this.energy, false); // false = low is bad
        this.updateColor(this.ui.happiness, this.happiness, false);
    }

    updateColor(element, value, highIsBad) {
        if (highIsBad) {
            if (value > 70) element.style.backgroundColor = '#ff4757'; // Critical
            else if (value > 40) element.style.backgroundColor = '#ffa502'; // Warning
            else element.style.backgroundColor = '#2ed573'; // Good
        } else {
            if (value < 30) element.style.backgroundColor = '#ff4757'; // Critical
            else if (value < 60) element.style.backgroundColor = '#ffa502'; // Warning
            else element.style.backgroundColor = '#2ed573'; // Good
        }
    }

    animateAction(animationClass) {
        this.tacoImg.classList.remove(animationClass);
        void this.tacoImg.offsetWidth; // Trigger reflow
        this.tacoImg.classList.add(animationClass);
    }
}

// Initialize
const taco = new Tamagotchi();
