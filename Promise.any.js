/**
 * overview:
 * =========
 * ES6 includes Promise.race():
 *   - accepts an array of Promises
 *   - returns the result of the first Promise to either resolve OR reject
 * Q.any():
 *   - accepts an array of Promises
 *   - returns the first Promise to resolve,
 *     or if all Promises reject THEN reject
 *
 * summary:
 * ========
 * Promise.any():
 *   - behaves almost exactly like Q.any()
 *   - if all Promises reject,
 *     then value passed to rejection is an Array containing the Error objects for each of the Promises
 *   - the ordering of the Error objects is the same as the original ordering of Promises
 *     (analogous to the way Promise.all() resolves to an Array of data values)
 **/
Promise.any = function(promises) {
  return new Promise((resolve, reject) => {
    var resolved, count, errors
    resolved = false
    count = promises.length
    errors = new Array(count)
    promises.forEach((p, index) => {
      Promise.resolve(p)
      .then((value) => {
        resolved = true
        count--
        resolve(value)
      })
      .catch((error) => {
        count--
        errors[index] = error
        if (count === 0 && !resolved) {
          reject(errors)
        }
      })
    })
  })
}

// ----------------------------------------------------------------------

/**
 * references:
 *     http://scotthannen.org/blog/2016/03/03/second-look-at-promises-native-es6.html
 *     https://esdiscuss.org/topic/promise-any
 *     http://documentup.com/kriskowal/q/
 **/

// ----------------------------------------------------------------------
