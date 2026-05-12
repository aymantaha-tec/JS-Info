# ❓ أسئلة Object Methods و this

## المستوى الأول: فهم المفاهيم

**س1:** إيه هو الـ Method في JavaScript؟

**س2:** إيه الفرق بين الـ method shorthand والطريقة الطويلة؟

**س3:** إيه المقصود بـ `this` جوه الـ method؟

**س4:** إيه اللي بيحدد قيمة الـ `this`؟ وقت التعريف ولا وقت الاستدعاء؟

**س5:** إيه اللي بيحصل لو استدعينا function عادية (مش method) وجواها `this`؟

**س6:** إيه الفرق بين الـ Arrow Function والـ Function العادية من ناحية الـ `this`؟

**س7:** إيه هو الـ Chaining وإزاي بيشتغل؟

---

## المستوى التاني: تحليل الكود

**س8:** إيه اللي هيطلع من الكود ده؟ ليه؟

```javascript
let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
};

user.sayHi();
```

---

**س9:** إيه اللي هيحصل هنا؟ في error ولا لأ؟ ليه؟

```javascript
let user = {
  name: "John",
  sayHi() {
    alert(user.name);
  }
};

let admin = user;
user = null;

admin.sayHi();
```

---

**س10:** إيه اللي هيطلع؟

```javascript
let user  = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert(this.name);
}

user.f  = sayHi;
admin.f = sayHi;

user.f();
admin.f();
```

---

**س11:** إيه اللي هيطلع من الكود ده؟ ليه؟

```javascript
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi();
```

---

**س12:** في error ولا لأ؟ ليه؟

```javascript
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();
alert(user.ref.name);
```

---

**س13:** الكود ده شغال ولا لأ؟ وإيه اللي بيطلع؟

```javascript
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert(this.step);
    return this;
  }
};

ladder.up().up().down().showStep();
```

---

## المستوى التالت: تفكير عميق

**س14:** ليه الـ `this` في JavaScript "مش مربوط" (not bound)؟ وإيه مميزات وعيوب ده؟

**س15:** إمتى تستخدم Arrow Function بدل Function عادية عشان `this` يشتغل صح؟

**س16:** إيه الفرق بين الكودين دول؟

```javascript
// كود 1
let user = {
  name: "John",
  ref: this
};

// كود 2
let user = {
  name: "John",
  ref() {
    return this;
  }
};
```

**س17:** عندك الكود ده، إزاي تعمل الـ methods تدعم الـ Chaining؟

```javascript
let cart = {
  items: [],
  addItem(item) {
    this.items.push(item);
    // إيه اللي محتاج تضيفه هنا؟
  },
  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
    // إيه اللي محتاج تضيفه هنا؟
  },
  showItems() {
    alert(this.items);
    // إيه اللي محتاج تضيفه هنا؟
  }
};
```
