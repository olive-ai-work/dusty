import { Validation } from './src/validation'

declare let Dusty: Dusty.Static

declare namespace Dusty {
  type KeyValuePair<K, V> = [K, V]
  type Pred = (...a: any[]) => boolean
  type Mappable = Array<KeyValuePair<any, any>>

  interface Static {
    validation: Validation
  }
}

export = Dusty
export as namespace Dusty
