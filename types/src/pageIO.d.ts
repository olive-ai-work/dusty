import { ElementHandle, Page } from 'puppeteer'

export interface PageIO {
  clickExpectingNewWindow<T = Page>(page: T, elem: ElementHandle<Element>): Promise<[Page, void]>
  isXPathVisible<T = Page>(page: T, selector: string, timeout?: number): Promise<boolean>
}
