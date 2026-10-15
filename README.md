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




[ Application Core Engine ]
         │
         ├──► [ Malayalam Language Pack (JSON + Audio) ]  ── (Initial Launch)
         ├──► [ Spanish Language Pack (JSON + Audio) ]    ── (Future Release)
         └──► [ French Language Pack (JSON + Audio) ]     ── (Future Release)



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


