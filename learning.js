// Vyhodnocování bez závislosti na prohlížeči a bez přístupu k síti.
const Learning = (() => {
  function result(record, index) {
    record.results ||= {};
    return (record.results[index] ||= {
      attempts: 0,
      correct: 0,
      hints: 0,
      independent: false,
      history: [],
    });
  }
  function check(words, chosen) {
    return (
      chosen.length === words.length &&
      new Set(chosen).size === words.length &&
      chosen.every((id, i) => Number.isInteger(id) && words[id] === words[i])
    );
  }
  function submit(record, index, words, chosen, assisted, at = new Date().toISOString()) {
    if (
      chosen.length !== words.length ||
      new Set(chosen).size !== words.length ||
      chosen.some((id) => !Number.isInteger(id) || id < 0 || id >= words.length)
    )
      return { incomplete: true };
    const r = result(record, index),
      correct = check(words, chosen);
    if (!r.attempts) {
      r.firstCorrect = correct && !assisted;
      r.firstAssisted = !!assisted;
    }
    r.attempts++;
    r.correct += correct ? 1 : 0;
    r.independent ||= correct && !assisted;
    r.lastAt = at;
    r.lastAnswer = chosen.map((id) => words[id]).join(' ');
    r.history ||= [];
    r.history.push({ at, answer: r.lastAnswer, correct, assisted: !!assisted });
    if (r.history.length > 20) r.history.shift();
    return { correct, incomplete: false };
  }
  function summarize(records, lessons) {
    const total = {
      attempted: 0,
      first: 0,
      independent: 0,
      attempts: 0,
      correct: 0,
      hints: 0,
      total: 0,
    };
    const rows = lessons.map((l) => {
      const row = {
        id: l.id,
        attempted: 0,
        first: 0,
        independent: 0,
        attempts: 0,
        correct: 0,
        hints: 0,
        total: l.exercises.length,
        lastAt: null,
      };
      l.exercises.forEach((_, i) => {
        const r = records?.[l.id]?.results?.[i];
        if (!r) return;
        row.attempted += r.attempts > 0 ? 1 : 0;
        row.first += r.firstCorrect ? 1 : 0;
        row.independent += r.independent ? 1 : 0;
        row.attempts += r.attempts || 0;
        row.correct += r.correct || 0;
        row.hints += r.hints || 0;
        if (r.lastAt && (!row.lastAt || r.lastAt > row.lastAt)) row.lastAt = r.lastAt;
      });
      for (const k of Object.keys(total)) total[k] += row[k];
      return row;
    });
    return { total, rows };
  }
  return { result, check, submit, summarize };
})();
if (typeof module !== 'undefined') module.exports = Learning;
