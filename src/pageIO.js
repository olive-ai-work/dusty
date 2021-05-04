/**
 * Creates a sequence that expects a new page to open after clicking an element, and returns the newly opened page object in the first index of the array
 * @param {Page} page A puppeteer page object
 * @param {ElementHandle} elem A puppeteer element handle to click on
 * @returns An array with the first index being the new page object
 */
async function clickExpectingNewWindow (page, elem) {
  return Promise.all([
    new Promise((resolve) => page.once('popup', resolve)),
    elem.click()
  ])
}

/**
 * Check an xpath selector on the page to see if its visible or not
 * @param page The puppeteer page object
 * @param selector The selector/xpath you want puppeteer to find
 * @param timeout How long until the function should timeout
 */
async function isXPathVisible (page, selector, timeout = 3000) {
  let visible = true
  try {
    await page.waitForXPath(
      selector,
      { visible: true, timeout }
    )
  } catch (error) {
    visible = false
  }

  return visible
}

async function countXPaths (page, selector) {
  return (await page.$x(selector)).length
}

export default {
  clickExpectingNewWindow,
  countXPaths,
  isXPathVisible
}
