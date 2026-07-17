import assert from "node:assert/strict";

import {
  calculateWPM,
  calculateCPM,
  calculateAccuracy,
  calculateWordBasedWPM,
  tokenizeWords,
  normalizeTypingText,
  analyzeTypingErrors,
  createTypingReport
} from "./index.js";

assert.equal(calculateWPM(250, 60), 50);
assert.equal(calculateCPM(250, 60), 250);
assert.equal(calculateWordBasedWPM(40, 60), 40);

assert.equal(calculateAccuracy(90, 100), 90);
assert.equal(calculateAccuracy(0, 0), 100);

assert.deepEqual(
  tokenizeWords("اختبار سرعة الكتابة باللغة العربية"),
  ["اختبار", "سرعة", "الكتابة", "باللغة", "العربية"]
);

assert.equal(
  normalizeTypingText("  السُّرْعَةُ   في الكتابة  "),
  "السرعة في الكتابة"
);

const errors = analyzeTypingErrors("مرحبا", "مرحبا");

assert.equal(errors.correctCharacters, 5);
assert.equal(errors.totalErrors, 0);
assert.equal(errors.accuracy, 100);

const report = createTypingReport({
  expectedText: "اختبار سرعة الكتابة",
  typedText: "اختبار سرعة الكتابة",
  elapsedSeconds: 60
});

assert.equal(report.typedWords, 3);
assert.equal(report.accuracy, 100);
assert.equal(report.errors.totalErrors, 0);

console.log("All ToolRar typing-speed-core tests passed.");
