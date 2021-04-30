import { allPass, compose, equals, head, length, pipe, type } from 'ramda'

const _checkFormat = allPass([
  Array.isArray,
  compose(Array.isArray, head),
  pipe([head, length, equals(2)])
])

function ensureMap (data) {
  if (type(data) === 'Map') {
    return data
  }

  if (!_checkFormat(data)) {
    return new Map()
  }

  return new Map(data)
}

export default ensureMap
