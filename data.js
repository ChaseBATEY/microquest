/**
 * MicroQuest - The Tiny Adventure Generator
 * Quest Data and Theme Definitions
 */

// Theme Definitions with icons, colors, and unlock requirements
const THEMES = [
    {
        id: 'explorer',
        name: 'Explorer',
        icon: 'fa-compass',
        description: 'Venture into the unknown',
        color: '#3498db',
        unlocked: true, // Explorer is unlocked by default
        unlocksAt: 0
    },
    {
        id: 'wizard',
        name: 'Wizard',
        icon: 'fa-hat-wizard',
        description: 'Master of arcane arts',
        color: '#9b59b6',
        unlocked: false,
        unlocksAt: 5 // Unlocks after 5 quests completed
    },
    {
        id: 'warrior',
        name: 'Warrior',
        icon: 'fa-khanda',
        description: 'Bold and brave',
        color: '#e74c3c',
        unlocked: false,
        unlocksAt: 10 // Unlocks after 10 quests completed
    },
    {
        id: 'trickster',
        name: 'Trickster',
        icon: 'fa-mask',
        description: 'Master of deception',
        color: '#f39c12',
        unlocked: false,
        unlocksAt: 15 // Unlocks after 15 quests completed
    },
    {
        id: 'bard',
        name: 'Bard',
        icon: 'fa-guitar',
        description: 'A musical wanderer',
        color: '#27ae60',
        unlocked: false,
        unlocksAt: 20 // Unlocks after 20 quests completed
    }
];

// Quest Data for each theme
const QUESTS = {
    explorer: [
        "Find an object that reminds you of your childhood and tell its story.",
        "Go for a five-minute walk and notice three things you've never seen before.",
        "Draw a quick map of your neighborhood from memory.",
        "Flip through a book and find a sentence that catches your eye. Use it as inspiration for a short adventure.",
        "Look out your window and find something moving. Watch it for one minute.",
        "Find the oldest item in your living space and imagine its journey to you.",
        "Take three photos of ordinary objects from unusual angles.",
        "Find something in your space that's blue and give it a name.",
        "Place a common object somewhere it doesn't belong and leave it there for a day.",
        "Close your eyes, spin around three times, and explore whatever is in front of you for 2 minutes.",
        "Find a small space in your home you rarely notice and really look at it for a minute.",
        "Create a tiny obstacle course for your finger to navigate.",
        "Find three items that could be used as improvised tools.",
        "Send someone directions to an imaginary treasure hidden in your home.",
        "Discover something that makes an interesting sound when tapped."
    ],
    
    wizard: [
        "Create a 'magic potion' (a beverage) using at least three ingredients.",
        "Invent a magic word and use it three times today when you need extra power.",
        "Design a simple symbol that represents your personal magic.",
        "Find five objects and arrange them in a pattern to create a 'spell circle'.",
        "Write down three 'magical rules' you'll follow for the rest of the day.",
        "Cast a 'light spell' by finding interesting shadows and taking pictures of them.",
        "Practice 'telekinesis' by moving something using only a straw and your breath.",
        "Create a miniature magical garden or terrarium (real or drawn).",
        "Enchant an ordinary object by decorating it or giving it a magical purpose.",
        "Write a short incantation or poem that would summon your perfect day.",
        "Identify your 'familiar' - an animal that would be your magical companion.",
        "Concoct a magic 'elixir' (a special drink) and describe its supernatural effects.",
        "Create a 'crystal ball' from something transparent and use it to 'divine' tomorrow's activities.",
        "Design a wand using materials you have available.",
        "Write down a 'transformation spell' that would change you into an animal of your choice."
    ],
    
    warrior: [
        "Complete 10 push-ups, squats, or jumping jacks (choose your battle!).",
        "Stand in a 'warrior pose' for 30 seconds while focusing on your breath.",
        "Create a personal 'battle cry' and use it to start a challenging task.",
        "Build a small fortress out of items around you.",
        "Challenge yourself to do something difficult and count to 5 when you want to give up.",
        "Identify your 'shield' - something that protects you mentally or emotionally.",
        "Design your own coat of arms with symbols that represent your strengths.",
        "Create an obstacle course and time yourself going through it.",
        "Stand guard at a doorway for 2 minutes, observing everything that happens.",
        "Find your 'weapon of choice' (a symbolic object) and display it prominently.",
        "Defend a boundary by saying 'no' to something you would normally agree to.",
        "Make a strategic plan for accomplishing a goal with three specific steps.",
        "Identify a 'dragon' (problem) in your life and write down one way to defeat it.",
        "Challenge yourself to perfect stillness for 1 minute - a warrior's focus.",
        "Write a victory speech for a battle you've recently won in your life."
    ],
    
    trickster: [
        "Hide a small object and leave clues for someone to find it.",
        "Tell a harmless white lie (like 'I saw a purple squirrel today') and see if anyone notices.",
        "Switch two objects' usual places and see how long it takes for someone to notice.",
        "Create a riddle about an everyday object and ask someone to solve it.",
        "Speak in rhyme for 5 minutes during a conversation.",
        "Leave an unexpected note for someone to discover.",
        "Create an optical illusion using everyday objects.",
        "Tell a story where three things are true and one is false, and ask listeners to guess which is false.",
        "Wear something in an unconventional way.",
        "Create a fictitious backstory for an object and tell it convincingly.",
        "Imitate someone else's mannerisms for 5 minutes without telling them.",
        "Find a way to harmlessly prank yourself.",
        "Intentionally mispronounce a common word all day and see if anyone corrects you.",
        "Create a trap (harmless) out of household items.",
        "Assign a fake holiday to today and celebrate it as genuinely as possible."
    ],
    
    bard: [
        "Make up a short song about what you're doing right now.",
        "Recite a poem (existing or original) to someone or a pet.",
        "Create a rhythmic beat using objects around you for 30 seconds.",
        "Write a haiku about your current mood.",
        "Tell a story using only sound effects for key moments.",
        "Create a short jingle for an everyday product in your home.",
        "Sing instead of speak for 5 minutes.",
        "Invent a dance move and name it after yourself.",
        "Write a verse of an inspiring song for someone who needs encouragement.",
        "Record yourself telling a 1-minute story and listen to it back.",
        "Compose a tune by assigning notes to letters and playing your name.",
        "Make up new lyrics to a familiar tune about your day.",
        "Narrate your actions in third person for 5 minutes, as dramatically as possible.",
        "Create a rhyming couplet about each room in your home.",
        "Find percussion in unexpected places - create music from everyday sounds."
    ]
};

// Export data to be used by app.js
// In a real app, we might use module exports, but for simplicity in this demo:
// window.MICRO_QUEST_DATA = { THEMES, QUESTS }; 