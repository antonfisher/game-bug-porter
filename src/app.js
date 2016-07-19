'use strict'

import {Global} from './cls/global.js'
import {preload} from './states/preload.js'
import {create} from './states/create.js'
import {update} from './states/update.js'

const el = window.document.getElementById('game')
const game = new Phaser.Game(900, 1600, Phaser.AUTO, el, {preload, create, update}, true, false)

Global.set('game', game)
