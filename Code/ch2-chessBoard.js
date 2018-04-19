/* Write a program that creates a string that represents an 8×8 grid, using newline
characters to separate lines. At each position of the grid there is either a space
or a ”#” character. The characters should form a chess board.
*/

var boardSize = Number(prompt("What's the size of board?"));

for (var i = 0; i < boardSize; i++) {
	var rowString = "";
	for (var j = 0; j < boardSize; j++){
		// Print # with even numbers 
		if ((i + j) % 2 == 0 ){
			rowString += " ";
		} else {
			rowString += "#";
		}
	}
	console.log(rowString);
}