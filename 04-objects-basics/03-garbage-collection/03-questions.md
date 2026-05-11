# ❓ أسئلة Garbage Collection

## المستوى الأول: فهم المفاهيم

**س1:** إيه هو الـ Garbage Collector وإيه وظيفته؟

**س2:** إيه المقصود بكلمة Reachable؟

**س3:** إيه المقصود بكلمة Unreachable؟

**س4:** إيه هي الـ Roots؟ اذكر 3 أمثلة عليها.

**س5:** هل الـ Garbage Collection في JavaScript يدوي ولا تلقائي؟

**س6:** إيه الفرق بين إن الكائن "مرجوع إليه" (referenced) وإنه "قابل للوصول" (reachable)؟

**س7:** إيه اسم الخوارزمية الأساسية اللي الـ Garbage Collector بيستخدمها؟

**س8:** اشرح خطوات خوارزمية Mark-and-Sweep بالترتيب.

---

## المستوى التاني: تحليل الكود

**س9:** بعد تنفيذ الكود ده، هل الكائن `{ name: "John" }` هيتشال؟ ليه؟

```javascript
let user = { name: "John" };
user = null;
```

---

**س10:** بعد تنفيذ الكود ده، هل الكائن `{ name: "John" }` هيتشال؟ ليه؟

```javascript
let user = { name: "John" };
let admin = user;
user = null;
```

---

**س11:** بعد تنفيذ الكود ده، هل الكائن `{ name: "John" }` هيتشال؟ ليه؟

```javascript
let user = { name: "John" };
let admin = user;
user = null;
admin = null;
```

---

**س12:** في الكود ده، مين هيتشال ومين هيفضل في الذاكرة بعد الـ delete؟

```javascript
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;
  return { father: man, mother: woman };
}

let family = marry({ name: "John" }, { name: "Ann" });
delete family.father;
delete family.mother.husband;
```

---

**س13:** إيه اللي هيحصل لو عملنا كده؟

```javascript
let family = marry({ name: "John" }, { name: "Ann" });
family = null;
```

---

**س14:** الكود ده هيحصل فيه إيه؟ هل `obj` هيتشال؟

```javascript
let obj = { data: "important" };
let arr = [obj];
obj = null;
```

---

**س15:** هل الكائنين دول هيتشالوا؟ ليه؟

```javascript
let a = { val: 1 };
let b = { val: 2 };
a.next = b;
b.prev = a;
a = null;
b = null;
```

---

## المستوى التالت: تفكير عميق

**س16:** جون بيشاور على آن، وآن بتشاور على جون، بس مفيش جذر بيشاور على أي منهم. هل هيتشالوا؟ ليه؟

**س17:** ليه المراجع الخارجة من كائن مش كافية إنه يفضل في الذاكرة؟

**س18:** إيه الفرق بين Generational Collection و Incremental Collection؟

**س19:** ليه الـ Garbage Collector بيحاول يشتغل وقت الـ CPU فاضي؟

**س20:** ممكن تجبر الـ Garbage Collector يشتغل في JavaScript؟ ليه؟
