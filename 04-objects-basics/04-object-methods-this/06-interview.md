# 🎯 Interview Questions – Object Methods & "this" in JavaScript

---

## Q1: What is a method in JavaScript?

**Answer:**
A method is a function stored as a property of an object. It allows objects to perform actions. Methods are called using dot notation: `object.methodName()`.

```javascript
let user = {
  name: "John",
  sayHi() {        // this is a method
    alert("Hi!");
  }
};
user.sayHi();
```

---

## Q2: What does `this` refer to inside a method?

**Answer:**
Inside a method, `this` refers to the object that called the method — the object "before the dot" at call time.

```javascript
let user = {
  name: "John",
  sayHi() {
    alert(this.name); // this = user
  }
};
user.sayHi(); // "John"
```

---

## Q3: What is wrong with this code and how would you fix it?

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

**Answer:**
The method references `user.name` directly instead of `this.name`. When `user` is set to `null`, the method tries to access `null.name`, causing a TypeError.

**Fix:**
```javascript
sayHi() {
  alert(this.name); // always points to the calling object
}
```

---

## Q4: What is the output of this code and why?

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

**Answer:**
- `user.f()` → `"John"` because `this` = `user`
- `admin.f()` → `"Admin"` because `this` = `admin`

The same function produces different results because `this` is determined at call time based on what is before the dot.

---

## Q5: What is the difference between arrow functions and regular functions regarding `this`?

**Answer:**
- **Regular function:** Has its own `this`, determined at call time.
- **Arrow function:** Has no `this` of its own. It inherits `this` from the surrounding lexical scope (where it was defined).

```javascript
let user = {
  name: "Ilya",
  sayHi() {
    let arrow = () => alert(this.name); // this from sayHi = user
    arrow(); // "Ilya" ✅
  }
};
```

If `arrow` were a regular function, `this` would be `undefined`.

---

## Q6: What does this output and why?

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

**Answer:**
This throws a **TypeError**. `makeUser()` is called without an object, so `this` inside it is `undefined` (in strict mode). Therefore `ref: this` assigns `undefined` to `ref`, and `undefined.name` throws an error.

**Fix — make `ref` a method:**
```javascript
function makeUser() {
  return {
    name: "John",
    ref() { return this; }
  };
}
let user = makeUser();
alert(user.ref().name); // "John" ✅
```

---

## Q7: What is method chaining and how do you implement it?

**Answer:**
Method chaining allows calling multiple methods on the same object in a single expression. To enable it, each method must return `this`.

```javascript
let ladder = {
  step: 0,
  up()       { this.step++; return this; },
  down()     { this.step--; return this; },
  showStep() { alert(this.step); return this; }
};

ladder.up().up().down().showStep(); // 1
```

---

## Q8: How does `this` behave when a method is called without an object?

**Answer:**
In strict mode, `this` is `undefined`. In non-strict mode, `this` defaults to the global object (`window` in browsers). This is usually a programming error — if a function uses `this`, it expects to be called as a method.

```javascript
function sayHi() {
  alert(this); // undefined (strict) or window (non-strict)
}
sayHi();
```

---

## Q9: Fix the memory leak in this code:

```javascript
let user = {
  name: "Ahmed",
  greet() {
    setTimeout(function() {
      alert(this.name); // bug: this is not user
    }, 1000);
  }
};
user.greet();
```

**Answer:**
Replace the regular function with an arrow function so it inherits `this` from `greet`:

```javascript
let user = {
  name: "Ahmed",
  greet() {
    setTimeout(() => {
      alert(this.name); // ✅ this = user
    }, 1000);
  }
};
user.greet(); // "Ahmed"
```

---

## Q10: What is the output of each line and why?

```javascript
let obj = {
  go() { alert(this); }
};

(obj.go)();           // ?
(obj.go = obj.go)();  // ?
(obj.go, obj.go)();   // ?
```

**Answer:**
- `(obj.go)()` → `[object Object]` — parentheses do not change anything; `this` = `obj`.
- `(obj.go = obj.go)()` → `undefined` — the assignment expression returns the function value without the object binding.
- `(obj.go, obj.go)()` → `undefined` — the comma operator returns the last value without object binding.

**Key insight:** Any operation on a method other than a direct `obj.method()` call loses the object binding.

---

## Q11: When would you choose an arrow function over a regular function inside an object method?

**Answer:**
When you need to use the outer method's `this` inside a nested function (like a callback, `setTimeout`, or `forEach`):

```javascript
let user = {
  name: "Ahmed",
  friends: ["Sara", "Ali"],

  greetFriends() {
    // ✅ arrow inherits this from greetFriends
    this.friends.forEach(friend => {
      alert(`${this.name} says hi to ${friend}`);
    });
  }
};
user.greetFriends();
// "Ahmed says hi to Sara"
// "Ahmed says hi to Ali"
```

Using a regular function inside `forEach` would lose the `user` binding.
