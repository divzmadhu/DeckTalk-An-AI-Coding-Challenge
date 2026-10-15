// ========================================================
// Project Name : DeckTalk
// Module       : Artificial Intelligence (AI) and Tools for Software Engineering
// Lab Title    : Lab 1 - An AI Coding Challenge
// Lab Date     : October 15, 2026
// Author       : DJ
// Description  : Handles flashcard flip events, category filtering, and dynamic 
//                content rendering for the language module using vanilla JavaScript.
// ========================================================

const vocabulary = [
    { english: "Hello", malayalam: "നമസ്കാരം", transliteration: "namaskāram", category: "Essentials" },
    { english: "Thank you", malayalam: "നന്ദി", transliteration: "nandi", category: "Essentials" },
    { english: "Please", malayalam: "ദയവായി", transliteration: "dayavāyi", category: "Essentials" },
    { english: "Water", malayalam: "വെള്ളം", transliteration: "veḷḷam", category: "Essentials" },
    { english: "Where?", malayalam: "എവിടെ?", transliteration: "evide?", category: "Places" },
    { english: "Toilet", malayalam: "കക്കൂസ്", transliteration: "kakkūs", category: "Places" },
    { english: "Friend", malayalam: "സുഹൃത്ത്", transliteration: "suhr̥tt", category: "People" },
    { english: "One", malayalam: "ഒന്ന്", transliteration: "onnu", category: "Numbers" },
    { english: "Two", malayalam: "രണ്ട്", transliteration: "raṇṭu", category: "Numbers" }
];

const categoryFilter = document.querySelector("#category-filter");
const cardCategory = document.querySelector("#card-category");
const cardProgress = document.querySelector("#card-progress");
const wordPrompt = document.querySelector("#word-prompt");
const translation = document.querySelector("#translation");
const malayalamWord = document.querySelector("#malayalam-word");
const transliteration = document.querySelector("#transliteration");
const revealButton = document.querySelector("#reveal-button");
const revealCopy = document.querySelector("#reveal-copy");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");

let currentDeck = vocabulary;
let currentIndex = 0;

function renderCard() {
    const card = currentDeck[currentIndex];
    const isRevealed = revealButton.getAttribute("aria-expanded") === "true";

    cardCategory.textContent = card.category;
    cardProgress.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
    wordPrompt.textContent = card.english;
    malayalamWord.textContent = card.malayalam;
    transliteration.textContent = card.transliteration;
    translation.hidden = !isRevealed;
    revealCopy.textContent = isRevealed ? "Hide translation" : "Reveal the Malayalam";
}

function setRevealed(isRevealed) {
    revealButton.setAttribute("aria-expanded", String(isRevealed));
    renderCard();
}

function moveCard(direction) {
    currentIndex = (currentIndex + direction + currentDeck.length) % currentDeck.length;
    setRevealed(false);
}

categoryFilter.addEventListener("change", () => {
    currentDeck = categoryFilter.value === "All"
        ? vocabulary
        : vocabulary.filter((card) => card.category === categoryFilter.value);
    currentIndex = 0;
    setRevealed(false);
});

revealButton.addEventListener("click", () => {
    setRevealed(revealButton.getAttribute("aria-expanded") !== "true");
});

previousButton.addEventListener("click", () => moveCard(-1));
nextButton.addEventListener("click", () => moveCard(1));

renderCard();