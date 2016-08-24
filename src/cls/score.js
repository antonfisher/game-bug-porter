'use strict'

import {Utils} from './utils.js'
import {createText} from './fabric.js'
import {config as c} from './config.js'

export class Score {

  constructor (game) {
    this._game = game

    this._textScore = createText('', Utils.calculateFontSize(c.playStatsFontFactor), () => {
      this._timeout = 0
    })
    this._textScore.setAnchor(0)
    this._textScore.y = game.height / 150

    this.reset()
  }

  getScore () {
    return this._score
  }

  setScore (score) {
    this._score = (score || 0)
    this._textScore.setText(' * ' + score + '  ')
    this._textScore.x = (
      this._game.width - this._textScore.width + (this._textScore.width / (score.toString().length + 6))
    )
  }

  increaseScore (increment) {
    this._timeout = c.initTimeout
    this.setScore(this._score + increment)
  }

  getTimeout () {
    return this._timeout
  }

  increaseTimeout (add) {
    return (this._timeout += (add || 1))
  }

  decreaseTimeout () {
    return this._timeout--
  }

  gameOver () {
    this._gameOn = false
    this._textScore.destroy()
  }

  gameOn () {
    return this._gameOn
  }

  reset () {
    this._gameOn = true
    this._score = 0
    this.setScore(this._score)
    this._timeout = c.initTimeout
  }
}
