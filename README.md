# @toolrar/typing-speed-core

مكتبة JavaScript خفيفة لحساب سرعة الكتابة، وعدد الكلمات في الدقيقة، وعدد الأحرف في الدقيقة، ونسبة الدقة، وتحليل أخطاء الكتابة، مع دعم النصوص العربية والإنجليزية.

[![npm version](https://img.shields.io/npm/v/@toolrar/typing-speed-core.svg)](https://www.npmjs.com/package/@toolrar/typing-speed-core)
[![npm downloads](https://img.shields.io/npm/dm/@toolrar/typing-speed-core.svg)](https://www.npmjs.com/package/@toolrar/typing-speed-core)

## npm Package

ثبّت مكتبة حساب سرعة الكتابة باستخدام الأمر التالي:

```bash
npm install @toolrar/typing-speed-core
```

## مثال سريع

```javascript
import {
  calculateWPM,
  calculateCPM,
  calculateAccuracy,
  createTypingReport
} from "@toolrar/typing-speed-core";

const report = createTypingReport({
  expectedText: "اختبار سرعة الكتابة",
  typedText: "اختبار سرعة الكتابة",
  elapsedSeconds: 60
});

console.log(report);
```

# أداة اختبار سرعة الكتابة على الكيبورد ⌨️

مشروع برمجي مفتوح المصدر مصمم لتوفير **أداة اختبار سرعة الكتابة على الكيبورد** باللغة العربية بشكل دقيق وفوري. يهدف المشروع إلى مساعدة المستخدمين ومدخلي البيانات على قياس كفاءتهم وتطوير مهارات الكتابة السريعة عبر لوحة المفاتيح دون تعقيد.

## ✨ مميزات المشروع

- **قياس دقيق ولحظي:** حساب سرعة الكتابة وفق معيار الكلمات في الدقيقة `WPM`.
- **حساب عدد الأحرف:** قياس عدد الأحرف المكتوبة في الدقيقة `CPM`.
- **حساب نسبة الدقة:** تتبع الأخطاء أثناء الكتابة وحساب نسبة الدقة.
- **تحليل أخطاء الكتابة:** حساب الأحرف الصحيحة والخاطئة والناقصة والزائدة.
- **دعم اللغة العربية:** معالجة النص العربي وإزالة التشكيل عند المقارنة.
- **عداد تنازلي ذكي:** يبدأ المؤقت تلقائيًا عند كتابة أول حرف.
- **واجهة خفيفة وسريعة:** تعمل مباشرة داخل المتصفح دون مكتبات خارجية.
- **متوافقة مع الهاتف والكمبيوتر:** تصميم متجاوب مع مختلف أحجام الشاشات.

## 🚀 التشغيل المباشر والأدوات المتقدمة

لتجربة النسخة الكاملة عبر المتصفح:

1. [أداة اختبار سرعة الكتابة على الكيبورد من ToolRar](https://www.toolrar.com/General/typing-speed)
2. [موقع ToolRar الرسمي للأدوات المجانية](https://www.toolrar.com/)
3. [صفحة الحزمة على npm](https://www.npmjs.com/package/@toolrar/typing-speed-core)

## 📦 الدوال المتاحة في المكتبة

### `calculateWPM`

تحسب سرعة الكتابة بالكلمات في الدقيقة اعتمادًا على كل خمسة أحرف باعتبارها كلمة قياسية.

```javascript
import { calculateWPM } from "@toolrar/typing-speed-core";

const wpm = calculateWPM(250, 60);

console.log(wpm);
// 50
```

### `calculateCPM`

تحسب عدد الأحرف المكتوبة في الدقيقة.

```javascript
import { calculateCPM } from "@toolrar/typing-speed-core";

const cpm = calculateCPM(250, 60);

console.log(cpm);
// 250
```

### `calculateAccuracy`

تحسب نسبة الدقة اعتمادًا على عدد الأحرف الصحيحة وإجمالي الأحرف المكتوبة.

```javascript
import { calculateAccuracy } from "@toolrar/typing-speed-core";

const accuracy = calculateAccuracy(240, 250);

console.log(accuracy);
// 96
```

### `normalizeTypingText`

توحّد النص قبل المقارنة، وتزيل التشكيل العربي والمسافات الزائدة.

```javascript
import { normalizeTypingText } from "@toolrar/typing-speed-core";

const text = normalizeTypingText("  السُّرْعَةُ   في الكتابة  ");

console.log(text);
// السرعة في الكتابة
```

### `analyzeTypingErrors`

تقارن النص المتوقع بالنص المكتوب وتحسب الأخطاء.

```javascript
import { analyzeTypingErrors } from "@toolrar/typing-speed-core";

const result = analyzeTypingErrors(
  "اختبار سرعة الكتابة",
  "اختبار سرعة الكتابه"
);

console.log(result);
```

### `createTypingReport`

تنشئ تقريرًا كاملًا يتضمن السرعة والدقة وعدد الكلمات والأحرف والأخطاء.

```javascript
import { createTypingReport } from "@toolrar/typing-speed-core";

const report = createTypingReport({
  expectedText: "اختبار سرعة الكتابة",
  typedText: "اختبار سرعة الكتابة",
  elapsedSeconds: 60
});

console.log(report);
```

## 🛠️ تشغيل المشروع محليًا

لتشغيل واجهة اختبار سرعة الكتابة على جهازك:

```bash
git clone https://github.com/esamsalh/typing-speed.git
```

بعد تنزيل المستودع:

1. افتح مجلد المشروع.
2. افتح ملف `index.html` في المتصفح.
3. لا تحتاج إلى خادم أو عملية تثبيت إضافية لتشغيل الواجهة.

## 🧪 تشغيل الاختبارات

```bash
npm test
```

تتحقق الاختبارات من:

- حساب `WPM`.
- حساب `CPM`.
- حساب الدقة.
- دعم الكلمات العربية.
- إزالة التشكيل.
- تحليل الأخطاء.
- إنشاء تقرير الكتابة.

## 🔗 روابط المشروع

- [النسخة المباشرة على ToolRar](https://www.toolrar.com/General/typing-speed)
- [الحزمة على npm](https://www.npmjs.com/package/@toolrar/typing-speed-core)
- [المستودع على GitHub](https://github.com/esamsalh/typing-speed)
- [موقع ToolRar](https://www.toolrar.com/)

## 🔒 الخصوصية

تعمل أداة الويب محليًا داخل المتصفح، ولا تحتاج إلى إرسال النص المكتوب إلى خادم خارجي لإجراء حسابات السرعة والدقة الأساسية.

## 📄 الترخيص

هذا المشروع متاح بموجب ترخيص MIT.

## 👨‍💻 المطور

تم تطوير المشروع وصيانته بواسطة [ToolRar](https://www.toolrar.com/).
