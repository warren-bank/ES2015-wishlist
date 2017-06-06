/**
 * http://www.ecma-international.org/ecma-262/6.0/#sec-number.parseint
 * https://github.com/tc39/ecma262/raw/master/spec.html#sec-number.parseint
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
 *
 * according to the ES2015 spec:
 *   Number.parseInt === parseInt
 *
 * issues:
 * - Number.parseInt('0xff') === 255  // literal notation supported in ES5, parseInt supported in ES5
 * - Number.parseInt('0b11') === 0    // literal notation supported in ES6, parseInt not supported
 * - Number.parseInt('0o77') === 0    // literal notation supported in ES6, parseInt not supported
 *
 * issue case #:
 *   https://github.com/tc39/ecma262/issues/927
 *
 * workaround:
 *   detect notation, trim prefix, assign proper radix
 **/
Number.parseInt = function(val, radix){
  var regex, result
  if (radix === undefined){
    regex = /^0([box])(?:0\1)*(.+)$/i
    if (typeof val !== 'string') val = val.toString()
    val.replace(regex, function(match, p1, p2){
      switch(p1){
        case 'b':
        case 'B':
          radix = 2; break
        case 'o':
        case 'O':
          radix = 8; break
        case 'x':
        case 'X':
          radix = 16; break
      }
      val = p2
    })
  }
  else {
    switch(radix){
      case 2:
        regex = /^(?:0b)+/i; break
      case 8:
        regex = /^(?:0o)+/i; break
      case 16:
        regex = /^(?:0x)+/i; break
    }
    if (regex){
      if (typeof val !== 'string') val = val.toString()
      val = val.replace(regex, '')
    }
  }

  result = parseInt(val, radix)
  result = ((! Number.isNaN(result)) && (result.toString(radix) === val)) ? result : NaN

  return result
}
