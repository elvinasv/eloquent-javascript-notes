# Eloquent JavaScript 3nd Edition
- This document is used for notes and code snippets from Eloquent JavaScript book.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Eloquent JavaScript 3nd Edition](#eloquent-javascript-3nd-edition)
	- [Chapter 3 - Functions](#chapter-3-functions)
	- [Chapter 4 - Data Structures](#chapter-4-data-structures)
	- [Chapter 5 - Higher-order functions](#chapter-5-higher-order-functions)

<!-- /TOC -->
## Chapter 3 - Functions
- Functions can have multiple levels of locality (i.e. nested functions).
- Child function can see the values of parent, but parent cannot see child's values.
- Functions as values - function values can be handled the same way as regular values - passed as a parameter, stored in a new binding.
- Difference between **defining** and **declaring** a function.
  - Function declaration is not part of top-to-bottom flow of control.

```js
// Defining a function
const squareDef = function(x){
  return x * x;
};
console.log(squareDef(12));
// -> 144

// Declaring notation
console.log(squareDec)
function squareDec(x) {
  return x * x;
}
```
- **Arrow functions** - almost identical to function expression. "This input (parameters) produce this result (body)".
```js
const horn = () => { console.log("Toot"); };
const square1 = (x) => {return x * x; };
```
- **Closure** - a function that closes over some local bindings.  
```js
/*
Multiplier is called, and creates an environment in which its
factor parameter is bound to 2. The function value it returns,
which is stored in twice, remembers this environment. When called, it
multiplies its argument by 2.
*/
function multiplier(factor) {
return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
// → 10
```
- Functions that are called for their **side effects** vs for **return values**. The ones that are called for return for return values are more flexible.
## Chapter 4 - Data Structures
Objects
- Peanuts eater example - http://eloquentjavascript.net/code/chapter/04_data.js
- **String and their properties**
  - Values of type string, number, Boolean are not objects and although they have built-in properties, new properties cannot be added.
  - `str.trim()` - removes whitespace from start and end.
- **Rest parameters**
```js
function findMax(...numbers) {
  //do smth
}
```
- **Rest operator** can also be used to spread the array to the method that accepts only separate arguments.
- **JSON**
  - `JSON.stringify` - convert data to JSON (takes a value and returns JSON-encoded string).
  - `JSON.parse` - convert data from json to object.

## Chapter 5 - Higher-order functions
- **Tip** - try to notice when you are working at too low a level of abstraction.
- **Higher-order functions** can be useful when we want to abstract some functionality. Its done by passing function values to other functions.
- **forEach** (built-in array method).
```js
["A", "B"].forEach(l => console.log(l));
// → A
// → B
```
- **Filtering arrays** - create a new array with the elements that pass the test
```js
function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
  return passed;
}
console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
```
- **Transforming with map** - create a new array with the results of calling a provided function on every element in the calling array.
```js
function map(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}
let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]
```
- **Summarizing with reduce**
  - Build a value by repeatedly taking a single element from the array and combining it with the previous value.
```js
function reduce(array, combine, start) {
  let current = start;
    for (let element of array) {
      current = combine(current, element);
    }
  return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```
- Strings and character codes
  - Unicode and UTF-16, where some characters might take two units (and cause some issues). Solution - use `codePointAt(0)` on character (which will be a string of one or two code units) to get its code.
- **Recognizing text**
