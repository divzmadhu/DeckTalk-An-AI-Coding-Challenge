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

- **Deck and card operations:** Create, rename, and delete decks; add, edit, and delete cards. The app prevents deleting the last remaining deck. Manage Decks and Manage Cards open from the header Menu; card management opens the selected deck's card list, with Add a card on that screen.
- **Browser-local persistence:** Decks, cards, and the last active deck are saved in LocalStorage and remain after reloading in the same browser. Data is not synced to other browsers or devices.
- **Search and study controls:** Search card text and transliteration across all decks, filter by category, shuffle, and navigate with Previous/Next. Without a search query, browsing stays within the selected deck. Empty decks and searches with no matches show a helpful message.
- **Search behavior decision:** The lab describes searching within a deck. Cross-deck search is retained as a deliberate usability choice; when searching, results identify their deck.
- **Verification:** Checked persistence/reload, search and category filtering, shuffle, navigation, reveal state, and deck/card create, rename, edit, and delete flows.

### Step 10: Interface, responsive layout, and accessibility

- **Navigation and help:** Put Manage Decks, Manage Cards, and Help & About in the top-right Menu. Management opens as a separate view with a Home action; Help & About explains study controls and browser-local data storage.
- **Study interface:** Added compact, labeled deck/category selectors and a search field. Previous and Next use matching neutral styles and directional arrows; Next has a concise label. The header groups DeckTalk with its travel-language tagline.
- **Management layout:** The manager uses a narrower, content-sized panel. The card list has its own responsive scroll area; card rows distinguish the English prompt, Malayalam translation, and category, with grouped Edit/Delete actions.
- **Responsive behavior:** Added small-screen and short-viewport layout rules for the study toolbar, flashcard, management views, and controls. Verified the card-management view at desktop and mobile sizes.
- **Accessibility:** Use semantic buttons, navigation, sections, labeled form controls, visible keyboard focus, and live status messages. Arrow keys navigate cards when focus is not on another interactive control. Management actions restore focus after form and list updates; card actions and Malayalam text include screen-reader-oriented labels and language metadata.
- **Verification:** Checked keyboard navigation, menu and dialog focus behavior, management workflows, unique IDs, form labels, ARIA references, and HTML/JavaScript CSS-class usage. `node --check app.js` and `git diff --check` passed.
