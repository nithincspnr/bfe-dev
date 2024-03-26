// This is a JavaScript coding problem from BFE.dev
// ** Note: I understood the concept, but the way here the question explained is not clear to me

// Throttling is a common technique used in Web Application, in most cases using lodash solution would be a good choice.

// could you implement your own version of basic throttle()?

// In case you forgot, throttle(func, delay) will return a throttled function, which will invoke the func at a max frequency no matter how throttled one is called.

// Here is an example.

// Before throttling we have a series of calling like

// ─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
// After throttling at wait time of 3 dashes

// ─ A ─ ─ ─ C ─ ─ ─D ─ ─ ─ ─ E ─ ─ ─ G
// Be aware that

// call A is triggered right way because not in waiting time
// function call B is swallowed because B, C is in the cooling time from A, and C is latter.

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  let waiting = false;
  let lastArgs = null;

  return function (...args) {
    if (!waiting) {
      func.apply(this, args);
      waiting = true;

      const timeout = () => {
        setTimeout(() => {
          waiting = false;
          if (lastArgs) {
            func.apply(this, lastArgs);
            waiting = true;
            lastArgs = null;
            timeout();
          }
        }, wait);
      };

      timeout();
    } else {
      lastArgs = args;
    }
  };
}

/**
 * Example
 * Function to print A B C D E F ... in every sec. is throttled
 */
const myFunction = (arg) => console.log(arg);
const throttledFunction = throttle(myFunction, 3000);

let charCode = 65;
setInterval(() => {
  throttledFunction(String.fromCharCode(charCode));
  ++charCode;
}, 1000);
