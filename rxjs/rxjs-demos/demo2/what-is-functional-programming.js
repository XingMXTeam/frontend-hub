// normal
const originalArray = [1, 4, 8, 12];
for(let i = 0; i < originalArray.length; i++){
	originalArray[i] = originalArray[i] + 1;
}
console.log(originalArray) //[2, 5, 9, 13]

// functional：不影响原先数组， focus on action(比如redux)
const originalArray = [1, 4, 8, 12];
const finalArray = originalArray.map(value => value+1);
console.log(finalArray); //[2, 5, 9, 13]

// benefit:  modular resuable testable


