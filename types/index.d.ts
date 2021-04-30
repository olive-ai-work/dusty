import { Validation } from './src/validation'
import { PageIO } from './src/pageIO'
import { Utils } from './src/utils'

declare let Dusty: Dusty.Static

declare namespace Dusty {
  type KeyValuePair<K, V> = [K, V]
  type Pred = (...a: any[]) => boolean
  type Mappable = Array<KeyValuePair<any, any>>

  interface Static {
    validation: Validation
    pageIO: PageIO
    utils: Utils
  }
}

export = Dusty
export as namespace Dusty
