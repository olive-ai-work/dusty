import { Page } from 'puppeteer'

export interface PageIO {
  isXPathVisible(page: Page, selector: String, timeout?: number): boolean
}
