
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

export default {
  isXPathVisible
}
