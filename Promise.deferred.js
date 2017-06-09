/**
 * overview:
 * =========
 * Q.deferred():
 *   - not included in ES6
 *   - provides a simple and elegant way to create a new Promise
 *   - return value is an Object:
 *       {resolve, reject, promise}
 *   - since the Promise can be fulfilled from the "outside",
 *     rather than requiring a callback function that will eventually fulfill the Promise from the "inside",
 *     this enables the responsibility to fulfill the Promise to be delegated,
 *     simply by passing the Object
 *
 * summary:
 * ========
 * Promise.deferred():
 *   - Function that returns an Object having the same API surface as Q.deferred()
 **/
Promise.deferred = function() {
  var result = {}
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

// ----------------------------------------------------------------------

/**
 * references:
 *     http://scotthannen.org/blog/2016/03/03/second-look-at-promises-native-es6.html
 *     http://documentup.com/kriskowal/q/
 **/

// ----------------------------------------------------------------------
