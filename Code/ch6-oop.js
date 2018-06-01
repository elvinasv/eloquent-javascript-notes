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
		return new Vec(this.x - vect.x, this.y - vect.y);
	}
	//Vector length from (0,0)
	// c = sqrt(a^2+b^2)
	get length(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
}


/*
6.2 Groups
1. Write a class called Group - constructor creates an empty group (array). Track what values are part of the Group.
2. Create 'add' method - adds if value is not in the group already;
3. Create 'has' method - returns boolean;
4. Create 'delete' method - given a number, if its a number, delete it.
5. Create a static "from", that takes an iterable object as argument and create a group that contains all the values produces
by iterating over it.
*/

class Group {
	constructor(){
		this.group = [];
	}

	add(e) {
		//add element if not already in the group
		if (this.group.indexOf(e) === -1) {
			this.group.push(e);
		}
	}

	delete(e){
		//delete a member if it's part of the group
		if (!(this.group.indexOf(e) === -1)) {
			return this.group.splice(this.group.indexOf(e), 1);
		}
	}

	has(e){
		return !(this.group.indexOf(e) === -1)
	}

	static from(arr){
		let group = new Group();
		for(let value of arr) {
			group.add(value);
		}
		return group;
	}
}

// Example code
class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter(v => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group;
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }
	//Group (structure) is a data source
	[Symbol.iterator](){
		let data = this.members.slice();
			return {// <- Iterator object
				next(){
					return {
						done: data.length === 0,
						value:  data.pop()
				}
			}
		}
	}
}


/*
6.3 Iteratable groups
Make the Group class iterable. (use iterable iterface)
*/
