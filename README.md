# Dusty

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

A dusty lib for PD3 portal needs

## Overview

A simple to use library that tries to be as generic as possible for use among portals and other things

## Documentation

### Validation

```js
import { validation } from 'dusty'
```

#### loginRequest(req)

##### Parameters

- `req`: `Generic` - An Object containing the username and password of a user
  - `Generic` type defaults to [Creds](https://github.com/olive-ai-work/dusty/blob/main/types/src/validation.d.ts#L8)

##### Returns

- `GlobalError[]`
  - Either an array of errors, or an empty array if no errors are found

##### Usage

```js
validation.loginRequest({ username: 'chicken', password: 'billybob' }) // => []
validation.loginRequest({ username: 'chicken' }) // => [GlobalError]
```

#### authRequest(req)

##### Parameters

- `req`: `Generic` - The AuthStatusRequest being provided from token manager, this is the stuff being passed to your init function
  - `Generic` type defaults to: `TokenManagerRequest<AuthStatusRequest>`

##### Returns

- `GlobalError[]`
  - An array of `GlobalError` types, or an empty array if no errors are found

##### Usage

```ts
validation.authRequest({
    authToken: 'yoga',
    secretID: 'Hi!',
    internalTROptions: {},
    request: []
  }) // => []

validation.authRequest({
    authToken: 'tuba',
    secretID: '',
    internalTROptions: {},
    request: []
  }) // => [GlobalError]

// To use it with a different type of request:
validation.authRequest<AuthStatusMimicRequest>({
  authenticationToken: 'Hello!',
  request: [],
  internalTROptions: {}
}) // => []
```

#### patientRequest(req, rules)

Takes a patient request, and a Mappable rules object (this can be in array or Map format) The format should be an Array of arrays like this:

```
[
  [pred, [err, additional?]]
]
```

The predicate is our validation function, it determines if an error is returned out not. If `true` then the error is returned, other wise it moves on. The `additional` bit is used to fill in the additional string for the `createError` function, this is an optional data piece.

##### Parameters

- `req`: `AuthStatusRequest` - The patient request object we are processing
- `rules`: `PredErrMap | PredArr` - A mappable rules data type the is used to validate the request
  - `PredErrMap`: `Map<Pred, KeyValuePair<ErrorCodes, string> | [ErrorCodes]>`
  - `PredArr`: `[KeyValuePair<Pred, [ErrorCodes, string]> | KeyValuePair<Pred, [ErrorCodes]>]`
  - [You can find more info here](https://github.com/olive-ai-work/dusty/blob/main/types/src/validation.d.ts#L4)

##### Returns

- `GlobalError | null`
  - A `GlobalError` type if an error is found, null otherwise

##### Usage

```js
import { both, compose, identity, length, path } from 'ramda'

const rules = new Map([
    [compose(both(identity, length), path(['authorization', 'procedureCodes'])), [ErrorCodes.MISSING_PROCEDURE_CODES]]
  ])
const arrRules = [
    [compose(both(identity, length), path(['authorization', 'procedureCodes'])), [ErrorCodes.MISSING_PROCEDURE_CODES]]
  ]

validation.patientRequest({
    authorization: {
      trackingNumber: '12345',
      procedureCodes: [
        { value: '12345' }
      ]
    }
  }, rules) // => null
validation.patientRequest({
    authorization: {
      procedureCodes: [
        { value: '12345' }
      ]
    }
  }, rules) // => null
  validation.patientRequest({
    authorization: {
      procedureCodes: []
    }
  }, rules) // => GlobalError
```

### PageIO

```js
import { pageIO } from 'dusty'
```

#### clickExpectingNewWindow(page, elem)

##### Parameters

- `page`: `Generic` - The puppeteer page object
  - `Generic` type defaults to `Page`
- `elem`: `ElementHandle<Element>` - The elment we are planning to click

##### Returns

- `Promise<[Page, void]>`
  - A Promise Array with the first index being the newly opened page

##### Usage

```js
const page = await browser.newPage();
const rows = await page.$$('selector > to > clickable > elements');

for (let i = 0; i < rows.length; i += 1) {
  const el = rows[i]
  const [newPage] = await pageIO.clickExpectingNewWindow(page, el)
}
```

#### countXPaths(page, selector)

##### Parameters

- `page`: `Generic` - The puppeteer page object
  - `Generic` type defaults to `Page`
- `selector`: `String` - The XPath selector to find on the page

##### Returns

- `Promise<number>`
  - A Promise which upon resolve should return a number

##### Usage

```ts
const page = await browser.newPage();
const clickableCount = await pageIO.countXPaths(page, '//button[contains(@class, "clickable")]')

// To use it with another type like ElementHandle
const counter = await pageIO.countXPaths<ElementHandle<Element>>(el, 'selector')
```

#### isXPathVisible(page, selector, timeout)

##### Parameters

- `page`: `Generic` - The puppeteer page object
  - `Generic` type defaults to `Page`
- `selector`: `String` - The XPath selector to find on the page
- `timeout`: `Number` - How long should the function wait before declaring it not visible? (default: 3000)

##### Returns

- `Promise<boolean>`
  - A Promise which upon resolve should be a boolean on if the xpath was visible or not

##### Usage

```ts
const page = await browser.newPage();
const div = await pageIO.isXPathVisible(page, '//div[@id="foobar"]')

// To use it with another type like ElementHandle
const visible = await pageIO.isXPathVisible<ElementHandle<Element>>(el, 'selector')
```
