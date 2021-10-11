# json-stringify-with-sorting

Sorting object keys in a given order in the JSON.stringify result. Recursively

```js
import JSWS from "@skoropletov/json-stringify-with-sorting";

const jsws = new JSWS([
  'firstKey',
  'secondKey',
  'thirdKey',
  'fourthKey',
]);

console.log(jsws.stringify({
  fourthKey: true,
  justAnotherKey: "I'll be displayed after all 4 of them", 
  secondKey: 1,
  thirdKey: 100,
  
  yetAnotherKey: "Alex says hi",
  firstKey: {
    thirdKey: 100,
    yetAnotherKey: "Alex says hi",
    secondKey: {
      firstKey: "I'm a first string",
      yetAnotherKey: "Alex says hi",
      fourthKey: true,
      secondKey: "I'm a second string",
      thirdKey: 100,
    },
    firstKey: "first string in an object here"
  }
}));

```