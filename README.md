# iterate-javascript

[![Subscribe to Release Notes](https://release-notes.com/badges/v1.svg)](https://release-notes.com/@alrik/iterate-javascript)

A handy function with a **unified interface** to iterate Strings, Arrays, TypedArrays, Maps, Sets, (any Iterables) & Objects.
The api is oriented on [Array.prototype.forEach](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
with the advantage of **iterating almost everything** and **iteration skipping**.

## Installation

```bash
$ yarn add iterate-it
# or
$ npm i -S iterate-it
```

## Usage

The module `itarate-it` exports a single function that takes to parameters; an iterable and a callback.
The `iterate` function returns a iteration result, that indicates if the iteration was complete of has been skipped.


```js
const iterate = require('iterate-it');
const { complete } = iterate(iterable, callback);
```

### Parameters

#### iterable
The iterable or object to iterate over.
Supported types are String, Array, TypedArray, Map, Set, (any Iterable) & Object.

#### callback
A function to be called with every element or value of the iterable.
The iteration will stop if the function returns `false`.

The function takes 3 parameters:

* **value**: The current element being processed.
* **key**: The corresponding key
* **iterable**: The iterable passed to iterate

### Return Value
`iterate()` returns a status object with the following properties:

* **complete**: Will be `true` if all items have been iterated, falthy if the iteration was stoped before.

### Examples

#### Iterating strings
```js
iterate("a1b2c3d4e5", (char, index, str) => {}); 
// => "12345"
iterate(new String("a1b2c3d4e5"), (char, index, str) => {}); 
// => [String: '12345']
```

#### Iterating maps
```js
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

iterate(map, (value, key) => console.log(key, value)); 
// a 1
// b 2
// c 3
```

#### Iterating sets
```js
const set = new Set(['a', 1, 'b']);

iterate(set, (value, key) => console.log(key, value)); 
// a a
// 1 1
// b b
```

#### Iterating arrays
```js
const arr = ['a', 1, 'b'];

iterate(arr, (value, index) => console.log(index, value)); 
// 0 a
// 1 1
// 2 b
```

#### Iterating typed arrays
```js
const typedArr = new Int32Array([1, 2, -3]);

iterate(typedArr, (value, index) => console.log(index, value));
// 0 1
// 1 2
// 2 -3
```

#### Iterating plain objects
```js
const obj = { a: 1, b: 2, c: 3 };

iterate(obj, (value, key) => console.log(key, value)); 
// a 1
// b 2
// c 3
```

#### Skipping the iteration
```js
const arr = [1, 2, undefined, 3, 4];

const { complete } = iterate(arr, (value) => {
  console.log(value);
  
  // skip iteration as soon as there is an invalid item
  if (typeof value === 'undefined') {
    return false;
  }
});

console.log(complete === true)

// 1
// 2
// false
```
