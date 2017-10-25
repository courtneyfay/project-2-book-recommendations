/*function car(make, model, options){
	let car = {
		make,
		model,
		drive(){
			console.log("vroom");
		}
	}
	return //your code here
};

let auto = car("honda","civic");
// => make: honda, model: civic, drive: Function
auto.drive();
// => vroom*/

/*const teamName = "tooling";
const people = [
	{name: "Jennie", role: "senior"},
	{name: "Ronald", role: "junior"},
	{name: "Martin", role: "senior"},
	{name: "Anneli", role: "junior"}
];

let message = `There are ${people.length} people on the ${teamName} team.
Their names are ${people[0].name}, ${people[1].name}, ${people[2].name}, ${people[3].name}`;

console.log(message);*/

/*const inventory = [
	{type: "machine", value: 5000},
	{type: "machine", value: 650},
	{type: "duck"			, value: 10},
	{type: "furniture", value: 1200},
	{type: "machine", value: 77}
];

function checkMachine(inventory){
	if (inventory.type === "machine") {
		return inventory;
	}
};

function getSum(total, machine){
	return total + machine.value;
};

let machines = inventory.filter(checkMachine);
let totalMachineValue = machine.reduce(getSum);
//first filter based on type, then reduce using value

console.log(totalMachineValue);*/

/*
let totalMachineValue = inventory
	.filter( product => product.type === "machine" )
	.map( produce => )
*/

/*
how can you use template literals, a spread operator, an array of name, day and adjective to make a greeting function that prints out
hello, Zeb. Today is Tuesday; isn't it a wonderful day?
*/

let words = [ "Zeb", "Tuesday", "wonderful"];

let sayMessage = function(){
	console.log(`Hello, ${words[0]}. Today is ${words[1]}; isn't it a ${words[2]} day?`);
} 

sayMessage(...words);

