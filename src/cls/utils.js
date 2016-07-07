'use strict'

let _game

export class Utils {

  static configure (game) {
    _game = game
  }

  static debug (obj) {
    _game.debug.bodyInfo(obj, 32, 32)
    _game.debug.body(obj, 'rgba(255,0,0,0.3)')
  }

}
