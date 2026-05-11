const fs = require('fs');
const path = require('path');

const lessons = {
  '01-introduction': ['01-intro-to-js','02-manuals-specs','03-code-editors','04-dev-console'],
  '02-fundamentals': ['01-hello-world','02-code-structure','03-use-strict','04-variables','05-data-types','06-alert-prompt-confirm','07-type-conversions','08-basic-operators','09-comparisons','10-conditionals','11-logical-operators','12-nullish-coalescing','13-loops','14-switch','15-functions','16-function-expressions','17-arrow-functions','18-javascript-specials'],
  '03-code-quality': ['01-debugging','02-coding-style','03-comments','04-ninja-code','05-automated-testing','06-polyfills'],
  '04-objects-basics': ['01-objects','02-object-references','03-garbage-collection','04-object-methods-this','05-constructor-new','06-optional-chaining','07-symbol-type','08-object-to-primitive'],
  '05-data-types': ['01-methods-of-primitives','02-numbers','03-strings','04-arrays','05-array-methods','06-iterables','07-map-set','08-weakmap-weakset','09-object-keys-values','10-destructuring','11-date-time','12-json-methods'],
  '06-advanced-functions': ['01-recursion-stack','02-rest-spread','03-scope-closure','04-var','05-global-object','06-function-object-nfe','07-new-function','08-scheduling','09-decorators-call-apply','10-function-binding','11-arrow-functions-revisited'],
  '07-object-properties': ['01-property-flags','02-getters-setters'],
  '08-prototypes': ['01-prototypal-inheritance','02-f-prototype','03-native-prototypes','04-prototype-methods'],
  '09-classes': ['01-class-basic','02-class-inheritance','03-static-properties','04-private-protected','05-extending-built-in','06-instanceof','07-mixins'],
  '10-error-handling': ['01-try-catch','02-custom-errors'],
  '11-promises': ['01-callbacks','02-promise','03-promise-chaining','04-error-handling-promises','05-promise-api','06-promisification','07-microtasks','08-async-await'],
  '12-generators': ['01-generators','02-async-iteration'],
  '13-modules': ['01-modules-intro','02-export-import','03-dynamic-imports'],
  '14-miscellaneous': ['01-proxy-reflect','02-eval','03-currying','04-reference-type','05-bigint','06-unicode','07-weakref-finalization'],
};

const files = ['01-explanation.md', '02-summary.md', '03-questions.md', '04-answers.md', '05-advanced.md', '06 interview', '07 notes'];

for (const [chapter, items] of Object.entries(lessons)) {
  for (const lesson of items) {
    const dir = path.join(chapter, lesson);
    fs.mkdirSync(dir, { recursive: true });
    for (const file of files) {
      fs.writeFileSync(path.join(dir, file), '');
    }
  }
}

console.log('✅ All folders and files created!');