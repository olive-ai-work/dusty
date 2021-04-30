declare let D: D.Static

declare namespace D {
  type KeyValuePair<K, V> = [K, V]
  type Mappable = Array<KeyValuePair<any, any>>
  type Pred = (...a: any[]) => boolean

  interface Static {

  }
}
