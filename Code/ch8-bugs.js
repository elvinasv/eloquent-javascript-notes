// Chapter 8 - Bugs and errors
// 8.1 Retry

// only multiplies in 20% of cases, otherwise raise an exception of 
// type MultiplicatorUnitFailure.

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
	try {
		if (randomNumber(0, 10) >= 2) {
			throw new MultiplicatorUnitFailure("Unlucky 80%");
		} else {
			return a * b;
		}
	} catch (e) {
		if (e instanceof MultiplicatorUnitFailure){
			//console.log("Hoops"	+ e );
		} else {
			throw e;
		}
	}
}

// Returns random number range [from, to). 
function randomNumber(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}

function testLucky() {
	let luckyCount = 0;
	for (let i = 0; i < 1000; i++) {
		if (typeof primitiveMultiply(2, 10) === "number") {
			luckyCount++;
		}
	}
	console.log(`Numbers where multiplied ${(luckyCount/1000 * 100).toFixed(2)}% of times`);
}

// ----- Example code ------ 
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure();
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure))
        throw e;
    }
  }
}
console.log(reliableMultiply(8, 8));
// → 64


// 8.2 The locked box

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

// My code
function withBoxUnlocked(body) {
	try {
		box.unlock();
		body();
	} catch (e) {
      console.log("Something went wrong: " + e);
	}	finally {
		box.lock();
	}
}

// Exmaple code

function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true