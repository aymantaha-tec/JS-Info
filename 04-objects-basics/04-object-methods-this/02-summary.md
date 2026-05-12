# 📌 ملخص Object Methods و this (للمراجعة السريعة)

## الـ Method

- الـ Method هي function جوه object.
- بنستدعيها بـ `object.methodName()`.
- الـ shorthand syntax هي الأشهر والأنظف.

```javascript
let user = {
  sayHi() {       // method shorthand
    alert("Hi");
  }
};
user.sayHi();
```

---

## الـ this

| الحالة | قيمة this |
|--------|-----------|
| `obj.method()` | `obj` |
| `function()` بدون object | `undefined` (strict) / global (non-strict) |
| Arrow function | مأخوذة من السياق الخارجي |

---

## القاعدة الأساسية

> **this = اللي قبل النقطة وقت الاستدعاء.**

```javascript
user.sayHi();  // this = user
admin.sayHi(); // this = admin
```

---

## ليه this ومش اسم الـ Object؟

```javascript
// ❌ خطر
sayHi() { alert(user.name); }

// ✅ آمن
sayHi() { alert(this.name); }
```

لو نسخت الـ object لمتغير تاني ومسحت الأول، `this` هيشتغل وأسم الـ object هيطلع error.

---

## Arrow Function و this

```javascript
let user = {
  name: "Ilya",
  sayHi() {
    let arrow = () => alert(this.name); // this من sayHi = user ✅
    arrow();
  }
};
```

الـ arrow بتاخد `this` من الـ function العادية اللي حواليها.

---

## Chaining

لازم كل method ترجع `this`:

```javascript
up()       { this.step++; return this; }
down()     { this.step--; return this; }
showStep() { alert(this.step); return this; }

ladder.up().up().down().showStep(); // ✅
```
