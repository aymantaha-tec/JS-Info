# 🎯 Interview Questions – Garbage Collection in JavaScript

---

## Q1: What is Garbage Collection in JavaScript?

**Answer:**
Garbage Collection is an automatic memory management process built into the JavaScript engine. It identifies objects that are no longer reachable from the program and frees the memory they occupy. The developer does not need to manually allocate or deallocate memory.

---

## Q2: What does "reachable" mean in the context of memory management?

**Answer:**
A value is considered reachable if it can be accessed through a chain of references starting from a root. Reachable values are guaranteed to stay in memory. If no path exists from any root to an object, it is unreachable and will be collected.

---

## Q3: What are "roots" in JavaScript's garbage collection?

**Answer:**
Roots are the starting points the garbage collector uses to determine reachability. They include:
- Global variables
- The currently executing function and its local variables and parameters
- Any functions in the current call chain (call stack)

---

## Q4: What is wrong with this code, and how would you fix it?

```javascript
let cache = {};

function saveUser(user) {
  cache[user.id] = user;
}

function removeUser(user) {
  user = null; // developer thinks this removes the user from memory
}

let myUser = { id: 1, name: "Ahmed" };
saveUser(myUser);
removeUser(myUser);
```

**Answer:**
Setting `user = null` inside `removeUser` only reassigns the local parameter. It does not affect the original object, which is still referenced by `cache[1]`. As long as `cache` (a global variable = root) holds a reference, the object remains reachable and will not be collected.

**Fix:**
```javascript
function removeUser(id) {
  delete cache[id]; // removes the reference from cache itself
}
```

---

## Q5: What is the difference between an object being "referenced" and being "reachable"?

**Answer:**
An object can be referenced by another object but still be unreachable if that other object itself has no path from a root. Reachability requires an unbroken chain of references starting from a root — not just any reference.

Example: If `A` references `B`, but nothing references `A` from a root, then both `A` and `B` are unreachable, even though `B` is technically referenced.

---

## Q6: Explain what happens in memory after each step:

```javascript
// Step 1
let user = { name: "John" };

// Step 2
let admin = user;

// Step 3
user = null;

// Step 4
admin = null;
```

**Answer:**
- **Step 1:** Object `{ name: "John" }` is created. `user` (root) references it. → Reachable ✅
- **Step 2:** `admin` also references the same object. Object now has two incoming references. → Reachable ✅
- **Step 3:** `user` is set to null. Object still reachable via `admin`. → Reachable ✅
- **Step 4:** `admin` is set to null. No root references the object anymore. → Unreachable ❌ → will be collected.

---

## Q7: What is an "unreachable island" and when does it occur?

**Answer:**
An unreachable island is a group of objects that reference each other internally but have no incoming reference from any root. Even though they are interconnected, they cannot be reached from the program and will all be collected together.

```javascript
let family = marry({ name: "John" }, { name: "Ann" });
family = null;
// John and Ann still reference each other internally,
// but no root points to any of them → entire island is collected
```

---

## Q8: What is the Mark-and-Sweep algorithm?

**Answer:**
Mark-and-Sweep is the core garbage collection algorithm:

1. **Mark:** Start from all roots and mark every reachable object.
2. **Visit:** Follow references from marked objects and mark those too.
3. **Repeat:** Continue until all reachable objects are marked.
4. **Sweep:** Remove every object that was not marked.

Everything that could not be reached from the roots is considered garbage and freed.

---

## Q9: What is the difference between `Map` and `WeakMap` regarding garbage collection?

**Answer:**
- A `Map` holds **strong references** to its keys. Even if the key object has no other references, the `Map` keeps it alive.
- A `WeakMap` holds **weak references** to its keys. If the key object becomes unreachable from all other references, the garbage collector can collect it — even if it still exists as a `WeakMap` key.

```javascript
let map = new Map();
let key = { id: 1 };
map.set(key, "data");
key = null;
// { id: 1 } is still alive — Map holds a strong reference

let weakMap = new WeakMap();
let key2 = { id: 2 };
weakMap.set(key2, "data");
key2 = null;
// { id: 2 } can now be collected — WeakMap holds a weak reference
```

**Use `WeakMap`** when you want cached data tied to an object to be automatically cleaned up when that object is no longer needed.

---

## Q10: Is there a memory leak in this code? If yes, explain why and how to fix it.

```javascript
function setupButton() {
  let button = document.getElementById("myButton");
  let bigData = new Array(1000000).fill("x");

  button.addEventListener("click", function () {
    console.log(bigData.length);
  });

  button.remove();
}
```

**Answer:**
Yes, there is a memory leak.

**Why:** The click handler forms a closure over `bigData`. Even after `button.remove()` removes the element from the DOM, the button object still exists in memory because the event listener is attached to it, and that listener holds a reference to `bigData`. The garbage collector cannot collect either.

**Fix:**
```javascript
function setupButton() {
  let button = document.getElementById("myButton");
  let bigData = new Array(1000000).fill("x");

  function handleClick() {
    console.log(bigData.length);
  }

  button.addEventListener("click", handleClick);
  button.removeEventListener("click", handleClick); // remove listener first
  button.remove();
}
```

---

## Q11: Can you force the garbage collector to run in JavaScript?

**Answer:**
No. JavaScript does not expose any API to manually trigger garbage collection. The engine decides when to run it based on memory pressure and internal heuristics. Even in Node.js, methods that appear to trigger GC are not guaranteed and should not be relied upon in production code.

---

## Q12: What are the three main optimization strategies modern JS engines use for garbage collection?

**Answer:**

| Strategy | How it works |
|----------|-------------|
| **Generational Collection** | Splits objects into "new" and "old". New objects are checked frequently since most die young. Old objects are checked less often. |
| **Incremental Collection** | Splits the collection work into small chunks instead of one large pause, reducing visible delays. |
| **Idle-time Collection** | Runs garbage collection only when the CPU is idle, avoiding interference with active execution. |
