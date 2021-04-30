import { Page } from 'puppeteer'

export interface PageIO {
  isXPathVisible<T = Page>(page: T, selector: string, timeout?: number): boolean
}
