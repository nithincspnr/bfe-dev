Currying is a useful technique used in JavaScript applications.

Please implement a  `curry()`  function, which accepts a function and return a curried one.

Here is an example

```js
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
```

Solution:

```js
/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 * First check length of curried function's args eq or greater than original function's parameter.
 * If Yes simply call it, then I used recursion for the second step
 */
function curry(fn) {
  return function curried(...args){
    if(args.length >= fn.length){
      return fn(...args)
    }
    // This can be converted to an arrow method
    return function(...args2){
        return curried(...args, ...args2)
    }
  }
}
```