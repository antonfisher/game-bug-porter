'use strict'

import {Global} from './cls/global.js'
import {menuState} from './states/menu.js'
import {playState} from './states/play.js'

const el = window.document.getElementById('game')
const height = 1600
const width = (el.clientWidth * height / el.clientHeight)
const game = new Phaser.Game(width, height, Phaser.AUTO, el, null, true, false)

Global.set('game', game)

game.state.add('menu', menuState)
game.state.add('play', playState)

game.state.start('menu')
