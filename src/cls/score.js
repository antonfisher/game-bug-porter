'use strict'

export class Score {

  constructor (game) {
    this._game = game
    this.score = 0
    this.obj = this._game.add.bitmapText(0, this._game.height / 150, 'pixel', '', this._game.height / 140)
    this.setScore(this.score)
  }

  setScore (score) {
    this.score = (score || 0)
    this.obj.setText(' * ' + score + ' ')
    this.obj.x = this._game.width - this.obj.width
  }

  increaseScore (increment) {
    this.setScore(this.score + increment)
  }
}
