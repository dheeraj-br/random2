const myArray = [1, 2, 3, 234, 34];
const myObject = { key: 'value' };

function myFunction(item) {
  return item;
}

myArray.push(4);
myObject.key = 'new value';

myFunction(myArray[0]);
