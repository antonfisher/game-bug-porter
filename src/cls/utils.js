'use strict'

import {Global} from './global.js'

export class Utils {

  static debug (obj) {
    const game = Global.get('game')
    game.debug.bodyInfo(obj, 32, 32)
    game.debug.body(obj, 'rgba(255,0,0,0.3)')
  }

  static normalizeScale (game) {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.stage.backgroundColor = '#ff0000'
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.stage.smoothed = false
  }

  static calculateFontSize (factor = 1) {
    const game = Global.get('game')
    return (Math.min(game.width, game.height) / factor)
  }

  static vibrate (time = 250) {
    if (Global.get('vibrationEnabled')) {
      if (navigator && navigator.vibrate) {
        navigator.vibrate(time)
      } else {
        console.log('vibrate for:', time)
      }
    }
  }

}
