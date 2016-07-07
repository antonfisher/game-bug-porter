'use strict'

let _values = {}

export class Global {

  static get (key) {
    return _values[key]
  }

  static set (key, value) {
    _values[key] = value
  }

}
