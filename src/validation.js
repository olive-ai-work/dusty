import { createError, ErrorCodes } from 'olive-data-contracts'
import _mapType from './_internal/_mapType'

/**
 * Validates a provided login request
 * @param {Creds} credential A Credentials object containing username and password
 * @returns An array, empty if no errors exist, or populated with errors if they do
 */
function validateLoginRequest (credential) {
  const errs = []

  if (!credential.user) {
    errs.push(createError(ErrorCodes.ACCESS_INVALID_CREDENTIAL, 'Missing Username'))
  }

  if (!credential.password) {
    errs.push(createError(ErrorCodes.ACCESS_INVALID_CREDENTIAL, 'Missing Password'))
  }

  return errs
}

/**
 * Validates the provided argument object given to a task runner
 * @param {Object} req The provided argument object we need to validate
 * @returns An array of errors or an empty array if none are found
 */
function validateAuthRequest (req) {
  return Object.entries(req).reduce((acc, [key, val]) => {
    if (!val) {
      acc.push(createError(ErrorCodes.DATA_MISSING_PROPERTY, `Missing property ${key}`))
    }

    return acc
  }, [])
}

/**
 * Runs a mappable list of predicate checks against the provided request data
 * @param {Object} req The AuthStatusRequest object to validate
 * @param {Map|Array} rules A Mappable list of rules to run against our data
 * @returns An error back if one if found, null otherwise
 */
function validatePatientRequest (req, rules) {
  const rulesMap = _mapType(rules)

  if (!req.authorization?.trackingNumber) {
    for (const [pred, [err, a = 'N/A']] of rulesMap) {
      if (!pred(req)) {
        return createError(err, a)
      }
    }
  }

  return null
}

export default {
  validateLoginRequest,
  validateAuthRequest,
  validatePatientRequest
}
