// ========================================================
// Project Name : DeckTalk
// Module       : Artificial Intelligence (AI) and Tools for Software Engineering
// Lab Title    : Lab 1 - An AI Coding Challenge
// Lab Date     : October 15, 2026
// Author       : DJ
// Description  : Handles flashcard flip events, category filtering, and dynamic 
//                content rendering for the language module using vanilla JavaScript.
// ========================================================

const modules = malayalamModules;
const moduleFilter = document.querySelector("#module-filter");
const categoryFilter = document.querySelector("#category-filter");
const cardCategory = document.querySelector("#card-category");
const cardProgress = document.querySelector("#card-progress");
const wordPrompt = document.querySelector("#word-prompt");
const wordLabel = document.querySelector("#word-label");
const malayalamWord = document.querySelector("#malayalam-word");
const transliteration = document.querySelector("#transliteration");
const revealButton = document.querySelector("#reveal-button");
const cardFront = document.querySelector("#card-front");
const cardBack = document.querySelector("#card-back");
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
    cardFront.setAttribute("aria-hidden", String(isRevealed));
    cardBack.setAttribute("aria-hidden", String(!isRevealed));
    revealButton.setAttribute("aria-label", isRevealed
        ? "Tap to hide Malayalam translation"
        : "Tap to reveal Malayalam translation");
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