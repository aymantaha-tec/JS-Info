# 🚀 أسئلة Advanced – Garbage Collection (مع الإجابات والأسباب)

## تحدي 1: تتبع الذاكرة خطوة بخطوة

اتبع الكود ده وقول في كل سطر مين Reachable ومين Unreachable:

```javascript
let obj1 = { name: "A" };        // السطر 1
let obj2 = { name: "B" };        // السطر 2
obj1.ref = obj2;                  // السطر 3
obj2.ref = obj1;                  // السطر 4
let holder = { first: obj1 };    // السطر 5
obj1 = null;                      // السطر 6
obj2 = null;                      // السطر 7
holder = null;                    // السطر 8
```

### الإجابة:

| السطر | الحالة |
|-------|--------|
| 1 | `{ name: "A" }` Reachable عن طريق `obj1` (جذر) |
| 2 | `{ name: "B" }` Reachable عن طريق `obj2` (جذر) |
| 3 | `obj1.ref` بيشاور على `{ name: "B" }` – الاتنين Reachable |
| 4 | `obj2.ref` بيشاور على `{ name: "A" }` – الاتنين Reachable |
| 5 | `holder` (جذر) بيشاور على `{ name: "A" }` – الكل Reachable |
| 6 | `obj1 = null`. `{ name: "A" }` لسه Reachable عن طريق `holder.first` |
| 7 | `obj2 = null`. `{ name: "B" }` لسه Reachable عن طريق `holder.first.ref` |
| 8 | `holder = null`. مفيش جذر. **الكل Unreachable وهيتشال** |

**السبب:** في السطر 8، `holder` كان الجذر الوحيد اللي بيربط كل الكائنات. لما انقطع، الجزيرة كلها انعزلت.

---

## تحدي 2: كشف خطأ شائع

```javascript
let cache = {};

function saveUser(user) {
  cache[user.id] = user;
}

function removeUser(user) {
  user = null; // المبرمج فاكر إنه مسح الـ user
}

let myUser = { id: 1, name: "Ahmed", data: new Array(1000000).fill("x") };
saveUser(myUser);
removeUser(myUser);

// السؤال: هل myUser اتشال من الذاكرة؟
```

### الإجابة: **لأ، مش هيتشال.**

**السبب:**
`user = null` جوه الدالة بيغير النسخة المحلية من المتغير بس، مش الكائن الأصلي. الكائن نفسه لسه موجود في `cache[1]`. طالما `cache` (متغير عام = جذر) لسه بيشاور على الكائن، هو Reachable ومش هيتشال.

**الحل الصح:**

```javascript
function removeUser(id) {
  delete cache[id]; // امسح المرجع من الـ cache نفسه
}
```

---

## تحدي 3: WeakMap vs Map

```javascript
// Map عادي
let map = new Map();
let key = { id: 1 };
map.set(key, "some data");
key = null;
// الكائن { id: 1 } مش هيتشال

// WeakMap
let weakMap = new WeakMap();
let key2 = { id: 2 };
weakMap.set(key2, "some data");
key2 = null;
// الكائن { id: 2 } هيتشال
```

### الإجابة والسبب:

**Map العادي:**
الـ Map بيمسك مرجع قوي (strong reference) على الـ keys. يعني حتى لو `key = null`، الـ Map نفسه لسه بيشاور على الكائن، فهو Reachable ومش هيتشال.

**WeakMap:**
الـ WeakMap بيمسك مرجع ضعيف (weak reference) على الـ keys. يعني لو مفيش مرجع تاني على الكائن غير الـ WeakMap، الـ Garbage Collector يقدر يشيله. لما `key2 = null`، الكائن بقى Unreachable والـ Garbage Collector هيشيله.

**إمتى تستخدم كل واحد:**
- `Map` لما محتاج تحتفظ بالبيانات حتى لو الـ key اتمسح
- `WeakMap` لما عايز البيانات تتشال تلقائيًا لما الـ key بيبقى Unreachable (مثلًا: caching بيانات مرتبطة بـ DOM elements)

---

## تحدي 4: Memory Leak عملي

```javascript
function setupButton() {
  let button = document.getElementById("myButton");
  let bigData = new Array(1000000).fill("important");

  button.addEventListener("click", function() {
    console.log(bigData.length);
  });

  button.remove(); // مسحنا الـ button من الـ DOM
}
```

### السؤال: هل `bigData` اتشال من الذاكرة؟

### الإجابة: **لأ، `bigData` مش هيتشال. ده Memory Leak.**

**السبب:**
الـ event listener (دالة الـ click) بتعمل closure على `bigData`. يعني الدالة دي جواها مرجع على `bigData`. طالما الـ event listener موجود، `bigData` موجود. ومع إننا عملنا `button.remove()`، الـ button نفسه لسه موجود في الذاكرة مع الـ event listener المرتبط بيه.

**الحل:**

```javascript
function setupButton() {
  let button = document.getElementById("myButton");
  let bigData = new Array(1000000).fill("important");

  function handleClick() {
    console.log(bigData.length);
  }

  button.addEventListener("click", handleClick);

  // لما بنمسح الـ button، نشيل الـ listener الأول
  button.removeEventListener("click", handleClick);
  button.remove();
}
```

---

## تحدي 5: سؤال تصميم Cache

**السؤال:** عايز تبني Cache بيخزن نتايج API calls، والكائنات تتشال تلقائيًا لو ملقتش استخدام.

### الإجابة: **استخدم `WeakMap`**

```javascript
// الطريقة العادية (المشكلة):
const cache = {};
cache["user_1"] = { name: "Ahmed", ...bigData };
// الكائن هيفضل في الذاكرة للأبد حتى لو محدش بيستخدمه

// الطريقة الصح:
const cache = new WeakMap();

function getData(keyObject) {
  if (cache.has(keyObject)) {
    return cache.get(keyObject); // رجع من الـ cache
  }

  const data = fetchFromAPI(keyObject); // جيب من الـ API
  cache.set(keyObject, data);
  return data;
}
```

**السبب:**
لما `keyObject` بيبقى Unreachable (يعني محدش بيستخدمه)، الـ WeakMap بيخلي الـ Garbage Collector يشيل الـ entry كلها تلقائيًا. مش محتاج تمسح يدويًا.

**القيد:** الـ WeakMap بيقبل كائنات بس كـ keys، مش strings أو numbers.
