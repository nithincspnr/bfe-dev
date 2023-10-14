// please implement curry() which also supports placeholder.

// Here is an example

// const  join = (a, b, c) => {
//    return `${a}_${b}_${c}`
// }

// const curriedJoin = curry(join)
// const _ = curry.placeholder

// curriedJoin(1, 2, 3) // '1_2_3'

// curriedJoin(_, 2)(1, 3) // '1_2_3'

// curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  return function curried(...args) {
    const relevantArgs = args.splice(0, fn.length);
    const hasPlaceholder = relevantArgs.includes(curry.placeholder);

    if (relevantArgs.length >= fn.length && !hasPlaceholder) {
      return fn.apply(this, relevantArgs);
    }

    return (...nextArgs) => {
      return curried.apply(this, combineArgs(relevantArgs, nextArgs));
    };
  };
}

function combineArgs(args, nextArgs) {
  const trueArgs = args.reduce((acc, value) => {
    const nextArg =
      value === curry.placeholder && nextArgs.length > 0
        ? nextArgs.shift()
        : value;
    return [...acc, nextArg];
  });
  return [...trueArgs, ...nextArgs];
}

curry.placeholder = Symbol();
