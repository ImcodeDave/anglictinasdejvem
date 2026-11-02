// Údaje nových aktivit jsou oddělené od původních výsledků skládání vět.
const PracticeModel = (() => {
  function getProgress(studentRecords) {
    studentRecords.extraPractice ||= {};
    const progress = studentRecords.extraPractice;
    progress.vocabulary ||= {};
    progress.tenses ||= {};
    progress.watchlist ||= {};
    return progress;
  }

  function markWord(progress, wordId, status, at = new Date().toISOString()) {
    if (!['known', 'learning'].includes(status)) return false;
    progress.vocabulary[wordId] = { status, updatedAt: at };
    return true;
  }

  function submitTenseAnswer(
    progress,
    tenseId,
    questionId,
    question,
    choice,
    at = new Date().toISOString(),
  ) {
    if (!Number.isInteger(choice) || choice < 0 || choice >= question.options.length) return null;
    progress.tenses[tenseId] ||= {};
    const result = (progress.tenses[tenseId][questionId] ||= {
      attempts: 0,
      correctCount: 0,
      firstCorrect: false,
      independent: false,
      history: [],
    });
    const correct = choice === question.answer;
    if (!result.attempts) result.firstCorrect = correct;
    result.attempts += 1;
    result.correctCount += correct ? 1 : 0;
    result.independent ||= correct;
    result.lastCorrect = correct;
    result.lastChoice = choice;
    result.lastAnswer = question.options[choice];
    result.lastAt = at;
    result.history.push({ at, answer: result.lastAnswer, correct });
    if (result.history.length > 20) result.history.shift();
    return result;
  }

  function summarize(progress, categories, tenses) {
    const words = categories.flatMap((category) => category.words);
    const allAnswers = tenses.flatMap((tense) =>
      tense.questions.map((_, index) => progress.tenses[tense.id]?.[index]),
    );
    return {
      wordCount: words.length,
      knownWords: words.filter((word) => progress.vocabulary[word.id]?.status === 'known').length,
      learningWords: words.filter((word) => progress.vocabulary[word.id]?.status === 'learning')
        .length,
      tenseTotal: allAnswers.length,
      tenseAttempted: allAnswers.filter((result) => result?.attempts > 0).length,
      tenseFirstCorrect: allAnswers.filter((result) => result?.firstCorrect).length,
      tenseSolved: allAnswers.filter((result) => result?.independent).length,
    };
  }

  return { getProgress, markWord, submitTenseAnswer, summarize };
})();

if (typeof module !== 'undefined') module.exports = PracticeModel;
