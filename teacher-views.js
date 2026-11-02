// Lektorské obrazovky: výsledky, gramatika, slovesné tvary a příprava hodin.
// Sdílený stav a pomocné funkce poskytuje student-app.js.

function renderTeacherPage() {
  query('#main').innerHTML = /* HTML */ `<div class="teacher-heading">
      <div>
        <div class="eyebrow">PRO LEKTORA</div>
        <h1>Všechno potřebné po ruce.</h1>
        <p>Výsledky studentek, gramatický přehled a vysvětlení slovesných tvarů.</p>
      </div>
      <button class="button secondary" id="back-student">← Zpět ke studiu</button>
    </div>
    <div class="teacher-tabs" role="tablist" aria-label="Lektorský přehled">
      ${[
        ['vysledky', 'Výsledky'],
        ['gramatika', 'Gramatika'],
        ['tvary', 'Tvary sloves'],
        ['priprava', 'Příprava hodin'],
      ]
        .map(
          ([id, label]) =>
            /* HTML */ `<button
              class="tab ${route.tab === id ? 'active' : ''}"
              role="tab"
              aria-selected="${route.tab === id}"
              aria-controls="teacher-content"
              id="teacher-tab-${id}"
              data-ttab="${id}"
            >
              ${label}
            </button>`,
        )
        .join('')}
    </div>
    <div id="teacher-content" role="tabpanel" aria-labelledby="teacher-tab-${route.tab}"></div>`;
  query('#back-student').onclick = () => navigateTo('#');
  bindClicks('[data-ttab]', (b) => navigateTo(`#lektor/${b.dataset.ttab}`));
  ({
    vysledky: renderResults,
    gramatika: renderGrammar,
    tvary: renderVerbExplorer,
    priprava: renderLessonPreparation,
  })[route.tab]();
}

function renderResults() {
  const { total, rows } = getStudentStats(),
    mistakes = [];
  for (const l of lessons)
    l.exercises.forEach(([cs, words], i) => {
      const r = getLessonRecord(l.id).results?.[i];
      if (r && ((r.attempts || 0) > (r.correct || 0) || r.hints > 0))
        mistakes.push({ l, cs, words, r });
    });
  query('#teacher-content').innerHTML = /* HTML */ `<div class="section-head">
      <div>
        <h2>Výsledky · ${escapeHtml(savedState.names[activeStudentId])}</h2>
        <p>Profil přepneš nahoře. Pouze data z tohoto prohlížeče na tomto zařízení.</p>
      </div>
      <span class="badge"
        >${total.attempted ? Math.round((total.first / total.attempted) * 100) + ' %' : '—'}
        NAPOPRVÉ BEZ POMOCI</span
      >
    </div>
    ${renderStatsCards(total)}
    <section class="panel">
      <h3>Přehled podle témat</h3>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Téma</th>
              <th>Vyzkoušeno</th>
              <th>Napoprvé bez pomoci</th>
              <th>Samostatně vyřešeno</th>
              <th>Pokusy</th>
              <th>Rozhovor (lektor)</th>
              <th>Poslední odpověď</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r, i) =>
                  /* HTML */ `<tr>
                    <td>
                      <button class="text-link" data-prep="${r.id}">${lessons[i].title} ↗</button>
                    </td>
                    <td>${r.attempted} / ${r.total}</td>
                    <td>${r.first}</td>
                    <td>${r.independent} / ${r.total}</td>
                    <td>${r.attempts}</td>
                    <td>${getLessonRecord(r.id).done ? '✓ Zvládá' : '—'}</td>
                    <td>${formatDateTime(r.lastAt)}</td>
                  </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
      <p class="table-note">
        Pokus = úplná odpověď odeslaná ke kontrole. „Samostatně“ = alespoň jednou správně bez
        nápovědy, i po předchozích chybách. Procento napoprvé se počítá z různých vyzkoušených vět,
        ne ze všech opakovaných pokusů.
      </p>
    </section>
    <section class="panel">
      <h3>Co stojí za zopakování</h3>
      ${mistakes.length
        ? /* HTML */ `<div class="mistake-list">
            ${mistakes
              .map(
                ({ l, cs, words, r }) =>
                  /* HTML */ `<details>
                    <summary>
                      <span
                        >${cs}<small
                          >${l.title} · ${r.attempts - r.correct} chyb · ${r.hints} nápověd</small
                        ></span
                      ><span class="${r.independent ? 'done-mark' : 'needs-work'}"
                        >${r.independent ? 'Později zvládnuto samostatně' : 'Ještě procvičit'}</span
                      >
                    </summary>
                    <div class="mistake-detail">
                      <p>
                        <b>Správný vzor:</b> <span lang="en">${escapeHtml(words.join(' '))}</span>
                      </p>
                      <div class="table-scroll">
                        <table class="data-table">
                          <thead>
                            <tr>
                              <th>Čas</th>
                              <th>Odpověď</th>
                              <th>Výsledek</th>
                              <th>Pomoc</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${[...(r.history || [])]
                              .reverse()
                              .map(
                                (h) =>
                                  /* HTML */ `<tr>
                                    <td>${formatDateTime(h.at)}</td>
                                    <td>${escapeHtml(h.answer)}</td>
                                    <td>${h.correct ? 'Správně' : 'Chyba'}</td>
                                    <td>${h.assisted ? 'S nápovědou' : 'Bez nápovědy'}</td>
                                  </tr>`,
                              )
                              .join('')}
                          </tbody>
                        </table>
                      </div>
                      <p class="table-note">
                        Posledních 20 odpovědí na tuto větu; součty zahrnují všechny pokusy.
                      </p>
                    </div>
                  </details>`,
              )
              .join('')}
          </div>`
        : '<p class="muted">Zatím tu nejsou věty s chybnou odpovědí ani použitou nápovědou. Výsledky se objeví po procvičování.</p>'}
    </section>
    <aside class="teaching-tip">
      <span>✎</span>
      <div>
        <b>Lektorská část je jen schovaná za malým tlačítkem.</b>
        <p>
          Nemá samostatné přihlášení ani ochranu heslem. Výsledky a poznámky se nesynchronizují mezi
          zařízeními.
        </p>
      </div>
    </aside>`;
  bindClicks('[data-prep]', (b) => navigateTo(`#lektor/priprava/${b.dataset.prep}`));
}

function matchesSearchQuery(text, query) {
  const haystack = normalizeSearchText(text);
  return normalizeSearchText(query)
    .trim()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

function getMatchingGrammarTopics() {
  return grammarTopics.filter(
    (t) =>
      (grammarSection === 'all' || t.section === grammarSection) &&
      matchesSearchQuery(
        [
          t.title,
          t.term,
          t.explain,
          t.structure,
          t.use,
          t.mistake,
          t.teach,
          ...t.examples.flat(),
        ].join(' '),
        grammarQuery,
      ),
  );
}

function renderGrammar() {
  query('#teacher-content').innerHTML = /* HTML */ `<div class="section-head">
      <div>
        <h2>Mapa anglické gramatiky</h2>
        <p>
          ${grammarTopics.length} přehledových karet od základů po pokročilé konstrukce. Úrovně jsou
          orientační.
        </p>
      </div>
      <button class="button secondary" id="open-forms">Be, been… → Tvary sloves</button>
    </div>
    <div class="grammar-layout">
      <aside class="grammar-browser">
        <label class="field-label" for="grammar-search">Hledat téma, pojem nebo tvar</label
        ><input
          type="search"
          id="grammar-search"
          class="search-input"
          placeholder="been, infinitiv, minulý čas…"
          value="${escapeHtml(grammarQuery)}"
        /><label class="sr-only" for="grammar-section">Oblast gramatiky</label
        ><select class="topic-select" id="grammar-section">
          <option value="all">Všechny oblasti</option>
          ${grammarSections
            .map(
              (s) => /* HTML */ `<option ${grammarSection === s ? 'selected' : ''}>${s}</option>`,
            )
            .join('')}
        </select>
        <div id="grammar-list" class="grammar-list"></div>
      </aside>
      <article id="grammar-detail" class="grammar-detail"></article>
    </div>`;
  query('#open-forms').onclick = () => navigateTo('#lektor/tvary/be');
  query('#grammar-search').oninput = (e) => {
    grammarQuery = e.target.value;
    renderGrammarList();
  };
  query('#grammar-section').onchange = (e) => {
    grammarSection = e.target.value;
    renderGrammarList();
  };
  renderGrammarList();
  renderGrammarDetail();
}

function renderGrammarList() {
  const matches = getMatchingGrammarTopics();
  query('#grammar-list').innerHTML = /* HTML */ `<div class="match-count">
      ${matches.length} témat
    </div>
    ${matches.length
      ? matches
          .map(
            (t) =>
              /* HTML */ `<button
                class="grammar-item ${t.id === selectedGrammarId ? 'selected' : ''}"
                data-grammar="${t.id}"
                aria-pressed="${t.id === selectedGrammarId}"
              >
                <span>${t.title}</span><small>${t.section} · ${t.level}</small>
              </button>`,
          )
          .join('')
      : '<p class="muted search-empty">Žádné téma neodpovídá hledání. Zkus kratší výraz nebo jinou oblast.</p>'}`;
  bindClicks('[data-grammar]', (b) => {
    selectedGrammarId = b.dataset.grammar;
    history.replaceState(null, '', `#lektor/gramatika/${selectedGrammarId}`);
    renderGrammarList();
    renderGrammarDetail();
  });
}

function renderGrammarDetail() {
  const t = grammarTopics.find((t) => t.id === selectedGrammarId) || grammarTopics[0];
  query('#grammar-detail').innerHTML = /* HTML */ `<div class="grammar-title">
      <div class="eyebrow">${t.section} · ${t.level}</div>
      <h2>${t.title}</h2>
      <p>${t.term}</p>
    </div>
    <section class="panel grammar-pattern">
      <div class="eyebrow">JAK SE TVOŘÍ</div>
      <p>${escapeHtml(t.structure)}</p>
    </section>
    <section class="panel">
      <h3>Co to je a jak se tomu říká</h3>
      <p>${t.explain}</p>
      <h3 class="subheading">Kdy a proč to použít</h3>
      <p>${t.use}</p>
    </section>
    <section class="panel">
      <h3>Ve skutečných větách</h3>
      ${t.examples
        .map(
          ([en, cs]) =>
            /* HTML */ `<div class="phrase">
              <strong lang="en">${en}</strong><small>${cs}</small>
            </div>`,
        )
        .join('')}
    </section>
    <section class="panel explanation">
      <div class="eyebrow">JAK TO VYSVĚTLIT STUDENTCE</div>
      <p>${t.teach}</p>
    </section>
    <section class="panel warning">
      <h3>Častá chyba nebo zjednodušení</h3>
      <p>${t.mistake}</p>
    </section>
    ${['be', 'verb-forms', 'ing'].includes(t.id)
      ? '<button id="related-verb" class="button primary">Rozebrat jednotlivé tvary be →</button>'
      : ''}`;
  if (query('#related-verb')) query('#related-verb').onclick = () => navigateTo('#lektor/tvary/be');
}

function renderVerbExplorer() {
  query('#teacher-content').innerHTML = /* HTML */ `<div class="section-head">
      <div>
        <h2>Jeden tvar. Jasné vysvětlení.</h2>
        <p>
          Vyhledej sloveso i jeho tvar: be, been, being, went, written… ${verbForms.length} běžných
          sloves.
        </p>
      </div>
    </div>
    <div class="grammar-layout">
      <aside class="grammar-browser">
        <label class="field-label" for="verb-search">Sloveso, tvar nebo český význam</label
        ><input
          class="search-input"
          type="search"
          id="verb-search"
          placeholder="Například been nebo psát"
          value="${escapeHtml(verbQuery)}"
        />
        <div id="verb-list" class="grammar-list"></div>
      </aside>
      <article id="verb-detail" class="grammar-detail"></article>
    </div>`;
  query('#verb-search').oninput = (e) => {
    verbQuery = e.target.value;
    renderVerbList();
  };
  renderVerbList();
  renderVerbDetail();
}

function renderVerbList() {
  const matches = verbForms.filter((v) => matchesSearchQuery(v.join(' '), verbQuery));
  query('#verb-list').innerHTML = /* HTML */ `<div class="match-count">
      ${matches.length} sloves
    </div>
    ${matches.length
      ? matches
          .map(
            (v) =>
              /* HTML */ `<button
                class="grammar-item ${v[0] === selectedVerbId ? 'selected' : ''}"
                data-verb="${v[0]}"
                aria-pressed="${v[0] === selectedVerbId}"
              >
                <span>${v[0]} <small>· ${v[1]}</small></span
                ><small>${v[3]} → ${v[4]}</small>
              </button>`,
          )
          .join('')
      : '<p class="muted search-empty">Toto sloveso zatím v přehledu není. Obecné principy najdeš v gramatice pod V1, V2, V3.</p>'}`;
  bindClicks('[data-verb]', (b) => {
    selectedVerbId = b.dataset.verb;
    history.replaceState(null, '', `#lektor/tvary/${selectedVerbId}`);
    renderVerbList();
    renderVerbDetail();
  });
}

function renderVerbDetail() {
  const v = verbForms.find((v) => v[0] === selectedVerbId) || verbForms[0],
    labels = [
      'Základní tvar · V1',
      v[0] === 'be' ? 'Přítomné tvary' : 'Přítomný tvar (he/she/it)',
      'Minulý tvar · V2',
      'Příčestí minulé · V3',
      '-ing tvar',
    ];
  query('#verb-detail').innerHTML = /* HTML */ `<div class="grammar-title">
      <div class="eyebrow">SLOVESNÉ TVARY</div>
      <h2>${v[0]} <span class="muted">· ${v[1]}</span></h2>
      <p>Tvar není totéž co čas. Stejný tvar může sloužit v několika konstrukcích.</p>
    </div>
    <div class="verb-strip">
      ${[v[0], v[2], v[3], v[4], v[5]]
        .map(
          (value, i) =>
            /* HTML */ `<div><small>${labels[i]}</small><strong lang="en">${value}</strong></div>`,
        )
        .join('')}
    </div>
    ${v[0] === 'be'
      ? /* HTML */ `<section class="panel verb-highlight">
            <h3>Be × was/were × been</h3>
            <p>
              <b>Be</b> = základní tvar „být“. <b>Was/were</b> = prostá minulost. <b>Been</b> =
              příčestí minulé (past participle, V3), které samo netvoří minulou větu.
            </p>
            <div class="phrase">
              <strong>I was tired. → I have been tired.</strong
              ><small
                >Byla jsem unavená v minulosti. → Únava je součástí aktuálního kontextu. Volba
                závisí na situaci.</small
              >
            </div>
          </section>
          ${beDetails
            .map(
              ([form, name, description, usage, en, cs, teach]) =>
                /* HTML */ `<section class="panel form-card">
                  <div class="form-head">
                    <h3 lang="en">${form}</h3>
                    <span>${name}</span>
                  </div>
                  <p>${description}</p>
                  <div class="form-usage">
                    <b>Kde ho uvidíš</b>
                    <p lang="en">${usage}</p>
                  </div>
                  <div class="phrase"><strong lang="en">${en}</strong><small>${cs}</small></div>
                  <div class="explain-quote">
                    <b>Jak to říct studentce</b>
                    <p>${teach}</p>
                  </div>
                </section>`,
            )
            .join('')}
          <section class="panel">
            <h3>Been × gone</h3>
            <p>
              <b>She has been to London.</b> = Byla v Londýně, například jako zkušenost z návštěvy.
              <b>She has gone to London.</b> = Odjela do Londýna a ještě se nevrátila. Kontext je
              důležitý.
            </p>
          </section>`
      : renderVerbExplanation(v)}
    <div class="actions">
      <button id="verb-principle" class="button secondary">Jak fungují V1, V2, V3? ↗</button
      ><button id="be-principle" class="button secondary">Gramatická karta be ↗</button>
    </div>`;
  query('#verb-principle').onclick = () => navigateTo('#lektor/gramatika/verb-forms');
  query('#be-principle').onclick = () => navigateTo('#lektor/gramatika/be');
}

function renderVerbExplanation(v) {
  const stem = (value) => value.split(' / ')[0].replace(' /red/', '');
  return /* HTML */ `<section class="panel">
      <h3>Jak s těmi tvary pracovat</h3>
      <div class="form-usage">
        <b>${v[0]} · základní tvar (V1)</b>
        <p>
          Po modálním slovese a po did/does se vrací základní tvar:
          <span lang="en">can ${v[0]}… / did you ${v[0]}…?</span> S infinitivní částicí:
          <span lang="en">to ${v[0]}…</span>
        </p>
      </div>
      <div class="form-usage">
        <b>${v[2]} · přítomný tvar pro he/she/it</b>
        <p>
          Kladná věta: <span lang="en">she ${v[2]}…</span> Otázka:
          <span lang="en">does she ${v[0]}…?</span> Koncovku už nese does.
        </p>
      </div>
      <div class="form-usage">
        <b>${v[3]} · minulý tvar (V2)</b>
        <p>
          Kladný minulý prostý čas: <span lang="en">I ${stem(v[3])}…</span> Pro otázku a zápor
          použij did/didn’t + ${v[0]}.
        </p>
      </div>
      <div class="form-usage">
        <b>${v[4]} · příčestí minulé (V3)</b>
        <p>
          S have/has/had tvoří perfect: <span lang="en">have ${stem(v[4])}…</span> U významově
          vhodných sloves tvoří také trpný rod po be. Ne každé sloveso lze běžně použít v pasivu.
        </p>
      </div>
      <div class="form-usage">
        <b>${v[5]} · -ing tvar</b>
        <p>
          Po be tvoří průběh, pokud ho význam slovesa připouští. V dalších vazbách může označovat
          činnost. U stavových významů, například know, běžně použij prostý čas.
        </p>
      </div>
    </section>
    <section class="panel explanation">
      <h3>Jak to vysvětlit</h3>
      <p>
        „Tohle jsou dílky jednoho slovesa. Nejdřív zjistíme, co chceme říct, potom vybereme
        konstrukci a do ní správný tvar. Po did základní, po have příčestí minulé.“
      </p>
    </section>
    ${v[0] === 'read'
      ? '<section class="panel warning"><h3>Stejný zápis, jiná výslovnost</h3><p>Read v základním tvaru je /riːd/, v minulém tvaru a V3 /red/.</p></section>'
      : ''}${v[0] === 'get'
      ? '<section class="panel warning"><h3>Britská a americká varianta</h3><p>V3 je v britské angličtině obvykle got. V americké angličtině se podle významu používá i gotten. Have got pro vlastnictví je zvláštní vazba.</p></section>'
      : ''}`;
}

function renderLessonPreparation() {
  const l = getCurrentLesson(),
    r = getLessonRecord(l.id),
    times =
      lessonDuration === 45
        ? [5, 8, 8, 17, 7]
        : lessonDuration === 90
          ? [10, 15, 20, 30, 15]
          : [10, 10, 10, 20, 10];
  query('#teacher-content').innerHTML = /* HTML */ `<div class="prep-controls">
      <div>
        <label for="prep-topic">Téma hodiny</label
        ><select class="topic-select" id="prep-topic">
          ${lessons
            .map(
              (t) =>
                /* HTML */ `<option value="${t.id}" ${t.id === l.id ? 'selected' : ''}>
                  ${t.title}
                </option>`,
            )
            .join('')}
        </select>
      </div>
      <div>
        <label for="duration">Délka</label
        ><select class="topic-select" id="duration">
          ${[45, 60, 90]
            .map(
              (n) =>
                /* HTML */ `<option value="${n}" ${lessonDuration === n ? 'selected' : ''}>
                  ${n} minut
                </option>`,
            )
            .join('')}
        </select>
      </div>
      <button class="button secondary" id="print">Vytisknout přípravu ↓</button>
    </div>
    <div class="detail-grid">
      <div>
        <section class="panel goal">
          <div class="eyebrow">CÍL HODINY · ${l.title}</div>
          <p>${l.goal}</p>
        </section>
        <section class="panel">
          <h3>Průběh hodiny · ${lessonDuration} min</h3>
          <div class="timeline">
            ${l.steps
              .map(
                ([title, text], i) =>
                  /* HTML */ `<div class="step">
                    <span class="step-time">${times[i]} min</span>
                    <div>
                      <h4>${title}</h4>
                      <p>${text}</p>
                    </div>
                  </div>`,
              )
              .join('')}
          </div>
        </section>
        <section class="panel">
          <h3>Domácí úkol</h3>
          <p>${l.homework}</p>
          <button class="button secondary no-print" style="margin-top:18px" id="copy-homework">
            Kopírovat zadání
          </button>
        </section>
      </div>
      <aside class="detail-aside">
        <section class="panel">
          <h3>Poznámky · ${escapeHtml(savedState.names[activeStudentId])}</h3>
          <label class="sr-only" for="notes">Poznámky k tématu</label
          ><textarea class="notes" id="notes" placeholder="Co už jde? Co zopakovat? Na co navázat?">
${escapeHtml(r.note)}</textarea
          >
          <div class="save-label" id="save-status">Pouze v tomto prohlížeči.</div>
          <label class="check-label"
            ><input type="checkbox" id="done" ${r.done ? 'checked' : ''} /> Zvládá i samostatný
            rozhovor</label
          >
          <p class="table-note">Tvoje hodnocení, oddělené od automatických výsledků cvičení.</p>
        </section>
        <section class="panel warning">
          <h3>Na co dát pozor</h3>
          <p>${l.warning}</p>
        </section>
        <section class="panel">
          <h3>Jak vzor vysvětlit</h3>
          <div class="pattern">
            ${l.pattern.map((w) => /* HTML */ `<span>${w}</span>`).join('')}
          </div>
          <p>${l.rule}</p>
          <button class="button secondary no-print" id="open-student" style="margin-top:18px">
            Otevřít pro studentku ↗
          </button>
        </section>
      </aside>
    </div>`;
  query('#prep-topic').onchange = (e) => navigateTo(`#lektor/priprava/${e.target.value}`);
  query('#duration').onchange = (e) => {
    lessonDuration = Number(e.target.value);
    renderLessonPreparation();
  };
  query('#notes').oninput = (e) => {
    r.note = e.target.value;
    query('#save-status').textContent = saveProgress()
      ? 'Uloženo v tomto prohlížeči.'
      : 'Ukládání není dostupné.';
  };
  query('#done').onchange = (e) => {
    r.done = e.target.checked;
    saveProgress();
  };
  query('#print').onclick = () => window.print();
  query('#open-student').onclick = () => openLesson(l.id);
  query('#copy-homework').onclick = () => copyText(l.homework);
}
