// Studentské procvičování navíc: kartičky, přehled časů a filmová inspirace.
// Stav profilů a navigaci poskytuje student-app.js.
const practiceUi = {
  wordFilter: 'all',
  wordQuery: '',
  direction: 'en-cs',
  flippedWords: new Set(),
  shuffledIds: [],
  tenseGroup: 'basics',
  retryQuestions: new Set(),
  mediaFilter: 'all',
};

const mediaLevels = [
  { id: 'easy', label: 'Lehké', caption: 'Známé situace a opora v obrazu', number: '01' },
  { id: 'medium', label: 'Střední', caption: 'Více přirozené řeči a narážek', number: '02' },
  { id: 'hard', label: 'Těžké', caption: 'Rychlé dialogy a přesnější slovní zásoba', number: '03' },
];

function getExtraPractice() {
  return PracticeModel.getProgress(getStudentRecords());
}

function getExtraSummary() {
  return PracticeModel.summarize(getExtraPractice(), vocabularyCategories, tenseTopics);
}

function renderVocabulary() {
  const category =
    vocabularyCategories.find((item) => item.id === route.id) || vocabularyCategories[0];
  const summary = getExtraSummary();
  query('#main').innerHTML = /* HTML */ `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CO CHCI PROCVIČIT / SLOVÍČKA</div>
        <h1 style="margin-top:10px">Malé papírky. Velká zásoba slov.</h1>
        <p>Nejdřív si zkus vzpomenout. Otoč kartičku a použij slovo ve vlastní větě.</p>
      </div>
      <span class="badge">${summary.knownWords} / ${summary.wordCount} OZNAČENO „UMÍM“</span>
    </div>
    <div class="category-tabs" role="group" aria-label="Zaměření slovíček">
      ${vocabularyCategories
        .map(
          (item) => /* HTML */ `
            <button
              class="category-tab ${category.id === item.id ? 'active' : ''}"
              data-word-category="${item.id}"
              aria-pressed="${category.id === item.id}"
            >
              <span class="category-dot" style="background:${item.color}" aria-hidden="true"></span>
              ${item.label}<small>${item.words.length}</small>
            </button>
          `,
        )
        .join('')}
    </div>
    <section class="word-desk" style="--paper-tint:${category.color}">
      <div class="section-head">
        <div>
          <h2>${category.label}</h2>
          <p>${category.description}</p>
        </div>
        <button class="button secondary" id="shuffle-words">Promíchat kartičky ↔</button>
      </div>
      <div class="word-controls">
        <div class="filters" role="group" aria-label="Stav slovíček">
          ${[
            ['all', 'Všechna'],
            ['learning', 'Ještě procvičit'],
            ['known', 'Umím'],
          ]
            .map(
              ([id, label]) => /* HTML */ `
                <button
                  class="filter ${practiceUi.wordFilter === id ? 'active' : ''}"
                  data-word-filter="${id}"
                  aria-pressed="${practiceUi.wordFilter === id}"
                >
                  ${label}
                </button>
              `,
            )
            .join('')}
        </div>
        <label class="sr-only" for="word-search">Hledat v této kategorii</label>
        <input
          class="search-input"
          id="word-search"
          type="search"
          placeholder="Hledat v této kategorii…"
          value="${escapeHtml(practiceUi.wordQuery)}"
        />
        <label class="sr-only" for="word-direction">Směr procvičování</label>
        <select class="topic-select" id="word-direction">
          <option value="en-cs" ${practiceUi.direction === 'en-cs' ? 'selected' : ''}>
            Anglicky → česky
          </option>
          <option value="cs-en" ${practiceUi.direction === 'cs-en' ? 'selected' : ''}>
            Česky → anglicky
          </option>
        </select>
      </div>
      <div id="vocabulary-cards" class="vocabulary-grid"></div>
      <p class="table-note">
        „Umím“ je tvoje vlastní hodnocení. Kartičku si můžeš kdykoli vrátit k procvičení.
      </p>
    </section>
  `;
  bindClicks('[data-word-category]', (button) => {
    practiceUi.wordQuery = '';
    practiceUi.shuffledIds = [];
    navigateTo(`#slovicka/${button.dataset.wordCategory}`);
  });
  bindClicks('[data-word-filter]', (button) => {
    practiceUi.wordFilter = button.dataset.wordFilter;
    renderVocabulary();
  });
  query('#word-search').oninput = (event) => {
    practiceUi.wordQuery = event.target.value;
    renderVocabularyCards();
  };
  query('#word-direction').onchange = (event) => {
    practiceUi.direction = event.target.value;
    practiceUi.flippedWords.clear();
    renderVocabularyCards();
  };
  query('#shuffle-words').onclick = () => {
    const ids = category.words.map((word) => word.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    practiceUi.shuffledIds = ids;
    renderVocabularyCards();
  };
  renderVocabularyCards();
}

function renderVocabularyCards() {
  const category =
    vocabularyCategories.find((item) => item.id === route.id) || vocabularyCategories[0];
  const progress = getExtraPractice();
  let words = category.words.filter((word) => {
    const known = progress.vocabulary[word.id]?.status === 'known';
    const matchesFilter =
      practiceUi.wordFilter === 'all' || (practiceUi.wordFilter === 'known' ? known : !known);
    return (
      matchesFilter && matchesSearchQuery(`${word.english} ${word.czech}`, practiceUi.wordQuery)
    );
  });
  if (practiceUi.shuffledIds.length) {
    words = [...words].sort(
      (a, b) => practiceUi.shuffledIds.indexOf(a.id) - practiceUi.shuffledIds.indexOf(b.id),
    );
  }
  query('#vocabulary-cards').innerHTML = words.length
    ? words
        .map((word) => {
          const flipped = practiceUi.flippedWords.has(word.id);
          const status = progress.vocabulary[word.id]?.status;
          const front = practiceUi.direction === 'en-cs' ? word.english : word.czech;
          const back = practiceUi.direction === 'en-cs' ? word.czech : word.english;
          return /* HTML */ `
            <article class="vocabulary-note ${status === 'known' ? 'is-known' : ''}">
              <button
                class="flashcard ${flipped ? 'is-flipped' : ''}"
                data-flip-word="${word.id}"
                aria-pressed="${flipped}"
                aria-label="Otočit kartičku: ${escapeHtml(flipped ? back : front)}"
              >
                <span class="flashcard-inner">
                  <span
                    class="flashcard-face flashcard-front"
                    id="word-front-${word.id}"
                    aria-hidden="${flipped}"
                  >
                    <span class="paper-tape" aria-hidden="true"></span>
                    <span class="paper-top"
                      ><span>${practiceUi.direction === 'en-cs' ? 'ENGLISH' : 'ČESKY'}</span
                      ><span
                        >${String(category.words.indexOf(word) + 1).padStart(2, '0')}</span
                      ></span
                    >
                    <span
                      class="paper-word"
                      lang="${practiceUi.direction === 'en-cs' ? 'en' : 'cs'}"
                      >${escapeHtml(front)}</span
                    >
                    <span class="paper-bottom"
                      >Vybavíš si význam? <span aria-hidden="true">↶</span></span
                    >
                  </span>
                  <span
                    class="flashcard-face flashcard-back"
                    id="word-back-${word.id}"
                    aria-hidden="${!flipped}"
                  >
                    <span class="paper-top"
                      ><span>${practiceUi.direction === 'en-cs' ? 'VÝZNAM' : 'ENGLISH'}</span
                      ><span aria-hidden="true">↶</span></span
                    >
                    <span class="paper-answer">${escapeHtml(back)}</span>
                    <span class="paper-example" lang="en">${escapeHtml(word.example)}</span>
                    <span class="paper-translation">${escapeHtml(word.translation)}</span>
                  </span>
                </span>
              </button>
              <div
                class="word-assessment"
                role="group"
                aria-label="Vlastní hodnocení: ${escapeHtml(word.english)}"
              >
                <button
                  id="learn-word-${word.id}"
                  data-learn-word="${word.id}"
                  class="${status === 'learning' ? 'selected' : ''}"
                  ${!flipped ? 'disabled' : ''}
                  aria-pressed="${status === 'learning'}"
                >
                  Ještě procvičit
                </button>
                <button
                  id="know-word-${word.id}"
                  data-know-word="${word.id}"
                  class="${status === 'known' ? 'selected' : ''}"
                  ${!flipped ? 'disabled' : ''}
                  aria-pressed="${status === 'known'}"
                >
                  Umím ✓
                </button>
              </div>
            </article>
          `;
        })
        .join('')
    : '<div class="practice-empty">Tady už žádné kartičky nezbývají. Změň filtr nebo hledaný výraz.</div>';
  bindClicks('[data-flip-word]', (button) => {
    const id = button.dataset.flipWord;
    if (practiceUi.flippedWords.has(id)) practiceUi.flippedWords.delete(id);
    else practiceUi.flippedWords.add(id);
    // Zachováme element, aby CSS mohlo plynule otočit obě strany papírku.
    const flipped = practiceUi.flippedWords.has(id);
    const word = category.words.find((item) => item.id === id);
    const front = practiceUi.direction === 'en-cs' ? word.english : word.czech;
    const back = practiceUi.direction === 'en-cs' ? word.czech : word.english;
    button.classList.toggle('is-flipped', flipped);
    button.setAttribute('aria-pressed', String(flipped));
    button.setAttribute('aria-label', `Otočit kartičku: ${flipped ? back : front}`);
    query(`#word-front-${id}`).setAttribute('aria-hidden', String(flipped));
    query(`#word-back-${id}`).setAttribute('aria-hidden', String(!flipped));
    query(`#learn-word-${id}`).disabled = !flipped;
    query(`#know-word-${id}`).disabled = !flipped;
  });
  const mark = (id, status) => {
    if (!practiceUi.flippedWords.has(id)) return;
    PracticeModel.markWord(getExtraPractice(), id, status);
    saveProgress();
    renderVocabulary();
  };
  bindClicks('[data-learn-word]', (button) => mark(button.dataset.learnWord, 'learning'));
  bindClicks('[data-know-word]', (button) => mark(button.dataset.knowWord, 'known'));
}

function renderTenses() {
  const selected = tenseTopics.find((topic) => topic.id === route.id);
  query('#main').innerHTML = /* HTML */ `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CO CHCI PROCVIČIT / ČASY</div>
        <h1 style="margin-top:10px">Vím, kdy to říct.</h1>
        <p>Vyber si konstrukci. Pochop její smysl a zkus dvě krátké otázky.</p>
      </div>
      <span class="badge">13 KONSTRUKCÍ · 26 OTÁZEK</span>
    </div>
    <div class="tense-layout">
      <aside class="tense-browser">
        <div class="filters" role="group" aria-label="Obtížnost časů">
          ${[
            ['basics', 'Základy'],
            ['next', 'Další krok'],
            ['advanced', 'Pokročilé'],
            ['all', 'Vše'],
          ]
            .map(
              ([id, label]) => /* HTML */ `
                <button
                  class="filter ${practiceUi.tenseGroup === id ? 'active' : ''}"
                  data-tense-group="${id}"
                  aria-pressed="${practiceUi.tenseGroup === id}"
                >
                  ${label}
                </button>
              `,
            )
            .join('')}
        </div>
        <div class="tense-topic-list">
          ${tenseTopics
            .filter(
              (topic) => practiceUi.tenseGroup === 'all' || topic.group === practiceUi.tenseGroup,
            )
            .map(
              (topic) => /* HTML */ `
                <button
                  class="tense-topic ${selected?.id === topic.id ? 'selected' : ''}"
                  data-tense="${topic.id}"
                  aria-pressed="${selected?.id === topic.id}"
                >
                  <span>${topic.title}</span><small>${topic.english}</small>
                </button>
              `,
            )
            .join('')}
        </div>
        <p class="table-note">Začni základy. Pokročilé konstrukce můžeš nechat na později.</p>
      </aside>
      <div id="tense-content" class="tense-content"></div>
    </div>
  `;
  bindClicks('[data-tense-group]', (button) => {
    practiceUi.tenseGroup = button.dataset.tenseGroup;
    const first = tenseTopics.find(
      (topic) => practiceUi.tenseGroup === 'all' || topic.group === practiceUi.tenseGroup,
    );
    if (!selected || (practiceUi.tenseGroup !== 'all' && selected.group !== practiceUi.tenseGroup))
      navigateTo(`#casy/${first.id}`);
    else renderTenses();
  });
  bindClicks('[data-tense]', (button) => navigateTo(`#casy/${button.dataset.tense}`));
  renderTenseContent(selected || tenseTopics[0]);
}

function renderTenseContent(topic) {
  const progress = getExtraPractice();
  query('#tense-content').innerHTML = /* HTML */ `
    <section class="panel tense-explainer">
      <div class="eyebrow">${topic.english}</div>
      <h2>${topic.title}</h2>
      <p>${topic.when}</p>
      <div class="tense-pattern">
        <small>JAK TO POSKLÁDÁŠ</small><strong>${escapeHtml(topic.pattern)}</strong>
      </div>
      <div class="phrase">
        <strong lang="en">${topic.example}</strong><small>${topic.translation}</small>
      </div>
    </section>
    <div class="section-head">
      <div>
        <h2>Teď to zkus ty.</h2>
        <p>Všechny otázky tady procvičují: ${topic.title.toLowerCase()}.</p>
      </div>
    </div>
    ${topic.questions
      .map((question, index) => {
        const key = `${activeStudentId}:${topic.id}:${index}`;
        const result = progress.tenses[topic.id]?.[index];
        const answered = result?.attempts > 0 && !practiceUi.retryQuestions.has(key);
        return /* HTML */ `
          <section class="panel tense-question">
            <span class="eyebrow">OTÁZKA ${index + 1} / ${topic.questions.length}</span>
            <h3 lang="en">${escapeHtml(question.sentence)}</h3>
            <p class="muted">${question.translation}</p>
            <div class="tense-options" role="group" aria-label="Odpovědi k otázce ${index + 1}">
              ${question.options
                .map(
                  (option, choice) => /* HTML */ `
                    <button
                      class="tense-option ${answered && choice === question.answer
                        ? 'is-correct'
                        : ''} ${answered && choice === result.lastChoice && !result.lastCorrect
                        ? 'is-wrong'
                        : ''}"
                      data-tense-choice="${index}:${choice}"
                      ${answered ? 'disabled' : ''}
                    >
                      <span>${String.fromCharCode(65 + choice)}</span>${escapeHtml(option)}
                    </button>
                  `,
                )
                .join('')}
            </div>
            ${answered
              ? /* HTML */ `
                  <div class="feedback ${result.lastCorrect ? 'good' : 'bad'}" role="status">
                    <b
                      >${result.lastCorrect
                        ? '✓ Správně.'
                        : `Správně je: ${escapeHtml(question.options[question.answer])}.`}</b
                    >
                    ${question.explanation}
                  </div>
                  <button class="text-link" data-retry-tense="${index}">
                    Zkusit otázku znovu ↶
                  </button>
                `
              : ''}
          </section>
        `;
      })
      .join('')}
    <aside class="teaching-tip">
      <span>✧</span>
      <div>
        <b>Od doplňování k vlastní větě.</b>
        <p>
          Řekni jednu pravdivou větu o sobě ve stejném tvaru. Lektor ti pomůže ověřit, že sedí i
          její význam.
        </p>
      </div>
    </aside>
  `;
  bindClicks('[data-tense-choice]', (button) => {
    const [index, choice] = button.dataset.tenseChoice.split(':').map(Number);
    const key = `${activeStudentId}:${topic.id}:${index}`;
    if (
      getExtraPractice().tenses[topic.id]?.[index]?.attempts > 0 &&
      !practiceUi.retryQuestions.has(key)
    )
      return;
    PracticeModel.submitTenseAnswer(
      getExtraPractice(),
      topic.id,
      index,
      topic.questions[index],
      choice,
    );
    practiceUi.retryQuestions.delete(key);
    saveProgress();
    renderTenseContent(topic);
  });
  bindClicks('[data-retry-tense]', (button) => {
    practiceUi.retryQuestions.add(`${activeStudentId}:${topic.id}:${button.dataset.retryTense}`);
    renderTenseContent(topic);
  });
}

function renderMedia() {
  const watchlist = getExtraPractice().watchlist;
  query('#main').innerHTML = /* HTML */ `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CO CHCI PROCVIČIT / FILMY A SERIÁLY</div>
        <h1 style="margin-top:10px">Ještě jednu scénu.</h1>
        <p>Oblíbený příběh, anglický zvuk a pár minut soustředěného poslechu.</p>
      </div>
      <span class="badge">9 TIPŮ NA VEČER</span>
    </div>
    <section class="screening-note">
      <div class="screening-icon" aria-hidden="true">▶</div>
      <div>
        <h2>Nejdřív jedna scéna, ne celý film.</h2>
        <p>
          Pusť si 2–5 minut s anglickými titulky. Zapiš dvě užitečné fráze a úsek si zopakuj.
          Nakonec řekni vlastními slovy, co se stalo.
        </p>
      </div>
    </section>
    <div class="media-toolbar">
      <div class="filters" role="group" aria-label="Obtížnost filmů a seriálů">
        ${[
          ['all', 'Všechno'],
          ...mediaLevels.map((level) => [level.id, level.label]),
          ['saved', 'Moje tipy'],
        ]
          .map(
            ([id, label]) => /* HTML */ `
              <button
                class="filter ${practiceUi.mediaFilter === id ? 'active' : ''}"
                data-media-filter="${id}"
                aria-pressed="${practiceUi.mediaFilter === id}"
              >
                ${label}
              </button>
            `,
          )
          .join('')}
      </div>
      <span>${Object.values(watchlist).filter(Boolean).length} uložených tipů</span>
    </div>
    <p class="media-level-note">
      Obtížnost je orientační v rámci této nabídky. „Lehké“ neznamená angličtinu od nuly; Přátelé
      mají i rychlé vtipy a slang.
    </p>
    <div class="media-sections">
      ${mediaLevels
        .map((level) => {
          const items = mediaRecommendations.filter(
            (item) =>
              item.difficulty === level.id &&
              (practiceUi.mediaFilter === 'all' ||
                practiceUi.mediaFilter === level.id ||
                (practiceUi.mediaFilter === 'saved' && watchlist[item.id])),
          );
          if (!items.length) return '';
          return /* HTML */ `
            <section class="media-section">
              <div class="media-section-title">
                <span class="level-number">${level.number}</span>
                <div>
                  <h2>${level.label}</h2>
                  <p>${level.caption}</p>
                </div>
                <span>${items.length} ${items.length === 1 ? 'tip' : 'tipy'}</span>
              </div>
              <div class="media-grid">
                ${items.map((item) => renderMediaCard(item, level, watchlist[item.id])).join('')}
              </div>
            </section>
          `;
        })
        .join('')}
      ${practiceUi.mediaFilter === 'saved' && !Object.values(watchlist).some(Boolean)
        ? '<div class="practice-empty">Zatím nemáš nic uloženého. U titulu, který tě zaujme, klikni na malé +.</div>'
        : ''}
    </div>
    <p class="media-sources">
      Postup sledování vychází z tipů
      <a href="${mediaLearningSource}" target="_blank" rel="noopener noreferrer"
        >Cambridge English ↗</a
      >. Rozdělení titulů podle obtížnosti je náš lektorský odhad. Tady najdeš inspiraci a úkoly,
      samotné filmy se na této stránce nepřehrávají.
    </p>
  `;
  bindClicks('[data-media-filter]', (button) => {
    practiceUi.mediaFilter = button.dataset.mediaFilter;
    renderMedia();
  });
  bindClicks('[data-save-media]', (button) => {
    const id = button.dataset.saveMedia;
    const watchlist = getExtraPractice().watchlist;
    watchlist[id] = !watchlist[id];
    saveProgress();
    renderMedia();
  });
}

function renderMediaCard(item, level, saved) {
  return /* HTML */ `
    <article class="media-card">
      <div class="media-window-bar">
        <span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span
        ><span>WATCH & LEARN</span>
      </div>
      <div class="media-artwork">
        <img
          src="assets/media/${item.id}.svg"
          width="640"
          height="480"
          loading="lazy"
          decoding="async"
          alt="${item.motif}"
        />
        <span class="media-type">${item.type}</span>
        <button
          class="save-media ${saved ? 'saved' : ''}"
          data-save-media="${item.id}"
          aria-pressed="${!!saved}"
          aria-label="${saved ? 'Odebrat z mých tipů' : 'Uložit do mých tipů'}: ${item.title}"
          title="${saved ? 'Odebrat z mých tipů' : 'Uložit do mých tipů'}"
        >
          ${saved ? '✓' : '+'}
        </button>
      </div>
      <div class="media-card-body">
        <div class="media-meta">
          <span class="difficulty difficulty-${level.id}"
            ><span aria-hidden="true"
              >${level.id === 'easy' ? '■□□' : level.id === 'medium' ? '■■□' : '■■■'}</span
            >
            ${level.label}</span
          ><span>${item.accent}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="media-original" lang="en">${item.original}</p>
        <p class="media-why">${item.why}</p>
        <div class="media-tags">${item.focus.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <details class="media-task">
          <summary>Jak z toho udělat procvičování <span aria-hidden="true">↗</span></summary>
          <div>
            <b>Krátký úkol</b>
            <p>${item.task}</p>
            <b>Co může být těžší</b>
            <p>${item.challenge}</p>
            <b>Slova do začátku</b>
            <ul>
              ${item.words
                .map(([en, cs]) => `<li><strong lang="en">${en}</strong> <span>${cs}</span></li>`)
                .join('')}
            </ul>
            <a href="${item.source}" target="_blank" rel="noopener noreferrer"
              >Informace o titulu ↗</a
            >
          </div>
        </details>
      </div>
    </article>
  `;
}

function renderExtraProgressSummary() {
  const summary = getExtraSummary();
  return /* HTML */ `
    <section class="extra-progress panel">
      <div class="section-head">
        <div>
          <h2>Další procvičování</h2>
          <p>Slovíčka jsou vlastní hodnocení, časy jsou vyhodnocené odpovědi.</p>
        </div>
      </div>
      <div class="extra-progress-grid">
        <a href="#slovicka/home"
          ><span>▤</span><b>${summary.knownWords} / ${summary.wordCount}</b
          ><small>Slovíček označeno „umím“</small></a
        >
        <a href="#casy/present-simple"
          ><span>◷</span><b>${summary.tenseSolved} / ${summary.tenseTotal}</b
          ><small>Otázek na časy správně</small></a
        >
        <a href="#filmy"
          ><span>▣</span
          ><b
            >${Object.values(getExtraPractice().watchlist).filter(Boolean).length} /
            ${mediaRecommendations.length}</b
          ><small>Uložených filmových tipů</small></a
        >
      </div>
    </section>
  `;
}

function renderTeacherExtraProgress() {
  const progress = getExtraPractice();
  const summary = getExtraSummary();
  const tenseRows = tenseTopics.map((topic) => {
    const results = topic.questions.map((_, index) => progress.tenses[topic.id]?.[index]);
    return {
      topic,
      results,
      attempted: results.filter((result) => result?.attempts > 0).length,
      first: results.filter((result) => result?.firstCorrect).length,
      solved: results.filter((result) => result?.independent).length,
    };
  });
  return /* HTML */ `
    ${renderExtraProgressSummary()}
    <section class="panel">
      <h3>Slovíčka podle zaměření</h3>
      <p class="table-note">
        Jde o vlastní hodnocení studentky po otočení kartičky, nikoli automatický test znalostí.
      </p>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Zaměření</th>
              <th>Umím</th>
              <th>Ještě procvičit</th>
              <th>Neoznačeno</th>
            </tr>
          </thead>
          <tbody>
            ${vocabularyCategories
              .map((category) => {
                const known = category.words.filter(
                  (word) => progress.vocabulary[word.id]?.status === 'known',
                ).length;
                const learning = category.words.filter(
                  (word) => progress.vocabulary[word.id]?.status === 'learning',
                ).length;
                return `<tr><td>${category.label}</td><td>${known} / ${category.words.length}</td><td>${learning}</td><td>${category.words.length - known - learning}</td></tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
    <section class="panel">
      <h3>Časy · výsledky malých kvízů</h3>
      <p class="table-note">
        ${summary.tenseAttempted} vyzkoušených otázek, ${summary.tenseFirstCorrect} správně
        napoprvé. Opakované správné odpovědi nezvyšují počet různých zvládnutých otázek.
      </p>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Konstrukce</th>
              <th>Vyzkoušeno</th>
              <th>Napoprvé</th>
              <th>Správně alespoň jednou</th>
              <th>Poslední odpovědi</th>
            </tr>
          </thead>
          <tbody>
            ${tenseRows
              .map(
                ({ topic, results, attempted, first, solved }) =>
                  `<tr><td>${topic.title}</td><td>${attempted} / ${topic.questions.length}</td><td>${first}</td><td>${solved} / ${topic.questions.length}</td><td>${
                    results
                      .filter(Boolean)
                      .sort((a, b) => b.lastAt.localeCompare(a.lastAt))
                      .map(
                        (result) =>
                          `${escapeHtml(result.lastAnswer)} (${result.lastCorrect ? 'správně' : 'chyba'})`,
                      )
                      .join(' · ') || '—'
                  }</td></tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}
