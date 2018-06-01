const roads = [
	"Alice's House-Bob's House", "Alice's House-Cabin",
	"Alice's House-Post Office", "Bob's House-Town Hall",
	"Daria's House-Ernie's House", "Daria's House-Town Hall",
	"Ernie's House-Grete's House", "Grete's House-Farm",
	"Grete's House-Shop", "Marketplace-Farm",
	"Marketplace-Post Office", "Marketplace-Shop",
	"Marketplace-Town Hall", "Shop-Town Hall"
];

/*
Given an array of edges, buildGraph creates a map object that, for each node,
stores an array of connected nodes.
*/
function buildGraph(edges) {
	let graph = Object.create(null);
	function addEdge(from, to) {
		if (graph[from] == null) {
			graph[from] = [to];
		} else {
			graph[from].push(to);
		}
	}
	for (let [from, to] of edges.map(r => r.split("-"))) {
		addEdge(from, to);
		addEdge(to, from);
	}
	return graph;
}
const roadGraph = buildGraph(roads);


/*
Minimal set of values -  
1. robot’s current location 
2. the collection of undelivered parcels, each of which has 
	- a current location
	- a destination address. 
Don't change the state of the village but rather compute a new state. 
*/
class VillageState {
	constructor(place, parcels) {
		this.place = place;
		//this.parcels - array of objects;
		//each parcel has current location (place) and destination (address);
		this.parcels = parcels;
	}

	move(destination) {
		if (!roadGraph[this.place].includes(destination)) {
			return this;
		} else {
			let parcels = this.parcels.map(p => {
				//Parcel that is not picked yet
				if (p.place != this.place) return p;
				//Parcel that is being carried along 
				return { place: destination, address: p.address };
			}).filter(p => p.place != p.address);
			return new VillageState(destination, parcels);
		}
	}
}
/*
Testing the graph
*/
let first = new VillageState(
	"Post Office",
	[{ place: "Post Office", address: "Alice's House" }]
);
let next = first.move("Alice's House");
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

//State - village state
function runRobot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		//When all parcels deliverd - stop
		if (state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`);
			break;
		}
		// Robot? 
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Moved to ${action.direction}`);
	}
}
// Randomly pick the element from array (aka which route to chose)
function randomPick(array) {
	let choice = Math.floor(Math.random() * array.length);
	return array[choice];
}
// Randomly picks next direction
function randomRobot(state) {
	return { direction: randomPick(roadGraph[state.place]) };
}

// Adding parcels to the world
VillageState.random = function (parcelCount = 5) {
	let parcels = [];
	for (let i = 0; i < parcelCount; i++) {
		//randomly picks the destination (for the package)
		let address = randomPick(Object.keys(roadGraph));
		let place;
		do {
			//randomly sets parcels location
			place = randomPick(Object.keys(roadGraph));
		} while (place == address);
		parcels.push({ place, address });
	}
	return new VillageState("Post Office", parcels);
};

/*Let's run virtual world*/
// runRobot(state, robot, memory)
runRobot(VillageState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns

// Starting at the post office, run through it twice 
const mailRoute = [
	"Alice's House", "Cabin", "Alice's House", "Bob's House",
	"Town Hall", "Daria's House", "Ernie's House",
	"Grete's House", "Shop", "Grete's House", "Farm",
	"Marketplace", "Post Office"
];

// Loop twice - takes maximum 26 turns
function routeRobot(state, memory) {
	if (memory.length == 0) {
		memory = mailRoute;
	}
	return { direction: memory[0], memory: memory.slice(1) };
}

// Pathfinding
function findRoute(graph, from, to) {
	let work = [{ at: from, route: [] }];
	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i];
		for (let place of graph[at]) {
			if (place == to) return route.concat(place);
			if (!work.some(w => w.at == place)) {
				work.push({ at: place, route: route.concat(place) });
			}
		}
	}
}

function goalOrientedRobot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) {
			route = findRoute(roadGraph, place, parcel.place);
		} else {
			route = findRoute(roadGraph, place, parcel.address);
		}
	}
	return { direction: route[0], memory: route.slice(1) };
}


// Exercise - Measuring a robot
function countSteps(state, robot, memory) {
	for (let steps = 0;; steps++) {
	  if (state.parcels.length == 0) return steps;
	  let action = robot(state, memory);
	  state = state.move(action.direction);
	  memory = action.memory;
	}
  }
  
  function compareRobots(robot1, memory1, robot2, memory2) {
	let total1 = 0, total2 = 0;
	for (let i = 0; i < 100; i++) {
	  let state = VillageState.random();
	  total1 += countSteps(state, robot1, memory1);
	  total2 += countSteps(state, robot2, memory2);
	}
	console.log(`Robot 1 needed ${total1 / 100} steps per task`)
	console.log(`Robot 2 needed ${total2 / 100}`)
  }
  
compareRobots(routeRobot, [], goalOrientedRobot, []);

// Exercise - Robot efficiency - run in http://eloquentjavascript.net/code/#7.2

function lazyRobot({place, parcels}, route) {
	if (route.length == 0) {
	  // Describe a route for every parcel
	  let routes = parcels.map(parcel => {
		if (parcel.place != place) {
		  return {route: findRoute(roadGraph, place, parcel.place),
				  pickUp: true};
		} else {
		  return {route: findRoute(roadGraph, place, parcel.address),
				  pickUp: false};
		}
	  });
  
	  // This determines the precedence a route gets when choosing.
	  // Route length counts negatively, routes that pick up a package
	  // get a small bonus.
	  function score({route, pickUp}) {
		return (pickUp ? 0.5 : 0) - route.length;
	  }
	  route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
	}
  
	return {direction: route[0], memory: route.slice(1)};
  }
  
  runRobotAnimation(VillageState.random(), lazyRobot, []);

  // Persistent group
