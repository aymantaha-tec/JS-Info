# 📝 Notes – Garbage Collection

## 🔥 إزاي المبرمجين الـ Pro بيفكروا في الموضوع ده

معظم المبرمجين مش بيفكروا في الـ Garbage Collection وهم شغالين. ده طبيعي ومقصود. بس الـ Pro بيفكر فيه في حالتين بس:

**1. لما البرنامج بيبطأ أو الذاكرة بتكبر مع الوقت.**
ساعتها بيفتح الـ DevTools ويبص على الـ Memory tab يشوف في memory leak ولا لأ.

**2. لما بيبني حاجة بتشتغل لفترة طويلة.**
زي Server بيشتغل على Node.js أو Dashboard بيفضل مفتوح ساعات. هنا لو في leak صغير بيتراكم ويبقى مشكلة كبيرة.

---

## 💡 نصايح عملية من التجربة

**1. Event Listeners هي أكتر سبب لـ Memory Leaks:**
دايمًا لما بتعمل `addEventListener`، فكر: "امتى هشيل الـ listener ده؟"

```javascript
// ❌ ممكن يعمل leak لو الـ element اتشال من الـ DOM
element.addEventListener("click", heavyHandler);

// ✅ الأحسن
element.addEventListener("click", heavyHandler);
// ولما تخلص:
element.removeEventListener("click", heavyHandler);
```

**2. الـ setInterval خطر لو منسيتوش:**

```javascript
// ❌ ده هيفضل شغال للأبد حتى لو الصفحة اتغيرت
const interval = setInterval(() => {
  updateDashboard();
}, 1000);

// ✅ الأحسن
const interval = setInterval(() => {
  updateDashboard();
}, 1000);

// لما تخلص من الـ component:
clearInterval(interval);
```

**3. في React، الـ useEffect محتاج cleanup:**

```javascript
// ✅ الطريقة الصح في React
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);

  return () => clearInterval(interval); // cleanup تلقائي
}, []);
```

**4. الـ Cache المفتوح للأبد:**
لو بتخزن بيانات في object أو Map، فكر مين المسؤول عن مسحها. لو محدش، هتتراكم.

```javascript
// ❌ هيكبر للأبد
const cache = {};
function saveResult(key, value) {
  cache[key] = value;
}

// ✅ استخدم WeakMap لو الـ keys كائنات
const cache = new WeakMap();
```

---

## 🛠️ إزاي تشوف Memory Leaks في المتصفح

1. افتح **Chrome DevTools** (F12)
2. روح تبويب **Memory**
3. اعمل **Heap Snapshot** قبل العملية
4. نفذ العملية اللي عايز تتحقق منها
5. اعمل **Heap Snapshot** تاني
6. قارن الاتنين — لو في كائنات اتضافت ومش اتشالت، في leak

---

## 📌 حاجات لازم تعرفها بعد الدرس ده (مرتبطة بنفس الموضوع)

- **WeakMap و WeakSet** – النسخة الـ garbage-friendly من Map و Set
- **WeakRef** – مرجع ضعيف على كائن بيخلي الـ GC يشيله لو محتاج
- **FinalizationRegistry** – بيخليك تعمل callback لما كائن بيتشال من الذاكرة

---

## 🔗 مصادر تكمل منها

**القراءة:**
- [javascript.info – Garbage Collection](https://javascript.info/garbage-collection) ← المصدر الأصلي للدرس، واضح ومفيد
- [MDN – Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management) ← شرح أعمق من MDN

**فيديوهات:**
- [Jake Archibald & Surma – Memory leaks (Chrome Dev Summit)](https://www.youtube.com/watch?v=YDU_3WdfkxA) ← بيوضوا Memory Leaks عملي في المتصفح
- [Akshay Saini – JS Engine Internals](https://www.youtube.com/watch?v=2JVomlGj5_8) ← بيشرح إزاي V8 بيشتغل من جوه بطريقة ممتازة

---

## ⚠️ غلطة شايفها كتير عند المبتدئين

بيفتكروا إن لو عملوا `delete obj` أو `obj = null` في أي مكان، الذاكرة اتحررت على طول.

الحقيقة: الذاكرة بتتحرر **لما الـ Garbage Collector يشتغل**، مش على طول. إنت بس بتقطع المرجع، والـ GC هو اللي بيشيل فعليًا.

---

## 🧠 جملة تفتكرها دايمًا

> "Don't worry about when the GC runs. Worry about whether your objects can be collected at all."

يعني: مش مهم إمتى الـ GC هيشتغل. المهم إنك مش بتمسك مراجع زيادة عن اللزوم.
