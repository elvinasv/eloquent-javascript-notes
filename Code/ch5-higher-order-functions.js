/*
* 5.1 Flattening
* Use reduce method in combination with the concat to flatten an array of arrays into  
* a single array that has the same elements as original
*/

function flattening(arr) {
	let flatArr = [];
	flatArr = arr.reduce((flatArr, current)=> flatArr.concat(current));
	return flatArr;
}

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flattening(arrays));
// → [1, 2, 3, 4, 5, 6]


/*
* 5.2. Your own loop
* Define a function that provides a for loop functionality. 
*/

function loop(value, test, update, body){
	while(test(value)){
		body(value);
		value = update(value);
	}
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1



/*
* 5.3 Everything 
* write function that behaves similarly to .some. every() returns true if every
* element passes the test. 
* Write two versions - using some and for loop
*/

// Code using for loop
function every(array, test) {
	for (let element of array) {
		if(!test(element)) return false 
	}
	return true;
}

// Code using .some
function every(array, test) {
	//check whether at least on element is NOT passing the test
	return !array.some(element => !test(element));
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

/*
* 5.4 Dominant writing direction
* 
*/

//Example code
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  let counted = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");

  if (counted.length == 0) return "ltr";

  return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

