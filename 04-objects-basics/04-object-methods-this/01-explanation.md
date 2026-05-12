# 🔧 Object Methods و this في JavaScript – شرح مفصل

## 1. إيه هو الـ Method؟

في الحياة الحقيقية، الأشياء بتعمل أفعال. مثلاً المستخدم بيعمل login، بيضيف في الكارت، بيعمل logout.

في JavaScript، الأفعال دي بنعملها عن طريق **functions داخل الـ object**. الـ function اللي جوه الـ object دي اسمها **Method**.

---

## 2. إزاي تعمل Method؟

### الطريقة الأولى: Function Expression

```javascript
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!
```

ضفنا الـ method بعد ما عملنا الـ object.

---

### الطريقة التانية: Function معلنة مسبقاً

```javascript
function sayHi() {
  alert("Hello!");
}

let user = {};
user.sayHi = sayHi; // ضفنا الـ function كـ method

user.sayHi(); // Hello!
```

---

### الطريقة التالتة: Method Shorthand (الأحسن والأشهر)

```javascript
// الطريقة الطويلة
let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// الطريقة المختصرة ✅ (دي اللي بنستخدمها)
let user = {
  sayHi() {
    alert("Hello");
  }
};
```

الاتنين بيعملوا نفس الحاجة. بس الـ shorthand أنظف وأسرع في الكتابة.

---

## 3. الـ this – إزاي الـ Method تعرف هي جوه مين؟

تخيل إن عندك object فيه اسم، وعايز الـ method تقول "أهلاً يا [الاسم]". إزاي الـ method تعرف الاسم ده؟

عن طريق كلمة **`this`**.

الـ `this` جوه الـ method بتشاور على **الـ object اللي استدعى الـ method**.

```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(this.name); // this = user
  }
};

user.sayHi(); // John
```

لما كتبنا `user.sayHi()`، الـ `this` جوه الـ method بقت تساوي `user`.

---

## 4. ليه مش نستخدم اسم الـ Object بدل this؟

ممكن تكتب `user.name` بدل `this.name`، بس ده خطر:

```javascript
let user = {
  name: "John",

  sayHi() {
    alert(user.name); // ❌ خطر
  }
};

let admin = user;
user = null; // غيرنا قيمة user

admin.sayHi(); // TypeError! user بقى null
```

لو استخدمنا `this`:

```javascript
let user = {
  name: "John",

  sayHi() {
    alert(this.name); // ✅ آمن
  }
};

let admin = user;
user = null;

admin.sayHi(); // John ✅ شغال تمام
```

لأن `this` بتشاور على الـ object اللي استدعى الـ method (وهو `admin`)، مش على اسم المتغير.

---

## 5. الـ this مش مربوط (Not Bound)

في JavaScript، الـ `this` بيتحدد **وقت الاستدعاء**، مش وقت التعريف.

يعني نفس الـ function ممكن تبقى `this` فيها مختلفة حسب مين اللي استدعاها:

```javascript
let user  = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert(this.name);
}

user.f  = sayHi;
admin.f = sayHi;

user.f();  // John  (this = user)
admin.f(); // Admin (this = admin)
```

القاعدة: **اللي قبل النقطة هو الـ this.**

---

## 6. لو استدعينا الـ Function من غير Object؟

```javascript
function sayHi() {
  alert(this);
}

sayHi(); // undefined (في strict mode)
```

في **strict mode**: `this` بتبقى `undefined`.
في **non-strict mode**: `this` بتبقى الـ global object (window في المتصفح).

دي بالغالب غلطة برمجية. لو في `this` جوه function، معناها المفروض تتستدعى من object.

---

## 7. Arrow Functions و this

الـ Arrow Function **مش عندها `this` خاصة بيها**. بتاخد الـ `this` من السياق الخارجي اللي حواليها.

```javascript
let user = {
  firstName: "Ilya",

  sayHi() {
    // this هنا = user
    let arrow = () => alert(this.firstName);
    // الـ arrow بتاخد this من sayHi اللي هو user
    arrow();
  }
};

user.sayHi(); // Ilya ✅
```

لو استخدمنا function عادية بدل arrow:

```javascript
let user = {
  firstName: "Ilya",

  sayHi() {
    let inner = function() {
      alert(this.firstName); // ❌ this هنا = undefined
    };
    inner();
  }
};

user.sayHi(); // undefined ❌
```

الـ arrow function مفيدة لما عايز تستخدم `this` من السياق الخارجي جوه function داخلية.

---

## 8. مثال عملي: الـ this في Chaining

الـ Chaining هو إنك تستدعي methods على بعض في سطر واحد. عشان يشتغل، كل method لازم ترجع `this`:

```javascript
let ladder = {
  step: 0,

  up() {
    this.step++;
    return this; // ✅ مهم عشان الـ chaining يشتغل
  },

  down() {
    this.step--;
    return this; // ✅
  },

  showStep() {
    alert(this.step);
    return this; // ✅
  }
};

// بدون chaining
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1

// مع chaining ✅
ladder.up().up().down().showStep(); // 1
```

---

## 9. مثال تاني: this في makeUser

```javascript
function makeUser() {
  return {
    name: "John",
    ref: this // this هنا = ؟
  };
}

let user = makeUser();
alert(user.ref.name); // Error!
```

**ليه Error؟**
لأن `makeUser()` اتستدعت من غير object (مش `someObj.makeUser()`). فالـ `this` جوه `makeUser` = `undefined` في strict mode.

**الحل:**

```javascript
function makeUser() {
  return {
    name: "John",
    ref() {       // method مش property عادية
      return this; // this هنا = الـ object اللي استدعى ref
    }
  };
}

let user = makeUser();
alert(user.ref().name); // John ✅
```

---

## 10. الخلاصة

| المفهوم | المعنى |
|---------|--------|
| Method | function جوه object |
| `this` | الـ object اللي استدعى الـ method |
| `this` is not bound | قيمة `this` بتتحدد وقت الاستدعاء مش التعريف |
| Arrow function | مفيش `this` خاص بيها، بتاخده من السياق الخارجي |
| Chaining | كل method ترجع `this` عشان تقدر تستدعي methods على بعض |

> **القاعدة الذهبية:** الـ `this` = اللي قبل النقطة وقت الاستدعاء.
