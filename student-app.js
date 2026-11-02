// Stav aplikace, místní ukládání, navigace a studentské obrazovky.
// Lektorské obrazovky jsou v teacher-views.js, výukový obsah v samostatných souborech.

const STORAGE_KEY = 'anglictina-po-svem-v1';

const query = (selector) => document.querySelector(selector);
const escapeHtml = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
const normalizeSearchText = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
let savedState = {};
try {
  const parsedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (parsedState && typeof parsedState === 'object' && !Array.isArray(parsedState)) {
    savedState = parsedState;
  }
} catch {
  // Poškozená uložená data nesmějí zabránit otevření webu. Začneme výchozím stavem.
}
if (!savedState.names || typeof savedState.names !== 'object')
  savedState.names = { one: 'Studentka 1', two: 'Studentka 2' };
if (!savedState.students || typeof savedState.students !== 'object') savedState.students = {};
let activeStudentId = ['one', 'two'].includes(savedState.selected) ? savedState.selected : 'one';
let route = {},
  lessonFilter = 'all',
  lessonDuration = 60,
  selectedGrammarId = 'be',
  grammarQuery = '',
  grammarSection = 'all',
  selectedVerbId = 'be',
  verbQuery = '';
let exerciseIndex = 0,
  selectedWordIds = [],
  shuffledWords = [],
  exerciseSolved = false,
  assisted = false,
  feedback = null,
  exerciseKey = '',
  toastTimer;
// Ukládání a práce s aktivním profilem

function getStudentRecords() {
  return (savedState.students[activeStudentId] ||= {});
}

function getLessonRecord(id) {
  return (getStudentRecords()[id] ||= { note: '', done: false });
}

function getStudentStats() {
  return Learning.summarize(getStudentRecords(), lessons);
}

function getCurrentLesson() {
  return lessons.find((l) => l.id === route.id) || lessons[0];
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
    return true;
  } catch {
    showToast('Ukládání není dostupné. Pokrok se po zavření stránky neuchová.');
    return false;
  }
}

function showToast(text) {
  query('#toast').textContent = text;
  query('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => query('#toast').classList.remove('show'), 3500);
}

function bindClicks(selector, action) {
  document.querySelectorAll(selector).forEach((el) => (el.onclick = () => action(el)));
}

function formatDateTime(s) {
  return s
    ? new Intl.DateTimeFormat('cs-CZ', {
        day: 'numeric',
        month: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(s))
    : 'Zatím neprocvičeno';
}
// Navigace pomocí URL za znakem #

function navigateTo(hash) {
  if (location.hash === hash) {
    readRoute();
    renderPage();
  } else location.hash = hash;
}

function openLesson(id, tab = 'learn') {
  navigateTo(`#tema/${id}/${tab}`);
}

function readRoute() {
  const [section, item, detail] = location.hash.slice(1).split('/');

  if (section === 'slovicka') {
    route = {
      page: 'vocabulary',
      id: vocabularyCategories.some((category) => category.id === item) ? item : 'home',
    };
    return;
  }

  if (section === 'casy') {
    const selected = tenseTopics.find((topic) => topic.id === item) || tenseTopics[0];
    if (practiceUi.tenseGroup !== 'all' && practiceUi.tenseGroup !== selected.group)
      practiceUi.tenseGroup = selected.group;
    route = { page: 'tenses', id: selected.id };
    return;
  }

  if (section === 'filmy') {
    route = { page: 'media' };
    return;
  }

  if (section === 'lektor') {
    const teacherTabs = ['vysledky', 'gramatika', 'tvary', 'priprava'];
    route = {
      page: 'teacher',
      tab: teacherTabs.includes(item) ? item : 'vysledky',
      id: lessons.some((lesson) => lesson.id === detail) ? detail : 'hello',
    };

    if (route.tab === 'gramatika' && grammarTopics.some((topic) => topic.id === detail)) {
      selectedGrammarId = detail;
      grammarQuery = '';
      grammarSection = 'all';
    }
    if (route.tab === 'tvary' && verbForms.some((verb) => verb[0] === detail)) {
      selectedVerbId = detail;
      verbQuery = '';
    }
    return;
  }

  if (section === 'tema' && lessons.some((lesson) => lesson.id === item)) {
    route = {
      page: 'lesson',
      id: item,
      tab: ['learn', 'exercise', 'talk'].includes(detail) ? detail : 'learn',
    };
    return;
  }

  if (section === 'cviceni') {
    route = {
      page: 'practice',
      id: lessons.some((lesson) => lesson.id === item) ? item : 'hello',
      tab: 'exercise',
    };
    return;
  }

  route = {
    page: section === 'pokrok' ? 'progress' : 'overview',
    id: 'hello',
    tab: 'learn',
  };
}

// Společné části obrazovky

function renderShell() {
  for (const o of query('#student').options)
    o.textContent = savedState.names[o.value] || `Studentka ${o.value === 'one' ? 1 : 2}`;
  query('#student').value = activeStudentId;
  query('.avatar').textContent =
    (savedState.names[activeStudentId] || 'S').trim().charAt(0).toUpperCase() || 'S';
  const teacher = route.page === 'teacher';
  document.body.classList.toggle('teacher-mode', teacher);
  query('#teacher-access').setAttribute('aria-pressed', String(teacher));
  query('#teacher-access').title = teacher ? 'Zpět ke studiu' : 'Pro lektora';
  const isPracticePage = ['vocabulary', 'practice', 'tenses', 'media'].includes(route.page);
  query('#practice-menu').classList.toggle('is-active', isPracticePage);
  if (isPracticePage) query('#practice-menu').open = true;
  document
    .querySelectorAll('[data-nav]')
    .forEach((b) =>
      b.classList.toggle(
        'active',
        b.dataset.nav === route.page || (route.page === 'lesson' && b.dataset.nav === 'overview'),
      ),
    );
  query('#crumb').textContent = teacher
    ? 'Pro lektora'
    : {
        overview: 'Moje témata',
        progress: 'Můj pokrok',
        practice: 'Procvičit věty',
        lesson: getCurrentLesson().title,
        vocabulary: 'Slovíčka',
        tenses: 'Časy',
        media: 'Filmy a seriály',
      }[route.page];
}

function renderPage() {
  renderShell();
  ({
    overview: renderOverview,
    lesson: renderLesson,
    practice: renderPractice,
    progress: renderProgress,
    teacher: renderTeacherPage,
    vocabulary: renderVocabulary,
    tenses: renderTenses,
    media: renderMedia,
  })[route.page]();
}

function bindLessonLinks() {
  bindClicks('[data-lesson]', (b) => openLesson(b.dataset.lesson));
}
// Studentský přehled témat

function renderOverview() {
  const { total, rows } = getStudentStats(),
    next =
      lessons.find((l) => rows.find((r) => r.id === l.id).independent < l.exercises.length) ||
      lessons[0];
  query('#main').innerHTML = /* HTML */ `<div class="page-heading">
      <div>
        <div class="eyebrow">
          AHOJ, ${escapeHtml(savedState.names[activeStudentId] || 'STUDENTKO')}
        </div>
        <h1 style="margin-top:9px">Angličtina, kterou opravdu použiješ.</h1>
        <p>Krátké vysvětlení. Pár vlastních vět. A pak už jen zkusit mluvit.</p>
      </div>
      <span class="badge">ZAČÍNÁME · A0–A1</span>
    </div>
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">PO KROCÍCH. PO SVÉM.</div>
        <h2>Od „nevím jak“<br />k prvnímu rozhovoru.</h2>
        <p>
          Nauč se představit, říct, co máš ráda, nebo si objednat kávu. Každé téma začíná jednou
          jednoduchou větou.
        </p>
        <button id="start" class="button primary">
          ${total.attempted ? 'Pokračovat ve studiu' : 'Zkusit první téma'} ↗
        </button>
      </div>
      <div class="hero-art" aria-label="I like music: kdo, sloveso, co">
        <span class="art-star">✳</span>
        <div class="art-caption">Nemusíš znát všechno, abys mohla začít.</div>
        <div class="sentence-card">
          <span class="word-block">I</span><span class="word-block">like</span
          ><span class="word-block">music.</span>
        </div>
        <div class="underwords"><span>KDO</span><span>SLOVESO</span><span>CO</span></div>
        <div class="mini-bubble">And you? ♡</div>
      </div>
    </section>
    <div class="stats">
      <div class="stat">
        <span class="stat-icon">▦</span>
        <div><b>8 témat ze života</b><small>Vyber, co se ti zrovna hodí</small></div>
      </div>
      <div class="stat">
        <span class="stat-icon">✓</span>
        <div>
          <b>${total.independent} z ${total.total} vět</b><small>Vyřešeno bez nápovědy</small>
        </div>
      </div>
      <div class="stat">
        <span class="stat-icon">↔</span>
        <div><b>Pochopit → zkusit → říct</b><small>Ve vlastním tempu</small></div>
      </div>
    </div>
    <section>
      <div class="section-head">
        <div>
          <h2>Co chceš umět říct?</h2>
          <p>Můžeš jít postupně nebo vybrat téma společně s lektorem.</p>
        </div>
        <div class="filters" role="group" aria-label="Filtrovat témata">
          ${[
            ['all', 'Všechna'],
            ['start', 'Na rozjezd'],
            ['daily', 'Běžný život'],
            ['situations', 'V situaci'],
          ]
            .map(
              ([id, label]) =>
                /* HTML */ `<button
                  class="filter ${lessonFilter === id ? 'active' : ''}"
                  data-filter="${id}"
                  aria-pressed="${lessonFilter === id}"
                >
                  ${label}
                </button>`,
            )
            .join('')}
        </div>
      </div>
      <div class="lesson-grid">
        ${lessons
          .map((l, i) => {
            if (lessonFilter !== 'all' && lessonFilter !== l.category) return '';
            const r = rows[i];
            return /* HTML */ `<button
              class="lesson-card"
              data-lesson="${l.id}"
              style="--tint:${l.tint};--tone:${l.tone}"
            >
              <div class="card-top">
                <span class="lesson-icon" aria-hidden="true">${l.icon}</span
                ><span class="card-number">${String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>${l.title}</h3>
              <p>${l.description}</p>
              <div class="card-meta">
                <span class="tag">${l.grammar}</span><span class="card-arrow">↗</span>
              </div>
              <div class="card-progress">
                <span>${r.independent} / ${r.total} vět bez nápovědy</span>
                <div class="progress-track">
                  <span style="width:${(r.independent / r.total) * 100}%"></span>
                </div>
              </div>
            </button>`;
          })
          .join('')}
      </div>
    </section>
    <aside class="teaching-tip">
      <span>✧</span>
      <div>
        <b>Věta je teprve začátek.</b>
        <p>Po cvičení zkus změnit jeden údaj. Místo I like music řekni, co máš ráda ty.</p>
      </div>
    </aside>`;
  query('#start').onclick = () => openLesson(next.id);
  bindLessonLinks();
  bindClicks('[data-filter]', (b) => {
    lessonFilter = b.dataset.filter;
    renderOverview();
  });
}

// Vysvětlení a konverzační část lekce

function renderLesson() {
  const l = getCurrentLesson(),
    { goal, explanation: explain, task, warning } = studentInstructions[l.id];
  query('#main').innerHTML = /* HTML */ `<button class="back" id="back">← Všechna témata</button>
    <div class="detail-top">
      <div>
        <div class="eyebrow">
          TÉMA ${String(lessons.indexOf(l) + 1).padStart(2, '0')} · ${l.grammar}
        </div>
        <h1>${l.title}</h1>
        <p>${goal}</p>
      </div>
    </div>
    <div class="tabs" role="tablist" aria-label="Části tématu">
      ${[
        ['learn', '1 · Pochopit'],
        ['exercise', '2 · Poskládat věty'],
        ['talk', '3 · Zkusit říct'],
      ]
        .map(
          ([id, label]) =>
            /* HTML */ `<button
              role="tab"
              class="tab ${route.tab === id ? 'active' : ''}"
              aria-selected="${route.tab === id}"
              aria-controls="lesson-content"
              id="lesson-tab-${id}"
              data-ltab="${id}"
            >
              ${label}
            </button>`,
        )
        .join('')}
    </div>
    <div id="lesson-content" role="tabpanel" aria-labelledby="lesson-tab-${route.tab}"></div>`;
  query('#back').onclick = () => navigateTo('#');
  bindClicks('[data-ltab]', (b) => openLesson(l.id, b.dataset.ltab));
  if (route.tab === 'learn') {
    query('#lesson-content').innerHTML = /* HTML */ `<div class="student-lesson-grid">
      <div>
        <section class="panel learn-panel">
          <div class="eyebrow">JEDEN VZOR DO ZAČÁTKU</div>
          <div class="pattern big-pattern">
            ${l.pattern.map((w) => /* HTML */ `<span>${w}</span>`).join('')}
          </div>
          <h2>Jak to funguje?</h2>
          <p>${explain}</p>
          <div class="student-reminder">
            <b>Malá věc, na kterou myslet</b>
            <p>${warning}</p>
          </div>
          <button class="button primary" id="try-exercise">Jdu to zkusit →</button>
        </section>
        <section class="panel">
          <h3>Teď o tobě</h3>
          <p>${task}</p>
        </section>
      </div>
      <aside class="panel">
        <h3>Věty do kapsy</h3>
        ${l.phrases
          .map(
            ([en, cs]) =>
              /* HTML */ `<div class="phrase">
                <strong lang="en">${en}</strong><small>${cs}</small>
              </div>`,
          )
          .join('')}
        <p class="muted" style="font-size:11px;margin-top:17px">
          Přečti je nahlas. Potom zkus říct vlastní variantu.
        </p>
      </aside>
    </div>`;
    query('#try-exercise').onclick = () => openLesson(l.id, 'exercise');
  } else if (route.tab === 'exercise') {
    ensureExercise();
    query('#lesson-content').innerHTML = '<div class="exercise-area" id="exercise"></div>';
    paintExercise();
  } else
    query('#lesson-content').innerHTML = /* HTML */ `<div class="conversation-grid">
      <section class="conversation-card">
        <div class="eyebrow">MALÝ ROZHOVOR</div>
        <h3>Zkus odpovědět bez čtení.</h3>
        <p>Nevadí, když potřebuješ čas. Vyber si nejprve dvě otázky.</p>
        <ul class="prompt-list">
          ${l.prompts.map((p) => /* HTML */ `<li lang="en">${p}</li>`).join('')}
        </ul>
        <p>${task}</p>
      </section>
      <section class="conversation-card">
        <div class="eyebrow">S LEKTOREM NEBO SPOLUŽAČKOU</div>
        <h3>Zahrajte si situaci</h3>
        <p>${l.role}</p>
        <div class="activity">
          <b>Ještě jedno kolo</b>
          <p>Vyměňte si role a změňte několik údajů. Nakonec zkuste mluvit bez napsaných vět.</p>
        </div>
        <p class="muted">Mluvení ti zkontroluje lektor. Tato stránka ho automaticky nehodnotí.</p>
      </section>
      <section class="conversation-card">
        <div class="eyebrow">NA PŘÍŠTĚ</div>
        <h3>Krátké domácí procvičení</h3>
        <p>${l.homework}</p>
      </section>
    </div>`;
}
// Skládání vět a vyhodnocování odpovědí

function ensureExercise() {
  const key = `${activeStudentId}:${getCurrentLesson().id}`;
  if (exerciseKey !== key) {
    exerciseIndex = 0;
    exerciseKey = key;
    resetExercise();
  }
}

function resetExercise() {
  selectedWordIds = [];
  exerciseSolved = false;
  assisted = false;
  feedback = null;
  const words = getCurrentLesson().exercises[exerciseIndex][1];
  shuffledWords = words.map((word, id) => ({ word, id }));
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }
  if (shuffledWords.every((w, i) => w.id === i)) shuffledWords.reverse();
}

function renderPractice() {
  ensureExercise();
  query('#main').innerHTML = /* HTML */ `<div class="page-heading">
      <div>
        <h1>Větu po větě.</h1>
        <p>Poskládej slova, přečti větu nahlas a pak zkus vlastní příklad.</p>
      </div>
      <span class="badge">32 VĚT ZE ŽIVOTA</span>
    </div>
    <div class="exercise-area">
      <div class="practice-heading">
        <label for="practice-topic">Co chceš procvičit?</label
        ><select class="topic-select" id="practice-topic">
          ${lessons
            .map(
              (l) =>
                /* HTML */ `<option value="${l.id}" ${l.id === route.id ? 'selected' : ''}>
                  ${l.title}
                </option>`,
            )
            .join('')}
        </select>
      </div>
      <div id="exercise"></div>
    </div>`;
  query('#practice-topic').onchange = (e) => navigateTo(`#cviceni/${e.target.value}`);
  paintExercise();
}

function paintExercise() {
  const l = getCurrentLesson(),
    [cs, words] = l.exercises[exerciseIndex],
    r = getLessonRecord(l.id).results?.[exerciseIndex];
  query('#exercise').innerHTML = /* HTML */ `<section class="exercise-card">
    <div class="exercise-progress">
      <span>Věta ${exerciseIndex + 1} ze ${l.exercises.length}</span>
      <div class="progress-track">
        <span
          style="width:${((exerciseIndex + (exerciseSolved ? 1 : 0)) / l.exercises.length) * 100}%"
        ></span>
      </div>
    </div>
    <h2>${cs}</h2>
    <p class="muted">Klikni na slova ve správném pořadí. Slovo ve větě můžeš kliknutím vrátit.</p>
    <div class="answer-zone" aria-label="Sestavená věta">
      ${selectedWordIds.length
        ? selectedWordIds
            .map(
              (id) =>
                /* HTML */ `<button
                  class="word"
                  data-remove="${id}"
                  ${exerciseSolved ? 'disabled' : ''}
                >
                  ${escapeHtml(words[id])}
                </button>`,
            )
            .join('')
        : '<span class="empty-answer">Tady vznikne tvoje věta…</span>'}
    </div>
    <div class="word-bank" aria-label="Nabídka slov">
      ${shuffledWords
        .map(
          ({ word, id }) =>
            /* HTML */ `<button
              class="word"
              data-word="${id}"
              ${selectedWordIds.includes(id) || exerciseSolved ? 'disabled' : ''}
            >
              ${escapeHtml(word)}
            </button>`,
        )
        .join('')}
    </div>
    <div id="feedback" role="status">
      ${feedback ? /* HTML */ `<div class="feedback ${feedback.kind}">${feedback.text}</div>` : ''}
    </div>
    <div class="exercise-actions">
      <button id="check" class="button primary" ${exerciseSolved ? 'disabled' : ''}>
        Zkontrolovat ✓</button
      ><button id="clear" class="button secondary">Zkusit znovu</button
      ><button id="hint" class="button secondary" ${exerciseSolved ? 'disabled' : ''}>
        Nápověda</button
      ><button id="next" class="button secondary">
        ${exerciseIndex === l.exercises.length - 1 ? 'Dokončit téma' : 'Další věta →'}
      </button>
    </div>
    ${exerciseSolved
      ? '<div class="say-it"><b>A teď bez kartiček.</b><p>Řekni větu nahlas a změň jeden údaj, aby byla o tobě.</p></div>'
      : ''}
    <div class="exercise-footnote">
      ${r?.independent
        ? '✓ Tuto větu už máš vyřešenou bez nápovědy.'
        : 'Odpověď s nápovědou se ve výsledcích označí. Nápověda je tu od toho, aby pomohla.'}
    </div>
  </section>`;
  bindClicks('[data-word]', (b) => {
    selectedWordIds.push(Number(b.dataset.word));
    feedback = null;
    paintExercise();
  });
  bindClicks('[data-remove]', (b) => {
    selectedWordIds = selectedWordIds.filter((id) => id !== Number(b.dataset.remove));
    feedback = null;
    paintExercise();
  });
  query('#clear').onclick = () => {
    resetExercise();
    paintExercise();
  };
  query('#hint').onclick = () => {
    assisted = true;
    Learning.result(getLessonRecord(l.id), exerciseIndex).hints++;
    saveProgress();
    const prefix = selectedWordIds.every((id, i) => words[id] === words[i]);
    feedback = {
      kind: 'hint',
      text:
        prefix && selectedWordIds.length < words.length
          ? /* HTML */ `Další slovo: <strong>${escapeHtml(words[selectedWordIds.length])}</strong>`
          : /* HTML */ `Vzor věty: <strong>${escapeHtml(words.join(' '))}</strong>`,
    };
    paintExercise();
  };
  query('#check').onclick = () => {
    if (exerciseSolved) return;
    const out = Learning.submit(
      getLessonRecord(l.id),
      exerciseIndex,
      words,
      selectedWordIds,
      assisted,
    );
    if (out.incomplete)
      feedback = {
        kind: 'bad',
        text: 'Nejdřív použij všechna slova. Tahle neúplná věta se nepočítá jako pokus.',
      };
    else {
      saveProgress();
      exerciseSolved = out.correct;
      feedback = out.correct
        ? {
            kind: 'good',
            text: assisted
              ? '✓ Správně s nápovědou. Za chvíli ji můžeš zkusit znovu sama.'
              : '✓ Přesně tak! Teď tu větu zkus říct vlastními slovy.',
          }
        : {
            kind: 'bad',
            text: 'Ještě uprav pořadí slov. Kliknutím vrať slovo zpět; můžeš se podívat na vysvětlení nebo použít nápovědu.',
          };
    }
    paintExercise();
  };
  query('#next').onclick = () => {
    if (exerciseIndex < l.exercises.length - 1) {
      exerciseIndex++;
      resetExercise();
      paintExercise();
    } else renderRoundSummary();
  };
}

function renderRoundSummary() {
  const l = getCurrentLesson(),
    r = getStudentStats().rows.find((r) => r.id === l.id);
  query('#exercise').innerHTML = /* HTML */ `<section class="panel round-end">
    <span class="celebration">✳</span>
    <h2>Malý krok je taky pokrok.</h2>
    <p>
      V tématu <b>${l.title}</b> máš vyzkoušené ${r.attempted} ze ${r.total} vět.<br />Bez nápovědy
      už máš vyřešené ${r.independent}.
    </p>
    <p class="muted">Přeskočené věty se nepočítají jako správné. Můžeš se k nim kdykoli vrátit.</p>
    <div class="actions">
      <button class="button primary" id="repeat">Projít věty znovu</button
      ><button class="button secondary" id="talk">Zkusit rozhovor ↗</button>
    </div>
  </section>`;
  query('#repeat').onclick = () => {
    exerciseIndex = 0;
    resetExercise();
    paintExercise();
  };
  query('#talk').onclick = () => openLesson(l.id, 'talk');
}
// Studentský přehled pokroku

function renderProgress() {
  const { total, rows } = getStudentStats();
  query('#main').innerHTML = /* HTML */ `<div class="page-heading">
      <div>
        <h1>Každá věta se počítá.</h1>
        <p>Tvůj pokrok · ${escapeHtml(savedState.names[activeStudentId])}</p>
      </div>
    </div>
    ${renderStatsCards(total)}
    <div class="progress-lessons">
      ${rows
        .map(
          (r, i) =>
            /* HTML */ `<button class="progress-lesson" data-lesson="${r.id}">
              <span
                class="lesson-icon"
                style="background:${lessons[i].tint};color:${lessons[i].tone}"
                >${lessons[i].icon}</span
              >
              <div>
                <b>${lessons[i].title}</b
                ><small>${r.independent} / ${r.total} vět bez nápovědy</small>
                <div class="progress-track">
                  <span style="width:${(r.independent / r.total) * 100}%"></span>
                </div>
              </div>
              <span>↗</span>
            </button>`,
        )
        .join('')}
    </div>
    ${renderExtraProgressSummary()}
    <aside class="teaching-tip">
      <span>♡</span>
      <div>
        <b>Správně poskládaná věta je dobrý začátek.</b>
        <p>
          Skutečné mluvení zkoušej s lektorem. Výsledky samy o sobě nehodnotí výslovnost ani vedení
          rozhovoru.
        </p>
      </div>
    </aside>`;
  bindLessonLinks();
}

function renderStatsCards(t) {
  return /* HTML */ `<div class="stats">
    <div class="stat">
      <span class="stat-icon">↔</span>
      <div>
        <b>${t.attempted} / ${t.total} vět vyzkoušeno</b
        ><small>${t.attempts} úplných odevzdaných odpovědí</small>
      </div>
    </div>
    <div class="stat">
      <span class="stat-icon">✓</span>
      <div>
        <b>${t.independent} vět bez nápovědy</b><small>Alespoň jednou správně samostatně</small>
      </div>
    </div>
    <div class="stat">
      <span class="stat-icon">✦</span>
      <div><b>${t.first} správně napoprvé</b><small>${t.hints} použití nápovědy</small></div>
    </div>
  </div>`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Zadání zkopírováno.');
  } catch {
    showToast('Kopírování není dostupné. Označ a zkopíruj text zadání.');
  }
}
// Obsluha navigace, profilů a spuštění aplikace.
bindClicks('[data-nav]', (b) =>
  navigateTo(
    {
      overview: '#',
      practice: '#cviceni/hello',
      progress: '#pokrok',
      vocabulary: '#slovicka/home',
      tenses: '#casy/present-simple',
      media: '#filmy',
    }[b.dataset.nav],
  ),
);
query('.brand').onclick = (e) => {
  e.preventDefault();
  navigateTo('#');
};
query('#teacher-access').onclick = () =>
  navigateTo(route.page === 'teacher' ? '#' : '#lektor/vysledky');
query('#student').onchange = (e) => {
  activeStudentId = e.target.value;
  savedState.selected = activeStudentId;
  saveProgress();
  exerciseKey = '';
  practiceUi.flippedWords.clear();
  practiceUi.retryQuestions.clear();
  renderPage();
};
query('#rename').onclick = () => {
  query('#name-dialog').returnValue = 'cancel';
  query('#student-name').value = savedState.names[activeStudentId] || '';
  query('#name-dialog').showModal();
};
query('#name-dialog').addEventListener('close', () => {
  if (query('#name-dialog').returnValue === 'save') {
    const name = query('#student-name').value.trim();
    if (name) {
      savedState.names[activeStudentId] = name;
      saveProgress();
      renderPage();
    }
  }
});
window.addEventListener('hashchange', () => {
  readRoute();
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
readRoute();
renderPage();
