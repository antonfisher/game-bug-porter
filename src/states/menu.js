'use strict'

import {preload} from './menu/preload.js'
import {create} from './menu/create.js'
import {update} from './menu/update.js'

export let menuState = {preload, create, update}
