/*
* 6.1 A vector type
*/

class Vec {
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	//adding vectors
	plus(vect){
		return new Vec(this.x + vect.x, this.y + vect.y);
	}
	//subtracting vectors. Reverse the one you want to subtract and add them
	minus(vect){
		return new Vec(this.x - vect.x, this.y - vect.y)
	}
	//Vector length from (0,0)
	// c = sqrt(a^2+b^2)
	get length(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}
