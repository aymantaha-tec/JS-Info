# 🚀 أسئلة Advanced – Object Methods و this (مع الإجابات والأسباب)

## تحدي 1: this في setTimeout

الكود ده فيه مشكلة. إيه هي وإزاي تحلها؟

```javascript
let user = {
  name: "Ahmed",
  greet() {
    setTimeout(function() {
      alert(this.name); // ❌ مش هيشتغل صح
    }, 1000);
  }
};

user.greet();
```

### الإجابة:

**المشكلة:** الـ function جوه `setTimeout` عادية، مش arrow. فالـ `this` جوها مش `user`، هي `undefined` في strict mode أو `window` في المتصفح.

**3 حلول:**

```javascript
// الحل 1: Arrow Function ✅ (الأفضل)
let user = {
  name: "Ahmed",
  greet() {
    setTimeout(() => {
      alert(this.name); // this من greet = user
    }, 1000);
  }
};

// الحل 2: حفظ this في متغير
let user = {
  name: "Ahmed",
  greet() {
    let self = this;
    setTimeout(function() {
      alert(self.name);
    }, 1000);
  }
};

// الحل 3: bind
let user = {
  name: "Ahmed",
  greet() {
    setTimeout(function() {
      alert(this.name);
    }.bind(this), 1000);
  }
};
```

---

## تحدي 2: إيه اللي هيطلع؟

```javascript
let obj = {
  go() { alert(this); }
};

(obj.go)();          // ؟
(obj.go = obj.go)(); // ؟
(obj.go, obj.go)();  // ؟
```

### الإجابة:

**`(obj.go)()`:** هيطلع `[object Object]`. الأقواس مش بتغير حاجة، لسه بنستدعي `obj.go()` بشكل طبيعي. `this` = `obj`.

**`(obj.go = obj.go)()`:** هيطلع `undefined`. عملية الـ assignment بترجع الـ function نفسها بدون ارتباط بالـ object. فالـ `this` = `undefined`.

**`(obj.go, obj.go)()`:** هيطلع `undefined`. عملية الـ comma operator بترجع الـ value الأخيرة (الـ function) بدون ارتباط بالـ object. فالـ `this` = `undefined`.

**السبب:** أي عملية على الـ method غير الاستدعاء المباشر `obj.method()` بتقطع الارتباط بالـ object.

---

## تحدي 3: Calculator Object

اعمل object اسمه `calculator` بـ 3 methods:
- `read()`: بتطلب من المستخدم رقمين وتخزنهم كـ `a` و`b`
- `sum()`: بترجع مجموع `a` و`b`
- `mul()`: بترجع حاصل ضرب `a` في `b`

### الإجابة:

```javascript
let calculator = {
  a: 0,
  b: 0,

  read() {
    this.a = +prompt("Enter first number:", 0);
    this.b = +prompt("Enter second number:", 0);
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());
```

**ملاحظة:** الـ `+` قبل `prompt` بتحول الـ string لـ number.

---

## تحدي 4: this في Class-like Pattern

إيه اللي هيطلع وليه؟

```javascript
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert(this.name);
  };

  this.sayHiArrow = () => {
    alert(this.name);
  };
}

let user1 = new User("Ahmed");
let user2 = new User("Sara");

let hi1 = user1.sayHi;
let hi2 = user1.sayHiArrow;

hi1(); // ؟
hi2(); // ؟
```

### الإجابة:

**`hi1()`:** هيطلع `undefined` أو error. لأن `sayHi` function عادية، والـ `this` بتتحدد وقت الاستدعاء. لما استدعيناها من غير object (`hi1()`)، الـ `this` = `undefined`.

**`hi2()`:** هيطلع `"Ahmed"`. لأن `sayHiArrow` arrow function، والـ `this` فيها اتحدد وقت التعريف (جوه `new User("Ahmed")`) وهو `user1`. الـ arrow بتحتفظ بالـ `this` بتاع السياق اللي اتعرفت فيه.

---

## تحدي 5: Chaining مع Conditions

اعمل object `builder` بيبني جملة، كل method بتضيف كلمة، ومحتاج يدعم الـ chaining:

```javascript
// المطلوب يشتغل كده:
let result = builder
  .add("Hello")
  .add("World")
  .add("from")
  .add("JavaScript")
  .build();

alert(result); // "Hello World from JavaScript"
```

### الإجابة:

```javascript
let builder = {
  words: [],

  add(word) {
    this.words.push(word);
    return this; // ✅ مهم للـ chaining
  },

  build() {
    return this.words.join(" ");
    // مش محتاج return this هنا لأنها آخر method في الـ chain
  }
};

let result = builder
  .add("Hello")
  .add("World")
  .add("from")
  .add("JavaScript")
  .build();

alert(result); // "Hello World from JavaScript" ✅
```
