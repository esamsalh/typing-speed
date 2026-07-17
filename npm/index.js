/**
 * ToolRar Typing Speed Core
 * Lightweight utilities for calculating WPM, CPM, accuracy,
 * typing errors, and text normalization.
 *
 * @see https://www.toolrar.com/General/typing-speed
 */

/**
 * يحول القيمة إلى رقم صالح غير سالب.
 *
 * @param {unknown} value
 * @returns {number}
 */
function toNonNegativeNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return number;
}

/**
 * تقسيم النص إلى كلمات مع دعم العربية والإنجليزية.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function tokenizeWords(text = "") {
  return String(text).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || [];
}

/**
 * توحيد النص قبل المقارنة.
 *
 * يزيل التشكيل العربي، ويوحد المسافات، ويحول الحروف الإنجليزية
 * إلى أحرف صغيرة.
 *
 * @param {string} text
 * @returns {string}
 */
export function normalizeTypingText(text = "") {
  return String(text)
    .normalize("NFKC")
    .replace(
      /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * حساب عدد الأحرف المكتوبة في الدقيقة.
 *
 * @param {number} typedCharacters
 * @param {number} elapsedSeconds
 * @returns {number}
 */
export function calculateCPM(typedCharacters, elapsedSeconds) {
  const characters = toNonNegativeNumber(typedCharacters);
  const seconds = toNonNegativeNumber(elapsedSeconds);

  if (seconds === 0) {
    return 0;
  }

  return Math.round(characters / (seconds / 60));
}

/**
 * حساب الكلمات في الدقيقة وفق المعيار الشائع:
 * كل خمسة أحرف تُحسب كلمة قياسية واحدة.
 *
 * @param {number} typedCharacters
 * @param {number} elapsedSeconds
 * @returns {number}
 */
export function calculateWPM(typedCharacters, elapsedSeconds) {
  const characters = toNonNegativeNumber(typedCharacters);
  const seconds = toNonNegativeNumber(elapsedSeconds);

  if (seconds === 0) {
    return 0;
  }

  return Math.round(characters / 5 / (seconds / 60));
}

/**
 * حساب سرعة الكتابة اعتمادًا على عدد الكلمات الفعلي.
 *
 * @param {number} typedWords
 * @param {number} elapsedSeconds
 * @returns {number}
 */
export function calculateWordBasedWPM(typedWords, elapsedSeconds) {
  const words = toNonNegativeNumber(typedWords);
  const seconds = toNonNegativeNumber(elapsedSeconds);

  if (seconds === 0) {
    return 0;
  }

  return Math.round(words / (seconds / 60));
}

/**
 * حساب نسبة الدقة.
 *
 * @param {number} correctCharacters
 * @param {number} typedCharacters
 * @returns {number}
 */
export function calculateAccuracy(correctCharacters, typedCharacters) {
  const correct = toNonNegativeNumber(correctCharacters);
  const typed = toNonNegativeNumber(typedCharacters);

  if (typed === 0) {
    return 100;
  }

  const accuracy = (Math.min(correct, typed) / typed) * 100;

  return Number(accuracy.toFixed(2));
}

/**
 * مقارنة النص المكتوب بالنص الأصلي على مستوى الأحرف.
 *
 * @param {string} expectedText
 * @param {string} typedText
 * @param {{ normalize?: boolean }} options
 * @returns {{
 *   correctCharacters: number,
 *   incorrectCharacters: number,
 *   missingCharacters: number,
 *   extraCharacters: number,
 *   totalErrors: number,
 *   accuracy: number
 * }}
 */
export function analyzeTypingErrors(
  expectedText = "",
  typedText = "",
  options = {}
) {
  const shouldNormalize = options.normalize !== false;

  const expected = shouldNormalize
    ? normalizeTypingText(expectedText)
    : String(expectedText);

  const typed = shouldNormalize
    ? normalizeTypingText(typedText)
    : String(typedText);

  const sharedLength = Math.min(expected.length, typed.length);

  let correctCharacters = 0;
  let incorrectCharacters = 0;

  for (let index = 0; index < sharedLength; index += 1) {
    if (expected[index] === typed[index]) {
      correctCharacters += 1;
    } else {
      incorrectCharacters += 1;
    }
  }

  const missingCharacters = Math.max(expected.length - typed.length, 0);
  const extraCharacters = Math.max(typed.length - expected.length, 0);

  const totalErrors =
    incorrectCharacters + missingCharacters + extraCharacters;

  return {
    correctCharacters,
    incorrectCharacters,
    missingCharacters,
    extraCharacters,
    totalErrors,
    accuracy: calculateAccuracy(correctCharacters, typed.length)
  };
}

/**
 * إنشاء تقرير كامل لاختبار سرعة الكتابة.
 *
 * @param {{
 *   expectedText?: string,
 *   typedText?: string,
 *   elapsedSeconds?: number,
 *   normalize?: boolean
 * }} input
 * @returns {{
 *   wpm: number,
 *   wordBasedWpm: number,
 *   cpm: number,
 *   accuracy: number,
 *   typedWords: number,
 *   typedCharacters: number,
 *   elapsedSeconds: number,
 *   errors: {
 *     correctCharacters: number,
 *     incorrectCharacters: number,
 *     missingCharacters: number,
 *     extraCharacters: number,
 *     totalErrors: number,
 *     accuracy: number
 *   }
 * }}
 */
export function createTypingReport(input = {}) {
  const expectedText = String(input.expectedText || "");
  const typedText = String(input.typedText || "");
  const elapsedSeconds = toNonNegativeNumber(input.elapsedSeconds);

  const errors = analyzeTypingErrors(expectedText, typedText, {
    normalize: input.normalize !== false
  });

  const typedCharacters = typedText.length;
  const typedWords = tokenizeWords(typedText).length;

  return {
    wpm: calculateWPM(typedCharacters, elapsedSeconds),
    wordBasedWpm: calculateWordBasedWPM(
      typedWords,
      elapsedSeconds
    ),
    cpm: calculateCPM(typedCharacters, elapsedSeconds),
    accuracy: errors.accuracy,
    typedWords,
    typedCharacters,
    elapsedSeconds,
    errors
  };
}
