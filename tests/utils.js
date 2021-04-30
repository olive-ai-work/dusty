import test from 'tape'
import { utils } from '../index'

test('toCamelCase', t => {
  t.same(utils.toCamelCase('Test that thing'), 'testThatThing', 'Handles spaces')
  t.same(utils.toCamelCase('test-that-thing'), 'testThatThing', 'Handles dashes')
  t.same(utils.toCamelCase('test_that_thing'), 'testThatThing', 'Handles underscores')
  t.same(utils.toCamelCase('test.that.thing'), 'testThatThing', 'Handles periods')
  t.end()
})
