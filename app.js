/**
 * MicroQuest - The Tiny Adventure Generator
 * Main application logic
 */

// App state
const state = {
    currentTheme: 'explorer', // Default theme
    completedQuests: 0,
    failedQuests: 0,
    currentQuest: null,
    lastCompletedQuests: [],
    unlockedThemes: ['explorer'], // Starting with Explorer theme
    coins: 0,
    experience: 0,
    level: 1
};

// Constants
const THEMES = [
    { id: 'explorer', name: 'Explorer', icon: 'fa-compass', requiredQuests: 0 },
    { id: 'wizard', name: 'Wizard', icon: 'fa-hat-wizard', requiredQuests: 5 },
    { id: 'warrior', name: 'Warrior', icon: 'fa-shield-alt', requiredQuests: 10 },
    { id: 'trickster', name: 'Trickster', icon: 'fa-theater-masks', requiredQuests: 15 },
    { id: 'bard', name: 'Bard', icon: 'fa-music', requiredQuests: 20 }
];

const EXP_PER_LEVEL = 20; // Experience needed to level up

// DOM Elements
const elements = {
    questText: document.getElementById('quest-text'),
    themeNameDisplay: document.getElementById('theme-name'),
    currentThemeIcon: document.querySelector('#current-theme i'),
    completedBtn: document.getElementById('quest-completed'),
    failedBtn: document.getElementById('quest-failed'),
    newQuestBtn: document.getElementById('new-quest'),
    completedCount: document.getElementById('completed-count'),
    failedCount: document.getElementById('failed-count'),
    themesUnlocked: document.getElementById('themes-unlocked'),
    themesGrid: document.getElementById('themes-grid'),
    completedQuestsDisplay: document.getElementById('completed-quests'),
    failedQuestsDisplay: document.getElementById('failed-quests'),
    coinsDisplay: document.getElementById('coins'),
    levelDisplay: document.getElementById('level'),
    experienceDisplay: document.getElementById('experience'),
    experienceBar: document.getElementById('experience-bar')
};

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button icon
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Function to initialize theme
function initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // If user has previously set a theme, use that
        setTheme(savedTheme);
    } else {
        // Otherwise, use system preference
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Add rotation animation
    themeToggle.classList.add('rotating');
    
    // Remove rotation class after animation completes
    setTimeout(() => {
        themeToggle.classList.remove('rotating');
    }, 500);
    
    // Toggle theme
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize theme when the page loads
initializeTheme();

// Initialize app
function initApp() {
    loadStateFromStorage();
    
    // Set initial theme display
    const currentTheme = THEMES.find(theme => theme.id === state.currentTheme);
    elements.themeNameDisplay.textContent = currentTheme.name;
    elements.currentThemeIcon.className = '';
    elements.currentThemeIcon.classList.add('fas', currentTheme.icon);
    
    // Set initial quest theme data attribute
    const questContainer = document.querySelector('.quest-container');
    questContainer.setAttribute('data-quest-theme', state.currentTheme);
    
    renderStats();
    renderThemeSelector();
    generateNewQuest();

    // Set up event listeners
    elements.completedBtn.addEventListener('click', handleQuestCompleted);
    elements.failedBtn.addEventListener('click', handleQuestFailed);
    elements.newQuestBtn.addEventListener('click', generateNewQuest);

    // Check for unlockable themes on startup
    checkThemeUnlocks();
}

// Load saved state from local storage
function loadStateFromStorage() {
    const savedState = localStorage.getItem('microQuestState');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        Object.assign(state, parsedState);
    }
}

// Save state to local storage
function saveStateToStorage() {
    localStorage.setItem('microQuestState', JSON.stringify(state));
}

// Generate a new random quest from the current theme
function generateNewQuest() {
    const themeQuests = QUESTS[state.currentTheme];
    let newQuest;
    
    // Try to avoid recently used quests
    do {
        const randomIndex = Math.floor(Math.random() * themeQuests.length);
        newQuest = themeQuests[randomIndex];
    } while (state.lastCompletedQuests.includes(newQuest) && state.lastCompletedQuests.length < themeQuests.length - 1);

    // Update the quest display
    state.currentQuest = newQuest;
    
    // Add animation
    elements.questText.classList.remove('pop-in');
    void elements.questText.offsetWidth; // Trigger reflow
    elements.questText.classList.add('pop-in');
    
    elements.questText.textContent = newQuest;
}

// Handle quest completion
function handleQuestCompleted() {
    state.completedQuests++;
    state.experience += 5;
    state.coins += 1;
    
    // Check for level up
    while (state.experience >= EXP_PER_LEVEL) {
        state.experience -= EXP_PER_LEVEL;
        state.level++;
    }
    
    renderStats();
    generateNewQuest();
    saveStateToStorage();
}

// Handle quest failure
function handleQuestFailed() {
    state.failedQuests++;
    renderStats();
    generateNewQuest();
    saveStateToStorage();
}

// Check if any themes should be unlocked
function checkThemeUnlocks() {
    THEMES.forEach(theme => {
        if (!theme.unlocked && state.completedQuests >= theme.unlocksAt) {
            // Theme is eligible to be unlocked
            if (!state.unlockedThemes.includes(theme.id)) {
                state.unlockedThemes.push(theme.id);
                showFeedback(`New theme unlocked: ${theme.name}!`, 'primary');
                
                // Re-render theme selector with new unlocked theme
                renderThemeSelector();
            }
        }
    });
}

// Change the current theme
function changeTheme(themeId) {
    if (state.unlockedThemes.includes(themeId)) {
        state.currentTheme = themeId;
        
        // Update theme display
        const newTheme = THEMES.find(theme => theme.id === themeId);
        elements.themeNameDisplay.textContent = newTheme.name;
        
        // Update theme icon
        elements.currentThemeIcon.className = '';
        elements.currentThemeIcon.classList.add('fas', newTheme.icon);
        
        // Update quest theme data attribute
        const questContainer = document.querySelector('.quest-container');
        questContainer.setAttribute('data-quest-theme', themeId);
        
        // Update active theme in selector
        const themeItems = document.querySelectorAll('.theme-item');
        themeItems.forEach(item => {
            if (item.dataset.themeId === themeId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Generate a new quest from the new theme
        generateNewQuest();
        saveStateToStorage();
    }
}

// Render theme selector with unlocked themes
function renderThemeSelector() {
    elements.themesGrid.innerHTML = '';
    
    THEMES.forEach(theme => {
        const isUnlocked = state.unlockedThemes.includes(theme.id);
        const isActive = state.currentTheme === theme.id;
        
        const themeItem = document.createElement('div');
        themeItem.className = `theme-item ${isUnlocked ? '' : 'locked'} ${isActive ? 'active' : ''}`;
        themeItem.dataset.themeId = theme.id;
        
        const icon = document.createElement('i');
        icon.className = `fas ${theme.icon}`;
        
        const name = document.createElement('span');
        name.textContent = theme.name;
        
        themeItem.appendChild(icon);
        themeItem.appendChild(name);
        
        if (!isUnlocked) {
            const lock = document.createElement('div');
            lock.className = 'lock-info';
            lock.innerHTML = `<i class="fas fa-lock"></i><span>Unlocks at ${theme.unlocksAt} quests</span>`;
            themeItem.appendChild(lock);
        } else {
            // Add click handler only for unlocked themes
            themeItem.addEventListener('click', () => changeTheme(theme.id));
        }
        
        elements.themesGrid.appendChild(themeItem);
    });
    
    // Update the themes unlocked count
    elements.themesUnlocked.textContent = `${state.unlockedThemes.length}/${THEMES.length}`;
}

// Render stats in the UI
function renderStats() {
    elements.completedQuestsDisplay.textContent = state.completedQuests;
    elements.failedQuestsDisplay.textContent = state.failedQuests;
    elements.coinsDisplay.textContent = state.coins;
    elements.levelDisplay.textContent = state.level;
    elements.experienceDisplay.textContent = `${state.experience}/${EXP_PER_LEVEL}`;
    
    // Update progress bar
    const progress = (state.experience / EXP_PER_LEVEL) * 100;
    elements.experienceBar.style.width = `${progress}%`;
    
    // Check for unlockable themes
    checkThemeUnlocks();
}

// Show feedback message
function showFeedback(message, type) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback-${type} pop-in`;
    feedback.textContent = message;
    
    // Add to document
    document.body.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 500);
    }, 2500);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add some CSS for the feedback messages
const style = document.createElement('style');
style.textContent = `
.feedback {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s ease;
}

.feedback-success {
    background-color: var(--success);
}

.feedback-danger {
    background-color: var(--danger);
}

.feedback-primary {
    background-color: var(--primary);
}

.lock-info {
    font-size: 0.8rem;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    opacity: 0.7;
}
`;
document.head.appendChild(style);

// Add service worker registration for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Get the base path for GitHub Pages
        const basePath = window.location.pathname.includes('/MicroQuest') ? '/MicroQuest' : '';
        
        navigator.serviceWorker.register(`${basePath}/service-worker.js`)
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
                // Fallback for when service worker fails
                if (!localStorage.getItem('theme')) {
                    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
                }
            });
    });
}

// Add fallback theme initialization
if (!localStorage.getItem('theme')) {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
} 