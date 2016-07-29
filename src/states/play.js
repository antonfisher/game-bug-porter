'use strict'

import {preload} from './play/preload.js'
import {create} from './play/create.js'
import {update} from './play/update.js'

export let playState = {preload, create, update}
