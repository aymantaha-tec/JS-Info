# ✅ إجابات أسئلة Object Methods و this

## المستوى الأول: فهم المفاهيم

**س1:** إيه هو الـ Method؟

**الإجابة:**
الـ Method هي function مخزنة كـ property جوه object. بنستدعيها بـ `object.methodName()`. بتخلي الـ object يعمل أفعال.

---

**س2:** إيه الفرق بين الـ shorthand والطريقة الطويلة؟

**الإجابة:**
```javascript
// طويلة
let user = { sayHi: function() { alert("Hi"); } };

// shorthand ✅
let user = { sayHi() { alert("Hi"); } };
```
الاتنين بيعملوا نفس الحاجة تقريباً. الـ shorthand أنظف والأشهر في الاستخدام. الفرق الوحيد في بعض حالات الـ inheritance المتقدمة.

---

**س3:** إيه المقصود بـ `this`؟

**الإجابة:**
`this` جوه الـ method بتشاور على الـ object اللي استدعى الـ method. بتخلي الـ method توصل لبيانات الـ object اللي هي جوه.

---

**س4:** إيه اللي بيحدد قيمة الـ `this`؟

**الإجابة:**
وقت **الاستدعاء** مش التعريف. يعني نفس الـ function ممكن يكون `this` فيها مختلف حسب مين اللي استدعاها. القاعدة: اللي قبل النقطة = الـ `this`.

---

**س5:** إيه اللي بيحصل لو استدعينا function عادية وجواها `this`؟

**الإجابة:**
في **strict mode**: `this` = `undefined`.
في **non-strict mode**: `this` = الـ global object (window).
في الحالتين ده بيبقى غلطة برمجية في الغالب.

---

**س6:** الفرق بين Arrow Function والعادية من ناحية `this`؟

**الإجابة:**
- **Function عادية:** عندها `this` خاص بيها بيتحدد وقت الاستدعاء.
- **Arrow Function:** مفيش `this` خاص بيها. بتاخد `this` من الـ scope الخارجي اللي عرفت فيه.

---

**س7:** إيه الـ Chaining وإزاي بيشتغل؟

**الإجابة:**
الـ Chaining هو استدعاء methods على بعض في سطر واحد: `obj.method1().method2().method3()`. عشان يشتغل، كل method لازم ترجع `this` في الآخر.

---

## المستوى التاني: تحليل الكود

**س8:**

```javascript
user.sayHi(); // John
```

**الإجابة:**
هيطلع `John`. لأن `user.sayHi()` استدعت الـ method من `user`، فالـ `this` جوه = `user`، و`this.name` = `"John"`.

---

**س9:**

```javascript
admin.sayHi(); // TypeError
```

**الإجابة:**
هيطلع **TypeError**. لأن جوه الـ method كتبنا `user.name` بدل `this.name`. لما عملنا `user = null`، الـ method بتحاول توصل لـ `user.name` بس `user` بقى `null`. لو كتبنا `this.name`، كان هيشتغل تمام لأن `this` = `admin`.

---

**س10:**

```javascript
user.f();  // John
admin.f(); // Admin
```

**الإجابة:**
نفس الـ function بس `this` بتتغير حسب مين اللي استدعاها. `user.f()` → `this` = `user` → `"John"`. `admin.f()` → `this` = `admin` → `"Admin"`.

---

**س11:**

```javascript
user.sayHi(); // Ilya
```

**الإجابة:**
هيطلع `Ilya`. الـ arrow function مفيش عندها `this` خاص. بتاخد `this` من `sayHi` اللي `this` فيها = `user`. فـ `this.firstName` = `"Ilya"`.

---

**س12:**

**الإجابة: هيطلع Error.**
`makeUser()` اتستدعت من غير object. فالـ `this` جوه `makeUser` = `undefined` (strict mode). فـ `ref: this` = `ref: undefined`. ولما نحاول نعمل `user.ref.name`، بنحاول نعمل `undefined.name` وده Error.

**الحل:**
```javascript
function makeUser() {
  return {
    name: "John",
    ref() { return this; } // method مش property
  };
}
let user = makeUser();
alert(user.ref().name); // John ✅
```

---

**س13:**

```javascript
ladder.up().up().down().showStep(); // 1
```

**الإجابة:**
هيطلع `1` وهيشتغل تمام. `up()` بيعمل `step++` ويرجع `this`. فنقدر نستدعي `up()` تاني على نفس الـ object. `up().up()` → step = 2. `.down()` → step = 1. `.showStep()` → يطبع 1.

---

## المستوى التالت: تفكير عميق

**س14:** ليه الـ `this` "مش مربوط"؟

**الإجابة:**
في JavaScript، الـ `this` بيتحدد وقت الاستدعاء مش التعريف. ده بيخلي نفس الـ function تتستخدم مع objects مختلفة.

**المميزات:** مرونة أكبر، function واحدة تخدم objects كتير.
**العيوب:** سهل تعمل غلطة لو منتبهتش لمين اللي بيستدعي الـ function.

---

**س15:** إمتى تستخدم Arrow Function؟

**الإجابة:**
لما تكون جوه method وعايز تستخدم `this` بتاع الـ method دي في function داخلية:

```javascript
let user = {
  name: "Ahmed",
  greet() {
    // محتاج this = user جوه الـ setTimeout
    setTimeout(() => {
      alert(this.name); // ✅ arrow بتاخد this من greet
    }, 1000);
  }
};
```

لو استخدمنا function عادية، `this` جوه الـ setTimeout كانت هتبقى `undefined`.

---

**س16:** الفرق بين الكودين؟

**الإجابة:**
```javascript
// كود 1: ref هنا property عادية
let user = { name: "John", ref: this };
// this هنا = undefined (بره أي object)
// user.ref = undefined

// كود 2: ref هنا method
let user = { name: "John", ref() { return this; } };
// this هنا بتتحدد وقت الاستدعاء
// user.ref() → this = user ✅
```

---

**س17:** إزاي تعمل Chaining؟

**الإجابة:**
```javascript
let cart = {
  items: [],
  addItem(item) {
    this.items.push(item);
    return this; // ✅
  },
  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
    return this; // ✅
  },
  showItems() {
    alert(this.items);
    return this; // ✅
  }
};

// دلوقتي الـ chaining شغال
cart.addItem("apple").addItem("banana").removeItem("apple").showItems(); // banana
```
