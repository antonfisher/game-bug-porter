'use strict'

import {Global} from './global.js'

export class Utils {

  static debug (obj) {
    const game = Global.get('game')
    game.debug.bodyInfo(obj, 32, 32)
    game.debug.body(obj, 'rgba(255,0,0,0.3)')
  }

}
