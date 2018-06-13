# Eloquent JavaScript 3nd Edition
- This document is used for notes and code snippets from Eloquent JavaScript book.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Eloquent JavaScript 3nd Edition](#eloquent-javascript-3nd-edition)
	- [Chapter 3 - Functions](#chapter-3-functions)
	- [Chapter 4 - Data Structures](#chapter-4-data-structures)
	- [Chapter 5 - Higher-order functions](#chapter-5-higher-order-functions)
	- [Chapter 6 - OOP](#chapter-6-oop)
	- [Chapter 7 - Project: A robot](#chapter-7-project-a-robot)
	- [Chapter 8 - Bugs and errors](#chapter-8-bugs-and-errors)
	- [Chapter 9 - Regular expressions](#chapter-9-regular-expressions)

<!-- /TOC -->
## Chapter 3 - Functions
- Functions can have multiple levels of locality (i.e. nested functions).
- Child function can see the values of parent, but parent cannot see child's values.
- Functions as values - function values can be handled the same way as regular values - passed as a parameter, stored in a new binding.
- Difference between **defining** and **declaring** a function.
  - Function declaration is not part of top-to-bottom flow of control.

```js
// Defining a function
const squareDefining = function(x){
  return x * x;
};
console.log(squareDefining(12));
// -> 144

// Declaring notation
console.log(squareDeclaring(11))
function squareDeclaring(x) {
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
- Functions that are called for their **side effects** vs for **return values**. The ones that are called for return values are more flexible.
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

## Chapter 6 - OOP
- **Encapsulation** - separating interface from implementation.
- **Methods** - properties that hold function values.
	- **This** - When a function is called as a method—looked up as a property and immediately called, as in `object.method()` —the binding called `this` in its body automatically points at the object that it was called on. (Think about context)
	- Each function has its own `this` binding.
	- Arrow functions don't bind their own `this`, but can see `this` binding of the scope around them.
```js
function normalize() {
console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]
//it wouldn't work with .map(function(this.lengh)) as it would define a new binding.
```
- **Prototypes** - another object that is used as a fallback source of properties. Its shared among all instances of constructor. (Recipe for creating an object).
	- Functions derive from `Function.prototype`.
	- Arrays derive from `Array.prototype`.
- **Classes**
	- If you put keyword `new` in front of a function call, its treated as an constructor.
	- In ES6 there's a better way to write a class.

```js
//Class keyword starts class declaration, which allows to define a constructor. Methods are defined in a single place.
//ES6
class Rabbit {
	constructor(type) {
		this.type = type;
	}
	speak(line) {
		console.log(`The ${this.type} rabbit says '${line}'`);
	}
}
let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

//ES5
function Rabbit(type) {
	this.type = type;
}
Rabbit.prototype.speak = function(line) {
	console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");
```

- **Map** object holds key-value pairs. Any value (both objects and primitive values) may be used as either a key or a value.
```js
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);
console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
```
- **Symbols** - Every symbol value returned from Symbol() is unique.
	- It can be used as an **identifier for object properties**.
	- The only sensible usage is to store the symbol and then use the stored value to create an object property. The following example stores the symbol in a "var".
	- The Symbol class has some static properties. Examples of well-known symbols are: `Symbol.iterator` for array-like objects, and `Symbol.search` for string objects.
	- More info: https://developer.mozilla.org/en-US/docs/Glossary/Symbol
```js
var  myPrivateMethod  = Symbol();
this[myPrivateMethod] = function() {...};
```
- **Iterators** - For a structure to be a data source, it needs to allow and say how its data should be consumed. This is done through **iterators**. Therefore, a data source needs to follow the iterator protocol.
```js
//Group (structure) is a data source
[Symbol.iterator](){
	let data = this.members.slice();
	return {// <- Iterator object
		next(){
			return {
				done: data.length === 0,
				value: data.pop()
			}
		}
	}
}
```

- **Getters, setters and statics**
```js
class Temperature {
	constructor(celsius) {
		this.celsius = celsius;
	}
	get fahrenheit() {
		return this.celsius * 1.8 + 32;
	}
	set fahrenheit(value) {
		this.celsius = (value - 32) / 1.8;
	}
	//methods that have static before the methods are stored on the constructor
	static fromFahrenheit(value) {
		return new Temperature((value - 32) / 1.8);
	}
}
let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
// to create a temperature using degrees Fahrenheit.
// Static methods are often used to create utility functions.
Temperature.fromFahrenheit(100)
```
- **Instanceof operator** - useful to know whether an object was derived from a specific class
```js
console.log([1,2,3] instanceof Array);
//--> true
```

## Chapter 7 - Project: A robot
- **Graph** - a collection of points (villages) with lines between them (roads).
- Data structures that don't change are called immutable or persistent.
- Anything that makes your code easier to understand makes it possible to  build a more ambitious system.

## Chapter 8 - Bugs and errors
- **Strict mode** - `"use strict";` - make the JS stricter.
 	- reports errors when let/var is not used while declaring a variable.
 	- `this` binding holds the value `undefined` in functions that are not called as methods.
	 	- adding strict mode rarely hurts and often helps to spot a problem.
- **Types** - describe function types.
	- There are several dialects that add types to the JS, such as TypeScript. Gives more rigor to the program.
- **Automated testing** - the process of writing a program that tests another program.
	- Takes some time to write, but immediately shows if something breaks.
```js
function test(label, body) {
	if (!body()) console.log(`Failed: ${label}`);
}
test("convert Latin text to uppercase", () => {
	return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
	return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
```
	- Test suites - software that helps to build and run a collection of tests.
	- Self-contained persistent values are easier to test than changing objects (OOP vs Functional).
- **Debugging** - rather than making random choices, analyze the code, think what's happening.
	- If you include `debugger` in the code and browser's developer tool is active, the program stops at that point. (!)
- **Exceptions** - when function cannot proceed normally, jump to a place that knows how to handle it (exception handling).
	- When exception is raise/thrown, it jumps out of a current function AND out of its caller. All the way down to the first caller or try/catch statement (unwinding the stack).
		- As it zooming out, catch the exception and do something to address it.

```js
function promptDirection(question) {
	let result = prompt(question);
	if (result.toLowerCase() == "left") return "L";
	if (result.toLowerCase() == "right") return "R";
	// Throw is used to raise the exception
	throw new Error("Invalid direction: " + result);
}
function look() {
	if (promptDirection("Which way?") == "L") {
		return "a house";
	} else {"two angry bears";}
}
// Catching the exception
try {
	console.log("You see", look());
} catch (error) {
	console.log("Something went wrong: " + error);
}
```
```js
try {
    //tryCode - Block of code to try
}
catch(err) {
    //catchCode - Block of code to handle errors
}
finally {
    //finallyCode - Block of code to be executed regardless of the try / catch result
}
```
- Programming style, when we compute new values instead of changing the old ones, helps to prevent unexpected errors.
	- I.e. if code stops in the middle of computing a new value, no-one is seeing a half-finished value.
- **Assertions** - checks inside a program that verify that something is the way it is supposed to be.
	- Don't write them for any input, but for the mistakes you're most likely to make.
```js
// An example of assertions.
function firstElement(array) {
	if (array.length == 0) {
		throw new Error("MultiplicatorUnitFailure.");
	}
		return array[0];
	}
```

## Chapter 9 - Regular expressions
- **Regular expressions** - a way to describe patterns in a string.
- **Sets of characters** - `/[0-9.-]/`
```js
// To invert use a caret (^) (aka (!))
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true
```
- **Grouping subexpressions** - A part of a regular expression that is enclosed in parentheses counts as a single element.
```js
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
```
- **Exec** - returns `null` if no match was found. Otherwise returns object with info about the match.

```js
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
function getDate(string) {
	let arr = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
	return arr;
}
getDate("30-1-2003");
// -> (4) ["30-1-2003", "30", "1", "2003", index: 0, input: "30-1-2003", groups: undefined]
```

- **Date class**
	- Month start at index 0, hence December is 11.
	- **Timestamp** - the number of milliseconds since the start of 1970 in the UTC.
```js
// getTime() - to/from timestamp;
console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)
```
- **Word and string boundaries**
	- When the match must span the whole string, use caret `^` (matches the start of the string) and dollar sign `$` (matches the end of the string).
	- `/^\d+$/` - a string consisting entirely of one or more digits.
	- `/^!/` - matches a string starting with an exclamation mark.
- **Replace**

```js
console.log("papa".replace("p", "m"));
// → mapa
// If g option is used, all matches in the string will be replaced.
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

console.log(
"Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
.replace(/(\w+), (\w+)/g, "$2 $1"));
// Barbara Liskov
// John McCarthy
// Philip Wadler
```
-
