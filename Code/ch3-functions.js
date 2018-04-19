/* Chpater 3 - Functions
Write a function that takes two arguments and returns their minimum.
*/

function min(a,b){
  if (a >= b) return b;
  else return a;
}

console.log(min(5,2));
//--> 2

/* Recursion
Find if positive whole number is even or odd, such as:
- Zero is even;
- One is odd;
- Any other, its evennes is the same as N - 2; (Not the best solution)
Return a Boolean.
*/

function isEven(n) {
  if (n < 0) return undefined;
  else if (n == 0) return true;
  else if (n == 1) return false;
  else return isEven(n-2);
}
console.log(isEven(50));
// --> True
console.log(isEven(75));
// --> False
console.log(isEven(-1));
//--> undefined

/* Bean counting
1. Count Bs in the passed string
2. Take to arguments - string and character to be counted in the string.
*/
const countChar = function (str, c) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == c) result++;
  }
  return result;
}
console.log((countChar("BbBsd3B","B")));
// --> 3
