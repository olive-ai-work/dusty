/**
 * Takes in a string and returns it back in camel case
 * @param {String} str The string we want to camel case
 * @returns A camel cased string
 */
function toCamelCase (str) {
  const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')

  return text.substr(0, 1).toLowerCase() + text.substr(1)
}

export default {
  toCamelCase
}
