// ========================================================
// Project Name : DeckTalk
// Module       : Artificial Intelligence (AI) and Tools for Software Engineering
// Lab Title    : Lab 1 - An AI Coding Challenge
// Lab Date     : October 15, 2026
// Author       : DJ
// Description  : Handles flashcard flip events, category filtering, and dynamic 
//                content rendering for the language module using vanilla JavaScript.
// ========================================================

const modules = {
    vocabulary: {
        prompt: "HOW DO YOU SAY",
        item: "word",
        cards: [
            { english: "Hello", malayalam: "നമസ്കാരം", transliteration: "namaskāram", category: "Essentials" },
            { english: "Thank you", malayalam: "നന്ദി", transliteration: "nandi", category: "Essentials" },
            { english: "Please", malayalam: "ദയവായി", transliteration: "dayavāyi", category: "Essentials" },
            { english: "Water", malayalam: "വെള്ളം", transliteration: "veḷḷam", category: "Essentials" },
            { english: "Where?", malayalam: "എവിടെ?", transliteration: "evide?", category: "Places" },
            { english: "Toilet", malayalam: "കക്കൂസ്", transliteration: "kakkūs", category: "Places" },
            { english: "Friend", malayalam: "സുഹൃത്ത്", transliteration: "suhr̥tt", category: "People" },
            { english: "One", malayalam: "ഒന്ന്", transliteration: "onnu", category: "Numbers" },
            { english: "Two", malayalam: "രണ്ട്", transliteration: "raṇṭu", category: "Numbers" }
        ]
    },
    conversations: {
        prompt: "HOW WOULD YOU SAY",
        item: "phrase",
        cards: [
            { english: "Good morning", malayalam: "സുപ്രഭാതം", transliteration: "suprabhātam", category: "Greetings & Courtesy" },
            { english: "How are you?", malayalam: "സുഖമാണോ?", transliteration: "sukhamaano?", category: "Greetings & Courtesy" },
            { english: "Please help me", malayalam: "ദയവായി എന്നെ സഹായിക്കൂ", transliteration: "dayavāyi enne sahāyikkū", category: "Greetings & Courtesy" },
            { english: "Water, please", malayalam: "വെള്ളം തരാമോ?", transliteration: "veḷḷam tarāmo?", category: "Dining" },
            { english: "I would like this", malayalam: "ഇത് വേണം", transliteration: "itu vēṇam", category: "Dining" },
            { english: "Is this spicy?", malayalam: "ഇത് എരിവുള്ളതാണോ?", transliteration: "itu erivuḷḷatāṇo?", category: "Dining" },
            { english: "The bill, please", malayalam: "ബിൽ തരാമോ?", transliteration: "bil tarāmo?", category: "Dining" },
            { english: "Where is the bus station?", malayalam: "ബസ് സ്റ്റാൻഡ് എവിടെയാണ്?", transliteration: "bas stand evideyāṇ?", category: "Transport & Navigation" },
            { english: "Please stop here", malayalam: "ഇവിടെ നിർത്തൂ", transliteration: "ivide nirthū", category: "Transport & Navigation" },
            { english: "Take me to ...", malayalam: "...ലേക്ക് കൊണ്ടുപോകാമോ?", transliteration: "...lēkk koṇṭupōkāmo?", category: "Transport & Navigation" },
            { english: "How much is this?", malayalam: "ഇതിന് എത്രയാണ്?", transliteration: "itin etrayāṇ?", category: "Shopping & Bargaining" },
            { english: "It's too expensive", malayalam: "ഇത് വളരെ വില കൂടിയതാണ്", transliteration: "itu valare vila kūṭiyatāṇ", category: "Shopping & Bargaining" },
            { english: "Do you have a smaller one?", malayalam: "ഇതിലും ചെറുതുണ്ടോ?", transliteration: "itilum cherutunṭō?", category: "Shopping & Bargaining" },
            { english: "I'll take this", malayalam: "ഇത് എടുക്കാം", transliteration: "itu eṭukkām", category: "Shopping & Bargaining" }
        ]
    }
};

const moduleFilter = document.querySelector("#module-filter");
const categoryFilter = document.querySelector("#category-filter");
const cardCategory = document.querySelector("#card-category");
const cardProgress = document.querySelector("#card-progress");
const wordPrompt = document.querySelector("#word-prompt");
const wordLabel = document.querySelector("#word-label");
const translation = document.querySelector("#translation");
const malayalamWord = document.querySelector("#malayalam-word");
const transliteration = document.querySelector("#transliteration");
const revealButton = document.querySelector("#reveal-button");
const revealCopy = document.querySelector("#reveal-copy");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const nextItemLabel = document.querySelector("#next-item-label");

let activeModule = modules[moduleFilter.value];
let currentDeck = activeModule.cards;
let currentIndex = 0;

function renderCard() {
    const card = currentDeck[currentIndex];
    const isRevealed = revealButton.getAttribute("aria-expanded") === "true";

    cardCategory.textContent = card.category;
    cardProgress.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
    wordPrompt.textContent = card.english;
    wordPrompt.classList.toggle("is-phrase", activeModule.item === "phrase");
    wordLabel.textContent = activeModule.prompt;
    nextItemLabel.textContent = activeModule.item;
    malayalamWord.textContent = card.malayalam;
    transliteration.textContent = card.transliteration;
    translation.hidden = !isRevealed;
    revealCopy.textContent = isRevealed ? "Tap to hide" : "Tap to reveal";
}

function updateCategoryOptions() {
    const categories = [...new Set(activeModule.cards.map((card) => card.category))];
    const options = [
        new Option("All categories", "All"),
        ...categories.map((category) => new Option(category, category))
    ];

    categoryFilter.replaceChildren(...options);
}

function setRevealed(isRevealed) {
    revealButton.setAttribute("aria-expanded", String(isRevealed));
    renderCard();
}

function moveCard(direction) {
    currentIndex = (currentIndex + direction + currentDeck.length) % currentDeck.length;
    setRevealed(false);
}

moduleFilter.addEventListener("change", () => {
    activeModule = modules[moduleFilter.value];
    updateCategoryOptions();
    currentDeck = activeModule.cards;
    currentIndex = 0;
    setRevealed(false);
});

categoryFilter.addEventListener("change", () => {
    currentDeck = categoryFilter.value === "All"
        ? activeModule.cards
        : activeModule.cards.filter((card) => card.category === categoryFilter.value);
    currentIndex = 0;
    setRevealed(false);
});

revealButton.addEventListener("click", () => {
    setRevealed(revealButton.getAttribute("aria-expanded") !== "true");
});

previousButton.addEventListener("click", () => moveCard(-1));
nextButton.addEventListener("click", () => moveCard(1));

updateCategoryOptions();
renderCard();