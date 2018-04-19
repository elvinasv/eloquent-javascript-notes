/* Eloquent JavaScript 
 * Chapter 4 - Objects
*/

/* 1. The sum of range
 * 1.1 Write a range function that takes two arguments - start and end. Return an array containing all 
 * numbers from start to end.
 * 1.2 Write a sum function. It takes an array and returns its sum.
 * 1.3 Modify range to take an optional 3rd parameter which indicates a step (including negative step)
*/

function range(start, end){
	let result = []
	for (let i = start; i <= end; i ++){
		result.push(i);
	}
	return result;
}

console.log(range(1,7));
// --> [1, 2, 3, 4, 5, 6, 7]

function sum(arr) {
	let result = 0;
	for (item of arr) {
		result += item;
	}
	return result;
}

console.log(sum([-1, 0, 1, 2, 3]))
// --> 5

function rangeStep(start, end, step = 1) {
	let result = []
	if (step == 0) return undefined;

	if (start < end) {
	// ascending
		for (let i = start; i <= end; i += step) {
			result.push(i);
		}
	} else {
		// descending
		for (let i = start; i >= end; i += step){
			result.push(i);
		}
	}
	return result;
}

console.log(rangeStep(1,10,2))
//--> [1,3,5,7,9]

console.log(rangeStep(5,2,-1))
//--> [5, 4, 3, 2] 


/* 2 Reversing an array
 * 2.1 Write a function reverseArray - take an array as an argument and return a new, inversed array. 
 * 2.2 Write a function reverseArrayInPlace - modifies the passed array itself.
 */

 function reverseArray(arr) {
 	let reversedArr = [];
 	for (item of arr) {
 		reversedArr.unshift(item);
 	}

 	return reversedArr;
 }

 console.log(reverseArray([1,3,5,7]));
 // --> [7,5,3,1]

//.map version didn't work 
function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

var array = [1,3,5,7]
reverseArrayInPlace(array);
console.log(array);
//--> [7,5,3,1]

/* 3. A list
 * 3.1 Write arrayToList that builds up list structure from an array
*/

//My solutin - hardcoded
function arrayToList(arr){
	let list = { 
		value: arr[0],
		rest: {
			value: arr[1],
			rest: {
				value: arr[2],
				rest: null
			}
		}
	};

	return list;
}

//Example code
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}


//My code
function listToArray(list){
	let arr = [];
	arr.push(list.value);
	arr.push(list.rest.value);
	arr.push(list.rest.rest.value)
	return arr;
}

//Example code
function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(element, list){
	return {
		value: element,
		rest: list
	};
}

function nth(list, num){
	// return undefined in num is not in the list
	if (num == 0) return list.value;
	else if (list.rest === null) return "not found"; 
	else return nth(list.rest, n - 1); 	
}

/*
* Deep comparison
* Write a function deepEqual - return true only if they are the same values or objects with the same properties
*/

// My code - not working in some cases
function deepEqual(a, b) {
	if (a === b) return true;
	//special exception to handle null
	else if (a === null || b === null) return false;
	// deep comparison
	else if (typeof a === "object" && typeof b === "object" ) {
		if (Object.keys(a) === Object.keys(b)) {
			let prop = Object.keys(a);
			for (item of prop) {
				deepEqual(a.item, b.item);
			}
		} else return false;

	}
	else return false;
}

// Example code
function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  // The actual deep comparison
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

