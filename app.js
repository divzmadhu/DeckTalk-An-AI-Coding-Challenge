// ========================================================
// Project Name : DeckTalk
// Module       : Artificial Intelligence (AI) and Tools for Software Engineering
// Lab Title    : Lab 1 - An AI Coding Challenge
// Lab Date     : October 15, 2026
// Author       : DJ
// Description  : Handles flashcard flip events, category filtering, and dynamic 
//                content rendering for the language module using vanilla JavaScript.
// ========================================================

const storageKey = "decktalk-study-data-v1";
const seedDecks = malayalamModules;
const app = document.querySelector(".app");
const headerMenu = document.querySelector("#header-menu");
const headerMenuSummary = headerMenu.querySelector("summary");
const openManagementDecksButton = document.querySelector("#open-management-decks-button");
const openManagementCardsButton = document.querySelector("#open-management-cards-button");
const homeButton = document.querySelector("#home-button");
const openHelpButton = document.querySelector("#open-help-button");
const helpDialog = document.querySelector("#help-dialog");
const closeHelpButton = document.querySelector("#close-help-button");
const moduleFilter = document.querySelector("#module-filter");
const manageDeckFilter = document.querySelector("#manage-deck-filter");
const categoryFilter = document.querySelector("#category-filter");
const cardSearch = document.querySelector("#card-search");
const cardCategories = document.querySelectorAll(".card-category");
const cardProgress = document.querySelector("#card-progress");
const wordPrompt = document.querySelector("#word-prompt");
const wordLabel = document.querySelector("#word-label");
const malayalamWord = document.querySelector("#malayalam-word");
const transliteration = document.querySelector("#transliteration");
const revealButton = document.querySelector("#reveal-button");
const cardFront = document.querySelector("#card-front");
const cardBack = document.querySelector("#card-back");
const flashcard = document.querySelector("#flashcard");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const shuffleButton = document.querySelector("#shuffle-button");
const storageStatus = document.querySelector("#storage-status");
const flashcardStatus = document.querySelector("#flashcard-status");
const createDeckForm = document.querySelector("#create-deck-form");
const newDeckName = document.querySelector("#new-deck-name");
const newDeckItem = document.querySelector("#new-deck-item");
const renameDeckForm = document.querySelector("#rename-deck-form");
const deckName = document.querySelector("#deck-name");
const deleteDeckButton = document.querySelector("#delete-deck-button");
const updateDeckButton = document.querySelector("#update-deck-button");
const cancelDeckUpdateButton = document.querySelector("#cancel-deck-update");
const deckManagementView = document.querySelector("#deck-management-view");
const createDeckView = document.querySelector("#create-deck-view");
const cardEntryView = document.querySelector("#card-entry-view");
const existingCardsView = document.querySelector("#existing-cards-view");
const openCreateDeckButton = document.querySelector("#open-create-deck");
const deckManagementBackButton = document.querySelector("#deck-management-back");
const createDeckBackButton = document.querySelector("#create-deck-back");
const cardEntryBackButton = document.querySelector("#card-entry-back");
const existingCardsBackButton = document.querySelector("#existing-cards-back");
const addCardButton = document.querySelector("#add-card-button");
const cardForm = document.querySelector("#card-form");
const cardEnglish = document.querySelector("#card-english");
const cardMalayalam = document.querySelector("#card-malayalam");
const cardTransliteration = document.querySelector("#card-transliteration");
const cardCategory = document.querySelector("#card-category");
const cardFormTitle = document.querySelector("#card-form-title");
const saveCardButton = document.querySelector("#save-card-button");
const cancelCardEditButton = document.querySelector("#cancel-card-edit");
const managedCardList = document.querySelector("#managed-card-list");

function cloneDecks(decks) {
    return Object.fromEntries(Object.entries(decks).map(([id, deck]) => [
        id,
        {
            name: deck.name,
            prompt: deck.prompt,
            item: deck.item,
            cards: deck.cards.map((card) => ({ ...card }))
        }
    ]));
}

function isValidDeckCollection(value) {
    return value !== null
        && typeof value === "object"
        && !Array.isArray(value)
        && Object.keys(value).length > 0
        && Object.values(value).every((deck) =>
            deck !== null
            && typeof deck === "object"
            && typeof deck.name === "string"
            && typeof deck.prompt === "string"
            && typeof deck.item === "string"
            && (deck.item === "word" || deck.item === "phrase")
            && Array.isArray(deck.cards)
            && deck.cards.every((card) =>
                card !== null
                && typeof card === "object"
                && typeof card.english === "string"
                && typeof card.malayalam === "string"
                && typeof card.transliteration === "string"
                && typeof card.category === "string"
            )
        );
}

function loadSavedState() {
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved === null) {
            needsInitialSave = true;
            return { decks: cloneDecks(seedDecks), lastActiveDeck: Object.keys(seedDecks)[0] };
        }

        const state = JSON.parse(saved);
        if (!isValidDeckCollection(state.decks)) {
            throw new Error("Saved deck data is not in the expected format.");
        }

        return {
            decks: state.decks,
            lastActiveDeck: Object.hasOwn(state.decks, state.lastActiveDeck)
                ? state.lastActiveDeck
                : Object.keys(state.decks)[0]
        };
    } catch (error) {
        storageStatus.textContent = `Could not load saved decks: ${error.message} Starting with the built-in decks.`;
        storageStatus.hidden = false;
        return { decks: cloneDecks(seedDecks), lastActiveDeck: Object.keys(seedDecks)[0] };
    }
}

let needsInitialSave = false;
const savedState = loadSavedState();
let modules = savedState.decks;
let activeDeckId = savedState.lastActiveDeck;
let activeModule = modules[activeDeckId];
let currentDeck = activeModule.cards;
let currentIndex = 0;
let editingCard = null;
let cardFormReturnView = null;
let cardFormReturnFocus = null;
let shuffledOrder = null;

function persistState() {
    try {
        localStorage.setItem(storageKey, JSON.stringify({
            decks: modules,
            lastActiveDeck: activeDeckId
        }));
        storageStatus.textContent = "";
        storageStatus.hidden = true;
    } catch (error) {
        storageStatus.textContent = `Could not save changes in this browser: ${error.message}`;
        storageStatus.hidden = false;
    }
}

function getVisibleCards() {
    const query = cardSearch.value.trim().toLocaleLowerCase();
    const decksToSearch = query
        ? Object.values(modules)
        : [activeModule];

    return decksToSearch.flatMap((deck) => deck.cards).filter((card) => {
        const matchesCategory = categoryFilter.value === "All" || card.category === categoryFilter.value;
        const searchableText = `${card.english} ${card.malayalam} ${card.transliteration} ${card.category}`.toLocaleLowerCase();
        return matchesCategory && searchableText.includes(query);
    });
}

function renderDeckOptions() {
    const options = () => Object.entries(modules).map(([id, deck]) => new Option(deck.name, id));
    moduleFilter.replaceChildren(...options());
    manageDeckFilter.replaceChildren(...options());
    moduleFilter.value = activeDeckId;
    manageDeckFilter.value = activeDeckId;
}

function renderCategoryOptions() {
    const decksToSearch = cardSearch.value.trim()
        ? Object.values(modules)
        : [activeModule];
    const categories = [...new Set(decksToSearch.flatMap((deck) =>
        deck.cards.map((card) => card.category)
    ))].sort();
    const selectedCategory = categoryFilter.value;
    const options = [
        new Option("All categories", "All"),
        ...categories.map((category) => new Option(category, category))
    ];

    categoryFilter.replaceChildren(...options);
    categoryFilter.value = categories.includes(selectedCategory) ? selectedCategory : "All";
}

function renderCard() {
    const visibleCards = getVisibleCards();
    if (shuffledOrder) {
        const visibleSet = new Set(visibleCards);
        currentDeck = shuffledOrder.filter((card) => visibleSet.has(card));
    } else {
        currentDeck = visibleCards;
    }

    const hasCards = currentDeck.length > 0;
    const isRevealed = revealButton.getAttribute("aria-expanded") === "true";
    const hasSearchQuery = cardSearch.value.trim().length > 0;

    flashcard.hidden = !hasCards;
    flashcardStatus.hidden = hasCards;
    flashcardStatus.textContent = !hasSearchQuery && activeModule.cards.length === 0
        ? "This deck has no cards yet. Open Menu, then Manage Cards, to add one."
        : hasSearchQuery
            ? "No cards match your search and category across any deck."
            : "No cards match this category in the selected deck.";
    previousButton.disabled = !hasCards;
    nextButton.disabled = !hasCards;
    shuffleButton.disabled = currentDeck.length < 2;

    if (!hasCards) {
        cardProgress.textContent = "0 / 0";
        return;
    }

    currentIndex = Math.min(currentIndex, currentDeck.length - 1);
    const card = currentDeck[currentIndex];
    const cardModule = Object.values(modules).find((deck) => deck.cards.includes(card));
    cardProgress.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
    cardCategories.forEach((categoryLabel) => {
        categoryLabel.textContent = cardSearch.value.trim()
            ? `${cardModule.name} · ${card.category}`
            : card.category;
    });
    wordPrompt.textContent = card.english;
    wordPrompt.classList.toggle("is-phrase", cardModule.item === "phrase");
    wordLabel.textContent = cardModule.prompt;
    malayalamWord.textContent = card.malayalam;
    transliteration.textContent = card.transliteration;
    cardFront.setAttribute("aria-hidden", String(isRevealed));
    cardBack.setAttribute("aria-hidden", String(!isRevealed));
    revealButton.setAttribute("aria-label", isRevealed
        ? "Tap to hide Malayalam translation"
        : "Tap to reveal Malayalam translation");
}

function renderManagedCards() {
    managedCardList.setAttribute("aria-label", `Cards in ${activeModule.name}`);
    const items = activeModule.cards.map((card) => {
        const item = document.createElement("li");
        const summary = document.createElement("span");
        const english = document.createElement("span");
        const details = document.createElement("span");
        const malayalam = document.createElement("span");
        const category = document.createElement("span");
        const actions = document.createElement("div");
        const editButton = document.createElement("button");
        const removeButton = document.createElement("button");

        summary.className = "managed-card-summary";
        english.className = "managed-card-english";
        english.textContent = card.english;
        details.className = "managed-card-details";
        malayalam.className = "managed-card-malayalam";
        malayalam.lang = "ml";
        malayalam.textContent = card.malayalam;
        category.className = "managed-card-category";
        category.textContent = card.category;
        details.append(malayalam, category);
        summary.append(english, details);
        actions.className = "managed-card-actions";
        editButton.className = "button button-secondary";
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit card: ${card.english}`);
        editButton.addEventListener("click", () => {
            cardFormReturnFocus = editButton;
            startEditingCard(card);
        });
        removeButton.className = "button button-danger";
        removeButton.type = "button";
        removeButton.textContent = "Delete";
        removeButton.setAttribute("aria-label", `Delete card: ${card.english}`);
        removeButton.addEventListener("click", () => deleteCard(card));

        actions.append(editButton, removeButton);
        item.append(summary, actions);
        return item;
    });

    managedCardList.replaceChildren(...items);
}

function renderManagementForms() {
    deckName.value = activeModule.name;
    deleteDeckButton.disabled = Object.keys(modules).length < 2;
    renderManagedCards();
}

function showManagementView(view) {
    deckManagementView.hidden = view !== deckManagementView;
    createDeckView.hidden = view !== createDeckView;
    cardEntryView.hidden = view !== cardEntryView;
    existingCardsView.hidden = view !== existingCardsView;
}

function setManaging(isManaging, view = null) {
    app.classList.toggle("is-managing", isManaging);
    headerMenu.open = false;
    headerMenu.hidden = isManaging;
    homeButton.hidden = !isManaging;
    showManagementView(isManaging ? view : null);

    if (!isManaging) {
        cardFormReturnView = null;
        resetCardForm();
        closeDeckUpdateForm();
        createDeckForm.reset();
        cardEntryBackButton.textContent = "Back to cards";
    }
}

function closeDeckUpdateForm() {
    renameDeckForm.hidden = true;
    deckName.value = activeModule.name;
}

function renderAll() {
    activeModule = modules[activeDeckId];
    renderDeckOptions();
    renderCategoryOptions();
    currentIndex = 0;
    renderCard();
    renderManagementForms();
}

function setRevealed(isRevealed) {
    revealButton.setAttribute("aria-expanded", String(isRevealed));
    renderCard();
}

function moveCard(direction) {
    if (currentDeck.length === 0) {
        return;
    }

    currentIndex = (currentIndex + direction + currentDeck.length) % currentDeck.length;
    setRevealed(false);
}

function startEditingCard(card) {
    editingCard = card;
    cardFormReturnView = existingCardsView;
    cardForm.hidden = false;
    cardEnglish.value = card.english;
    cardMalayalam.value = card.malayalam;
    cardTransliteration.value = card.transliteration;
    cardCategory.value = card.category;
    cardFormTitle.textContent = "Edit a card";
    saveCardButton.textContent = "Save card";
    cardEntryBackButton.textContent = "Back to cards";
    showManagementView(cardEntryView);
    cardEnglish.focus();
}

function resetCardForm() {
    editingCard = null;
    cardFormReturnFocus = null;
    cardForm.reset();
    cardForm.hidden = true;
    cardFormTitle.textContent = "Add a card";
    saveCardButton.textContent = "Add card";
}

function deleteCard(card) {
    const confirmed = window.confirm(`Delete the card "${card.english}"?`);
    if (!confirmed) {
        return;
    }

    const cardIndex = activeModule.cards.indexOf(card);
    activeModule.cards.splice(cardIndex, 1);
    resetCardForm();
    persistState();
    renderCategoryOptions();
    renderCard();
    renderManagedCards();
    showManagementView(existingCardsView);
    const nextCard = managedCardList.children[Math.min(cardIndex, managedCardList.children.length - 1)];
    if (nextCard) {
        nextCard.querySelector("button").focus();
    } else {
        addCardButton.focus();
    }
}

function selectActiveDeck(deckId) {
    activeDeckId = deckId;
    categoryFilter.value = "All";
    cardSearch.value = "";
    shuffledOrder = null;
    cardFormReturnView = null;
    resetCardForm();
    closeDeckUpdateForm();
    setRevealed(false);
    persistState();
    renderAll();
}

moduleFilter.addEventListener("change", () => selectActiveDeck(moduleFilter.value));
manageDeckFilter.addEventListener("change", () => selectActiveDeck(manageDeckFilter.value));

categoryFilter.addEventListener("change", () => {
    shuffledOrder = null;
    currentIndex = 0;
    setRevealed(false);
});

cardSearch.addEventListener("input", () => {
    shuffledOrder = null;
    currentIndex = 0;
    renderCategoryOptions();
    setRevealed(false);
});

revealButton.addEventListener("click", () => {
    setRevealed(revealButton.getAttribute("aria-expanded") !== "true");
});

previousButton.addEventListener("click", () => moveCard(-1));
nextButton.addEventListener("click", () => moveCard(1));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && helpDialog.open) {
        event.preventDefault();
        helpDialog.close();
        return;
    }

    if (event.key === "Escape" && headerMenu.open) {
        headerMenu.open = false;
        headerMenuSummary.focus();
        return;
    }

    const target = event.target;
    const activeControl = target instanceof Element
        ? target.closest("button, a, input, textarea, select, summary, [contenteditable='true']")
        : null;
    if ((activeControl && activeControl !== revealButton)
        || app.classList.contains("is-managing")
        || helpDialog.open
        || headerMenu.open) {
        return;
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveCard(-1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveCard(1);
    }
});
shuffleButton.addEventListener("click", () => {
    shuffledOrder = [...currentDeck];
    for (let index = shuffledOrder.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledOrder[index], shuffledOrder[randomIndex]] = [shuffledOrder[randomIndex], shuffledOrder[index]];
    }
    currentIndex = 0;
    setRevealed(false);
});

createDeckForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = newDeckName.value.trim();
    const id = `deck-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const item = newDeckItem.value;

    modules[id] = {
        name,
        prompt: item === "phrase" ? "HOW WOULD YOU SAY" : "HOW DO YOU SAY",
        item,
        cards: []
    };
    activeDeckId = id;
    shuffledOrder = null;
    createDeckForm.reset();
    categoryFilter.value = "All";
    cardSearch.value = "";
    resetCardForm();
    revealButton.setAttribute("aria-expanded", "false");
    persistState();
    renderAll();
    showManagementView(deckManagementView);
    closeDeckUpdateForm();
    openCreateDeckButton.focus();
});

renameDeckForm.addEventListener("submit", (event) => {
    event.preventDefault();
    activeModule.name = deckName.value.trim();
    persistState();
    renderDeckOptions();
    closeDeckUpdateForm();
    updateDeckButton.focus();
});

deleteDeckButton.addEventListener("click", () => {
    if (Object.keys(modules).length < 2) {
        return;
    }

    const confirmed = window.confirm(`Delete the deck "${activeModule.name}" and all its cards?`);
    if (!confirmed) {
        return;
    }

    delete modules[activeDeckId];
    activeDeckId = Object.keys(modules)[0];
    shuffledOrder = null;
    categoryFilter.value = "All";
    cardSearch.value = "";
    resetCardForm();
    revealButton.setAttribute("aria-expanded", "false");
    persistState();
    renderAll();
    showManagementView(deckManagementView);
});

cardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedCard = {
        english: cardEnglish.value.trim(),
        malayalam: cardMalayalam.value.trim(),
        transliteration: cardTransliteration.value.trim(),
        category: cardCategory.value.trim()
    };

    if (editingCard) {
        Object.assign(editingCard, updatedCard);
    } else {
        activeModule.cards.push(updatedCard);
    }

    const returnView = cardFormReturnView || existingCardsView;
    const returnFocus = cardFormReturnFocus;
    const savedCard = editingCard;
    cardFormReturnView = null;
    cardFormReturnFocus = null;
    shuffledOrder = null;
    resetCardForm();
    persistState();
    renderCategoryOptions();
    renderCard();
    renderManagedCards();
    showManagementView(returnView);
    if (returnFocus === addCardButton) {
        addCardButton.focus();
    } else if (savedCard) {
        const savedCardIndex = activeModule.cards.indexOf(savedCard);
        const savedCardRow = managedCardList.children[savedCardIndex];
        if (savedCardRow) {
            savedCardRow.querySelector("button").focus();
        } else {
            existingCardsBackButton.focus();
        }
    } else {
        existingCardsBackButton.focus();
    }
});

cancelCardEditButton.addEventListener("click", () => {
    const returnView = cardFormReturnView || existingCardsView;
    const returnFocus = cardFormReturnFocus;
    cardFormReturnView = null;
    cardFormReturnFocus = null;
    resetCardForm();
    showManagementView(returnView);
    if (returnFocus && returnFocus.isConnected) {
        returnFocus.focus();
    } else {
        existingCardsBackButton.focus();
    }
});
openManagementDecksButton.addEventListener("click", () => {
    setManaging(true, deckManagementView);
    manageDeckFilter.focus();
});
openManagementCardsButton.addEventListener("click", () => {
    renderManagedCards();
    setManaging(true, existingCardsView);
    addCardButton.focus();
});
homeButton.addEventListener("click", () => {
    setManaging(false);
    headerMenuSummary.focus();
});
openHelpButton.addEventListener("click", () => {
    headerMenu.open = false;
    helpDialog.showModal();
    closeHelpButton.focus();
});
closeHelpButton.addEventListener("click", () => {
    helpDialog.close();
});
helpDialog.addEventListener("close", () => {
    headerMenuSummary.focus();
});
openCreateDeckButton.addEventListener("click", () => {
    createDeckForm.reset();
    showManagementView(createDeckView);
    newDeckName.focus();
});
addCardButton.addEventListener("click", () => {
    resetCardForm();
    cardFormReturnView = existingCardsView;
    cardFormReturnFocus = addCardButton;
    cardEntryBackButton.textContent = "Back to cards";
    cardForm.hidden = false;
    showManagementView(cardEntryView);
    cardEnglish.focus();
});
deckManagementBackButton.addEventListener("click", () => {
    setManaging(false);
    headerMenuSummary.focus();
});
updateDeckButton.addEventListener("click", () => {
    deckName.value = activeModule.name;
    renameDeckForm.hidden = false;
    deckName.focus();
});
cancelDeckUpdateButton.addEventListener("click", () => {
    closeDeckUpdateForm();
    updateDeckButton.focus();
});
createDeckBackButton.addEventListener("click", () => {
    createDeckForm.reset();
    showManagementView(deckManagementView);
    openCreateDeckButton.focus();
});
cardEntryBackButton.addEventListener("click", () => {
    const returnView = cardFormReturnView || existingCardsView;
    const returnFocus = cardFormReturnFocus;
    cardFormReturnView = null;
    cardFormReturnFocus = null;
    resetCardForm();
    showManagementView(returnView);
    if (returnFocus && returnFocus.isConnected) {
        returnFocus.focus();
    } else {
        existingCardsBackButton.focus();
    }
});
existingCardsBackButton.addEventListener("click", () => {
    setManaging(false);
    headerMenuSummary.focus();
});

renderAll();
if (needsInitialSave) {
    persistState();
}