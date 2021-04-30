import { ErrorCodes } from 'olive-data-contracts'
import { both, compose, identity, length, path } from 'ramda'
import test from 'tape'
import { validation } from '../index'

test('patientRequest -- Basic validation', t => {
  const results = validation.patientRequest({ authorization: { trackingNumber: '12345' } })
  const badResults = validation.patientRequest({})

  t.same(results, null)
  t.same(badResults.additional, 'No Tracking number found, and no other search rules specified')
  t.end()
})

test('patientRequest -- Rules (Array) validation', t => {
  const rules = [
    [compose(both(identity, length), path(['authorization', 'procedureCodes'])), [ErrorCodes.MISSING_PROCEDURE_CODES]]
  ]
  const results = validation.patientRequest({
    authorization: {
      trackingNumber: '12345',
      procedureCodes: [
        { value: '12345' }
      ]
    }
  }, rules)
  const secondary = validation.patientRequest({
    authorization: {
      procedureCodes: [
        { value: '12345' }
      ]
    }
  }, rules)
  const failure = validation.patientRequest({
    authorization: {
      procedureCodes: []
    }
  }, rules)
  const failureWithAdd = validation.patientRequest({
    authorization: {
      procedureCodes: []
    }
  }, [
    [
      compose(both(identity, length), path(['authorization', 'procedureCodes'])),
      [ErrorCodes.MISSING_PROCEDURE_CODES, 'chicken']
    ]
  ])

  t.same(results, null)
  t.same(secondary, null)
  t.same(failure.message, 'Missing Procedure Codes')
  t.same(failureWithAdd.additional, 'chicken')
  t.end()
})

test('patientRequest -- Rules (Map) validation', t => {
  const rules = new Map([
    [compose(both(identity, length), path(['authorization', 'procedureCodes'])), [ErrorCodes.MISSING_PROCEDURE_CODES]]
  ])
  const results = validation.patientRequest({
    authorization: {
      trackingNumber: '12345',
      procedureCodes: [
        { value: '12345' }
      ]
    }
  }, rules)
  const secondary = validation.patientRequest({
    authorization: {
      procedureCodes: [
        { value: '12345' }
      ]
    }
  }, rules)
  const failure = validation.patientRequest({
    authorization: {
      procedureCodes: []
    }
  }, rules)
  const failureWithAdd = validation.patientRequest({
    authorization: {
      procedureCodes: []
    }
  }, new Map([
    [
      compose(both(identity, length), path(['authorization', 'procedureCodes'])),
      [ErrorCodes.MISSING_PROCEDURE_CODES, 'chicken']
    ]
  ]))

  t.same(results, null)
  t.same(secondary, null)
  t.same(failure.message, 'Missing Procedure Codes')
  t.same(failureWithAdd.additional, 'chicken')
  t.end()
})

test('loginRequest -- Basics', t => {
  const results = validation.loginRequest({ user: 'baja', password: 'blast' })
  const [badResults] = validation.loginRequest({ user: 'baja' })

  t.same(results, [])
  t.same(badResults.additional, 'Missing Password')
  t.end()
})

test('authRequest -- Basics', t => {
  const results = validation.authRequest({
    authToken: 'yoga',
    secretID: 'Hi!',
    internalTROptions: {},
    request: []
  })
  const [badResults] = validation.authRequest({
    authToken: 'tuba',
    secretID: '',
    internalTROptions: {},
    request: []
  })

  t.same(results, [])
  t.same(badResults.additional, 'Missing property secretID')
  t.end()
})
