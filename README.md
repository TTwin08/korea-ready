# 🇰🇷 Korea Ready

> **Korea Readiness Training Platform**  
> ကိုရီးယားသွား မြန်မာလူငယ်များအတွက် ဘာသာစကား + Survival Training App

**Live Site:** https://ttwin08.github.io/korea-ready/

---

## 📖 About

Korea Ready is a self-paced Korean language readiness platform designed for Myanmar youth preparing to study or work in South Korea.

Focus areas:
- Practical Korean for daily survival
- Workplace and classroom situations
- Cultural awareness
- Romanization-first pronunciation guidance
- Burmese-language explanations

The platform is **content-driven**: every mission is a JSON file, and the application renders missions dynamically from a manifest (`missions/index.json`).

---

## 🌐 Live Site

```
https://ttwin08.github.io/korea-ready/
```

Hosted on **GitHub Pages**.

---

## 📚 Mission Tracks

The platform currently contains **38 missions** across **4 tracks**:

| Track | Count | Focus |
|-------|-------|-------|
| **Level 0 (Beginner)** | 12 | Hangul, pronunciation, numbers, phrases, basic grammar, polite speech |
| **Common (Daily)** | 11 | Survival Korean — food, health, bank, phone, housing, transport, emergency, police, plus bridge concepts |
| **Work (Industry)** | 11 | Factory, agriculture, construction, restaurant, fishery, cleaning, contract, safety, salary, exam prep |
| **Study (University)** | 4 | Campus, classroom, friendship, TOPIK I reading |

### Level 0 — 12 Missions

| # | Mission ID | Topic |
|---|-----------|-------|
| 1 | LEVEL0-HANGUL-001 | Hangul Vowels |
| 2 | LEVEL0-HANGUL-002 | Hangul Consonants |
| 3 | LEVEL0-HANGUL-003 | Syllable Blocks |
| 4 | LEVEL0-HANGUL-004 | 받침 (Final Consonants) |
| 5 | LEVEL0-PRONUN-001 | Basic Pronunciation |
| 6 | LEVEL0-NUMBER-001 | Native Korean Numbers |
| 7 | LEVEL0-NUMBER-002 | Sino-Korean Numbers |
| 8 | LEVEL0-PHRASE-001 | Basic Greetings |
| 9 | LEVEL0-PHRASE-002 | Yes / No |
| 10 | LEVEL0-PHRASE-003 | Self-Introduction |
| 11 | LEVEL0-GRAMMAR-001 | Basic Grammar -이다 |
| 12 | LEVEL0-POLITE-001 | 존댓말 vs 반말 |

### Common Track (11 missions)

`COMMON-SURV-007`, `COMMON-SAFETY-001`, `COMMON-HEALTH-001`, `COMMON-BANK-001`, `COMMON-PHONE-001`, `COMMON-HOUSING-001`, `COMMON-TRANSPORT-001`, `COMMON-EMERGENCY-001`, `COMMON-POLICE-001`, `BRIDGE-PARTTIME-001`, `BRIDGE-MOVE-001`

### Work Track (11 missions)

`WORK-FACTORY-001`, `WORK-AGRICULTURE-001`, `WORK-CONSTRUCTION-001`, `WORK-RESTAURANT-001`, `WORK-FISHERY-001`, `WORK-CLEANING-001`, `WORK-CONTRACT-001`, `WORK-SAFETY-001`, `WORK-SALARY-001`, `EXAM-INTERVIEW-001`, `EXAM-PREP-001`

### Study Track (4 missions)

`STUDY-UNIVERSITY-001`, `STUDY-CLASSROOM-001`, `STUDY-FRIEND-001`, `EXAM-TOPIK-001`

---

## 🛠 Tech Stack

- **HTML + CSS + Vanilla JavaScript** — no framework, no build step
- **JSON-driven content** — missions defined as schema-conformant files
- **SpeechSynthesis (TTS)** — browser-native Korean audio (no audio files)
- **GitHub Pages** — static hosting
- **localStorage** — client-side progress tracking

---

## 📁 Project Structure

```
korea-ready/
├── index.html                    ← entry point
├── app.js                        ← main app logic
├── loader.js                     ← loads manifest + mission files
├── validator.js                  ← schema validation
├── engine.js                     ← mission execution engine
├── renderer.js                   ← UI rendering per activity type
├── audio.js                      ← TTS integration
├── progress.js                   ← localStorage progress tracking
├── style.css                     ← global styles
├── README.md
├── LICENSE
└── missions/                     ← mission JSON files + manifest
    ├── index.json                ← mission manifest (38 entries)
    ├── LEVEL0-HANGUL-001.json
    ├── LEVEL0-HANGUL-002.json
    ├── ...
    └── EXAM-PREP-001.json
```

---

## 🧩 Mission Schema (v1.0.1)

Every mission JSON follows **Mission Schema v1.0.1**. Key fields:

```json
{
  "schema_version": "1.0",
  "mission_id": "TAG-TOPIC-NNN",
  "goal": "common | work | study",
  "level": 0 | 1 | 2,
  "category": "daily | work | exam",
  "industry": null,
  "tags": [],
  "title": { "my": "...", "ko": "...", "en": "..." },
  "objective": { "my": "...", "ko": "...", "en": "..." },
  "prerequisites": [],
  "skills": [],
  "estimated_minutes": 10,
  "difficulty": "intro | intermediate",
  "regulated": false,
  "status": "draft",
  "version": 1,
  "dialogue": { "setting": {}, "speakers": [], "lines": [] },
  "activities": [],
  "feedback": {},
  "cultural_note": { "title": {}, "body": {}, "sensitive": false },
  "audio": { "tts_lang": "ko-KR", "files": [] },
  "srs": { "enabled": true, "cards": [] },
  "assessment": { "type": "mission", "pass_threshold": 70, "weights": {} }
}
```

### Activity Types (4 — LOCKED)

| Type | Purpose | Required Fields |
|------|---------|-----------------|
| `branch_dialogue` | Interactive dialogue with choices | `entry_node`, `nodes{}` with `choices[]` |
| `listen_choose` | Listen to TTS, choose correct option | `prompt{my,ko,en}`, `options[]` with `correct: bool` |
| `speak` | Self-assessment speaking practice | `prompt{}`, `target_ko`, `target_romanization` |
| `type_answer` | Type the Korean answer | `prompt{}`, `answer`, `accept_alt[]` |

### Romanization Rule

- Romanization is the **primary pronunciation guide**
- Burmese glosses are **approximate references only**
- Korean dialogue lines include a `rom` field

---

## ➕ Adding a New Mission

1. **Create the JSON file** following Mission Schema v1.0.1:
   ```
   missions/YOUR-MISSION-ID.json
   ```

2. **Add an entry to `missions/index.json`** (single-line format):
   ```json
   {"mission_id":"YOUR-MISSION-ID","goal":"common","level":2,"title":{"my":"...","ko":"...","en":"..."},"estimated_minutes":10}
   ```

3. **Commit to `main`** branch.

4. **Bump the cache-buster** in your browser URL:
   ```
   https://ttwin08.github.io/korea-ready/?v=N
   ```

### Rules

- Use **only** the 4 allowed activity types
- **Do not** modify engine files for content work
- **Do not** invent new schema fields without approval
- Level 0 missions must **never** appear in the Common list
- `prerequisites` is **learning-order only** — not a hard engine gate

---

## 🏷 Version History

| Version | Scope | Status |
|---------|-------|--------|
| **v0.1** | Initial proof-of-concept | 🔒 FROZEN |
| **v0.2** | Level 0 complete (12 missions) | 🔒 FROZEN |
| **v0.3** | Content expansion — 38 missions across 4 tracks | 🔒 FROZEN |

**Frozen artifacts:**
- Mission Schema v1.0.1
- Architecture Lock v1.1
- Level 0 Scope Lock v1.1
- Engine files (no modifications)

---

## 🚧 Current Limitations (v0.3)

The following features are **NOT** implemented in the current version:

- ❌ **SRS (Spaced Repetition System)** — flashcard data exists in JSON but no review engine
- ❌ **Cloud progress sync** — progress is stored locally per browser
- ❌ **Pronunciation scoring** — `speak` activities are self-assessment only
- ❌ **Offline / PWA mode** — requires internet access
- ❌ **Real audio files** — relies on browser TTS (Chrome recommended)
- ❌ **Exam-only or Bridge-only UI paths** — those missions appear under Study / Common
- ❌ **UI language toggle** — interface is English-only
- ❌ **Search / filter across missions**

### Known Issues

1. **Cache-buster required** — after each content update, users must use `?v=N` or clear cache
2. **TTS dependency** — Korean voice must be available on the device (Chrome on Android works well)
3. **`listen_choose` naming** — technically a "TTS + choose" activity, not audio playback
4. **`LEVEL0-*` and `EXAM-*` IDs** — don't match the strict schema regex, but the validator doesn't enforce it
5. **Bridge missions merged into Common** — no dedicated Bridge UI path exists

---

## 🔒 Frozen Contracts

The following are treated as **frozen** by project convention and should not be changed without explicit Product Owner approval:

- **Mission Schema v1.0.1** — as documented in mission JSON files
- **Architecture Lock v1.1** — engine files should not be modified for content work
- **Level 0 Scope Lock v1.1** — Level 0 missions must not appear in Common list

**Engine files (frozen):**
`app.js`, `loader.js`, `validator.js`, `engine.js`, `renderer.js`, `audio.js`, `progress.js`

---

## 🧪 Testing Status

**Partial manual testing only.** No automated test suite exists as of v0.3.

During development, selected missions were manually verified in Chrome on Android for the following:

- ✅ Mission list rendering
- ✅ Dialogue / `listen_choose` / `type_answer` / `speak` activity rendering (tested on selected missions)
- ✅ TTS Play button triggers Korean audio (Chrome on Android)
- ✅ Progress tracking persists across page reloads
- ✅ Dashboard displays completed / total count
- ✅ Level 0 missions excluded from Common list

**Not verified:**
- ❌ All 38 missions rendering end-to-end
- ❌ Cross-browser compatibility (Firefox, Safari, Samsung Internet)
- ❌ iOS device behavior
- ❌ Edge cases (empty input, rapid taps, etc.)

---

## 🤝 Contributing

Content contributions are welcome. Before submitting:

1. Follow Mission Schema v1.0.1 exactly
2. Use only the 4 allowed activity types
3. Include Romanization for all Korean text
4. Do not modify engine files
5. Do not add new schema fields

---

## 📄 License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for the full text.

---

## 🙏 Acknowledgments

Built for Myanmar youth preparing to live and work in South Korea.

---

**Status:** ✅ v0.3 FROZEN — 38 missions live
