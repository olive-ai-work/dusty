declare let D: D.Static

declare namespace D {
  type KeyValuePair<K, V> = [K, V]
  type Pred = (...a: any[]) => boolean
  type Mappable = Array<KeyValuePair<any, any>>

  interface Static {

  }
}

export = D
export as namespace D
