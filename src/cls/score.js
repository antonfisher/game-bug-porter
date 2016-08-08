'use strict'

import {config as c} from './config.js'

export class Score {

  constructor (game) {
    this._game = game
    this.score = 0
    this.obj = this._game.add.bitmapText(0, this._game.height / 150, 'pixel', '', this._game.height / 140)
    this.setScore(this.score)
    this.timeout = c.initTimeout
  }

  setScore (score) {
    this.score = (score || 0)
    this.obj.setText(' * ' + score + ' ')
    this.obj.x = this._game.width - this.obj.width
  }

  increaseScore (increment) {
    this.timeout = c.initTimeout
    this.setScore(this.score + increment)
  }

  getTimeout () {
    return this.timeout
  }

  increaseTimeout (add) {
    return (this.timeout += (add || 1))
  }

  decreaseTimeout () {
    return this.timeout--
  }
}
