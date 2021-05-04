import { ElementHandle, Page } from 'puppeteer'

export interface PageIO {
  clickExpectingNewWindow<T = Page>(page: T, elem: ElementHandle<Element>): Promise<[Page, void]>
  countXPaths<T = Page>(page: T, selecotr: string): Promise<number>
  isXPathVisible<T = Page>(page: T, selector: string, timeout?: number): Promise<boolean>
}
