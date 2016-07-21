'use strict'

import {Global} from './cls/global.js'
import {preload} from './states/preload.js'
import {create} from './states/create.js'
import {update} from './states/update.js'

const el = window.document.getElementById('game')
const height = 1600;
const width = (el.clientWidth * height / el.clientHeight)
const game = new Phaser.Game(width, height, Phaser.AUTO, el, {preload, create, update}, true, false)

Global.set('game', game)
