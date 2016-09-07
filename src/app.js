'use strict'

import {GA} from './cls/ga.js'
import {Global} from './cls/global.js'
import {config as c} from './cls/config.js'
import {menuState} from './states/menu.js'
import {playState} from './states/play.js'

GA.init(c.gaKey)

const el = window.document.getElementById('game')
const height = 1600
const width = (el.clientWidth * height / el.clientHeight)
const game = new Phaser.Game(width, height, Phaser.AUTO, el, null, true, false)

Global.set('game', game)

game.state.add('menu', menuState)
game.state.add('play', playState)

game.state.start('menu')
