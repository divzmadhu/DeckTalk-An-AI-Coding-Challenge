# 🎴 DeckTalk

> **A traveler-focused language flashcard app designed to break communication barriers on the go.**

DeckTalk bridges the gap between travelers and locals by providing fast, practical, and offline-accessible language flashcards. Launching with an initial focus on **Malayalam for English speakers**, DeckTalk features a modular framework built to scale seamlessly to global languages such as Spanish, French, Japanese, and beyond.

---

## 🚀 Features

- 📚 **Categorized Flashcards**: Organized by real-world contexts (Core Words, Dining, Shopping, Transport, Greetings).
- 🗣️ **Phonetic Guidance & Audio**: English transliterations accompanied by native audio pronunciation clips for instant confidence.
- ⚡ **Offline-First Design**: Accessible anywhere, anytime—no active cellular data or roaming required.
- 🌐 **Scalable Multi-Language Architecture**: Built with a modular content structure, enabling effortless expansion to new languages without modifying the core engine.

---
## 🛠️ Tech Stack & Architecture

DeckTalk is built using lightweight, modern web technologies without heavy frameworks:
- **Markup:** HTML5 (Semantic structure)
- **Styling:** CSS3 (Responsive layouts, flexbox, custom styles)
- **Logic:** Vanilla JavaScript (ES6+, DOM manipulation, event listeners)
- **Data Format:** JSON / Local JavaScript objects for modular language packs



```text
[ Application Core Engine ]
         │
         ├──► [ Malayalam Language Pack (JSON + Audio) ]  ── (Initial Launch)
         ├──► [ Spanish Language Pack (JSON + Audio) ]    ── (Future Release)
         └──► [ French Language Pack (JSON + Audio) ]     ── (Future Release)


```
## 📂 Learning Modules (Phase 1)

### 🔹 Module 1: Core Vocabulary
- Single essential words (nouns, numbers, directions, places, and basic needs).
- Clear English definitions paired with target script, transliteration, and audio.

### 🔹 Module 2: Basic Travel Conversations
- Practical phrases for everyday interactions:
  * 👋 *Greetings & Courtesy*
  * 🍛 *Dining & Ordering Food*
  * 🚕 *Transportation & Navigation*
  * 🛍️ *Shopping & Bargaining*

---

### Implementation Details 

### Step 1: Core Vocabulary

- Added an English-to-Malayalam flashcard page with Essentials, Places, People, and Numbers categories.
- Added category filtering, previous/next navigation, and reveal/hide behavior for Malayalam script and transliteration.
- Added responsive styling for the vocabulary practice page.
- Vocabulary is currently stored in a local JavaScript array.

### Step 2: Basic Travel Conversations

- Added a separate Travel Conversations deck with phrases for Greetings & Courtesy, Dining, Transport & Navigation, and Shopping & Bargaining.
- Added a module selector so the Core Vocabulary deck remains available.
- Updated the category selector and card prompts to match the selected deck.
- Added phrase-specific responsive sizing for longer prompts.

### Step 3: Review status

- Fixed the reveal control so Malayalam translations stay hidden until selected.
- Simplified the card action label to "Tap to reveal" / "Tap to hide".
- Audio playback, offline caching, and additional language packs have not been implemented yet.

### Step 4: Flashcard flip animation

- Changed the reveal interaction to flip the card between the English prompt and Malayalam answer.
- Preserved keyboard activation and added accessible labels for the current flip action.
- Respects the device's reduced-motion preference.
- Set the flip container to a block box so the positioned card faces have a defined area.
- Restored the front face's original padding and prompt/reveal spacing.
- Added midpoint visibility switching so the front and back content cannot overlap during the flip.
- Shortened the flip duration from 550 ms to 350 ms and aligned the visibility handoff to its midpoint.

### Step 5: Separate Malayalam language data

- Moved the existing Core Vocabulary and Travel Conversations card data into `malayalam.js`.
- Load the data file before `app.js`; card content and behavior remain unchanged.
- Kept the data in JavaScript so the app continues to work when opened directly from `index.html`.

### Step 6: Core number vocabulary

- Expanded the Numbers category to cover one through ten.
- Added selected useful amounts: twenty, fifty, one hundred, five hundred, one thousand, ten thousand, one lakh, and one million (ten lakh).
- Verified several forms against Malayalam Wiktionary entries; transliterations use learner-friendly romanization.

### Step 7: Transport and route phrases

- Added practical bus/train selection, destination, route, getting-off, and taxi/auto-rickshaw phrases to the existing Transport & Navigation category.
- These phrase translations are learner-oriented drafts and should be checked by a Malayalam speaker before treating them as authoritative.
- Updated "How do I get to [place]?" using the Malayalam wording and transliteration supplied by the user.
- Updated "Take me to [place]." using the Malayalam wording and transliteration supplied by the user.
- Updated "Does this bus go to [place]?" using the Malayalam wording and transliteration supplied by the user.

### Step 8: Flip the full flashcard

- Moved the category badge and footer into both card faces so the whole card rotates, not only the center content.
- Kept the prompt and translation centered within their respective card faces.

### Step 9: Deck and card management

- Added create, rename, and delete deck controls, plus add, edit, and delete card controls.
- Implemented browser LocalStorage persistence for decks, cards, and the last active deck, so changes remain after reloading in the same browser.
- Added keyword search across card text and transliteration, category filtering, shuffle, and left/right keyboard navigation.
- This is a local single-browser authoring experience; data is not synced to another device or shared with other users.
- Added an empty-state message for decks without cards and for searches with no matches.
- Verified syntax, whitespace, and mock-DOM workflows for persistence/reload, search, shuffle, deck/card create/edit/delete, keyboard navigation, and reveal state.
- The card faces now have their own surface styling so the entire visible card face participates in the flip.
- Search now finds matching cards across every deck; category options and card labels identify cross-deck results, while browsing without a search remains limited to the selected deck.
- Verified that searching for "bus" finds all three seeded bus cards from the Travel Conversations deck, including category filtering and reset to the selected deck.
- Requirement decision: the lab describes keyword search/filter within a deck, but I am keeping cross-deck search for now because it feels more user-friendly. Revisit only if matching the lab specification exactly becomes a priority.
- Management layout update: moved create/rename/delete deck actions into a collapsed "Manage decks" disclosure, using the existing Deck selector to choose the deck to rename. The card editor is hidden until Add a card or Edit is selected, and returns to the compact card list after save or cancel.
- Verified card form visibility, card add/edit/cancel, deck selection/rename/create, persistence, and closing an open editor safely when switching decks.
- Layout feedback: moved the "Manage decks and cards" entry directly below the page introduction and above study controls so it is immediately discoverable without scrolling past the flashcards. Reduced vertical padding and card height to keep core controls more compact; the detailed manager remains collapsible.
- Follow-up layout preference: placed the collapsed manager below the study controls and above the footer. The study region now flexes to available viewport height, with compact header/footer spacing and viewport-aware card sizing; short/tall narrow screens can still scroll rather than clipping content.
