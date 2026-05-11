# 📌 ملخص Garbage Collection (للمراجعة السريعة)

## المبدأ الأساسي

- الـ Garbage Collector نظام **تلقائي** في JavaScript بينضف الذاكرة.
- الكائن يفضل في الذاكرة طالما **Reachable** من الجذور.
- أول ما ينقطع عن الجذور، يبقى **Unreachable** ويتشال.
- **المرجع الداخل هو المهم**، مش الخارج.

---

## الجذور (Roots)

| نوع الجذر | مثال |
|-----------|-------|
| المتغيرات العامة | `let user = {...}` في أعلى الكود |
| الدالة الشغالة حاليًا | متغيراتها وبرامتراتها |
| سلسلة النداءات | أي دالة في الـ call stack |

---

## الخوارزمية Mark-and-Sweep

```
1. Mark  → ابدأ من الـ Roots وعلّم كل حاجة توصلها
2. Visit → زور الكائنات المتعلمة وعلّم اللي بيشاوروا عليه
3. Repeat → كرر لحد ما تزور كل حاجة Reachable
4. Sweep → أي كائن متعلمش → يتشال
```

---

## ملخص الأمثلة

| الحالة | النتيجة |
|--------|---------|
| `user = null` (مرجع واحد) | الكائن يتشال |
| `user = null` وفيه `admin` بيشاور | الكائن يفضل عايش |
| حذف كل المراجع الداخلة لكائن | الكائن يتشال حتى لو بيشاور على غيره |
| `family = null` (جزيرة كاملة) | الجزيرة كلها تتشال |

---

## التحسينات

| التحسين | الفكرة |
|---------|--------|
| Generational Collection | جديد = يتفحص كثير / قديم = أقل |
| Incremental Collection | تنظيف على دفعات صغيرة |
| Idle-time Collection | يشتغل لما الـ CPU فاضي |

---

## جمل لازم تحفظها

> "Objects are retained in memory while they are reachable."

> "Being referenced is not the same as being reachable."

> "A pack of interlinked objects can become unreachable as a whole."
