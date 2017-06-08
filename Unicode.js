Unicode = {}

// ----------------------------------------------------------------------

Unicode.stringify = function(str){
  var result=''
  var codePoint
  for (codePoint of str){
    result += '\\u{' + codePoint.codePointAt(0).toString(16).toUpperCase() + '}'
  }
  return result
}

// ----------------------------------------------------------------------

Unicode.parse = function(str){
  var result
  var regex = /\\u\{([0-9a-fA-F]+)\}/g
  result = str.replace(regex, function(match, p1){
    return String.fromCodePoint(parseInt(p1, 16))
  })
  return result
}

// ----------------------------------------------------------------------

Unicode.normalize = function(str, method=''){
  var next, result, regex

  if ((Array.isArray(method)) && (method.length)){
    next = method
    method = next.shift()
  }

  switch(method){
    case 'normalize':
      // if possible, combine: Char + Mark => (standardized) Char

      result = str.normalize('NFC')
      break

    case 'strip':
      // remove all combining marks

      regex = /([\0-\u02FF\u0370-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uDC00-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])([\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g
      result = str.replace(regex, function(match, symbol, marks) {
        return symbol
      })
      break

    default:
      result = str
      break
  }

  if (next && next.length){
    return Unicode.normalize(result, next)
  }
  else {
    return result
  }
}

// ----------------------------------------------------------------------

Unicode.length = function(str, method=['normalize','strip']){
  var result

  str = Unicode.normalize(str, method)

  result = Array.from(str).length
  return result
}

// ----------------------------------------------------------------------

Unicode.charAt = function(str, index, method=['normalize','strip']){
  var result

  str = Unicode.normalize(str, method)

  result = str.codePointAt(index)
  result = String.fromCodePoint(result)
  return result
}

// ----------------------------------------------------------------------

/**
 * references:
 *     https://mathiasbynens.be/notes/javascript-unicode
 *     http://speakingjs.com/es5/ch24.html
 **/

// ----------------------------------------------------------------------

module.exports = Unicode
