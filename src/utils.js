import { createError, ErrorCodes } from 'olive-data-contracts'

/**
 * Takes in a string and returns it back in camel case
 * @param {String} str The string we want to camel case
 * @returns A camel cased string
 */
function toCamelCase (str) {
  const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')

  return text.substr(0, 1).toLowerCase() + text.substr(1)
}

/**
 * Compares quantity between procedure codes, and a cpt, based on a generic object
 * @param {Array} procs An Array of ProcedureCodes to search through
 * @param {Object} cpt A CPT object to use
 * @returns An Array of errors, or an empty array
 */
function compareQty (procs, cpt) {
  const found = procs.find(({ value }) => value === cpt.code)

  if (!found?.quantity) {
    return []
  }

  if (Number(found?.quantity) !== Number(cpt.approvedUnits)) {
    return [createError(ErrorCodes.AUTH_MISMATCHED_PROCEDURE_CODE_QUANTITY)]
  }

  return []
}

export default {
  compareQty,
  toCamelCase
}
