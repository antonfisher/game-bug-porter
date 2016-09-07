'use strict'

export class GA {

  static _isGa () {
    return ('ga' in window)
  }

  static init (key) {
    this._isGa() && window.ga.startTrackerWithId(key)
  }

  static trackView (title) {
    this._isGa() && window.ga.trackView(title)
  }

  static trackEvent (category, action, label, value) {
    this._isGa() && window.ga.trackEvent(category, action, label, value)
  }
}
