'use strict'

import {config as c} from './config.js'

export class Score {

  constructor (game) {
    this._game = game
    this.textScore = this._game.add.bitmapText(0, this._game.height / 150, 'pixel', '', this._game.height / 140)
    this.reset()
  }

  getScore () {
    return this.score
  }

  setScore (score) {
    this.score = (score || 0)
    this.textScore.setText(' * ' + score + ' ')
    this.textScore.x = this._game.width - this.textScore.width
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

  gameOver () {
    this._gameOn = false
    this.textScore.destroy()
  }

  gameOn () {
    return this._gameOn
  }

  reset () {
    this._gameOn = true
    this.score = 0
    this.setScore(this.score)
    this.timeout = c.initTimeout
  }
}
