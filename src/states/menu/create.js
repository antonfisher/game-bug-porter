'use strict'

import {Utils} from '../../cls/utils.js'
import {config as c} from '../../cls/config.js'
import {createText} from '../../cls/fabric.js'

export function create (game) {
  Utils.normalizeScale(game)

  const platformGroup = game.add.group()
  const backgroundGroup = game.add.group(platformGroup)
  const buttonsGroup = game.add.group(platformGroup)

  const bgWood = game.add.tileSprite(0, 0, game.width, game.height - c.heightFloor, 'bg-wood')
  bgWood.alpha = 0.7
  bgWood.smoothed = false
  backgroundGroup.add(bgWood)

  const bgFloor = game.add.tileSprite(0, game.height - c.heightFloor, game.width, game.height, 'bg-floor')
  bgFloor.alpha = 0.7
  bgFloor.smoothed = false
  backgroundGroup.add(bgFloor)

  const btnPlay = createText(' PLAY', 12, () => {
    game.state.start('play')
  })
  btnPlay.x = game.width * 0.5
  btnPlay.y = game.height * 0.5

  const authorText = createText(' ANTONFIHSER.COM', 2.75)
  authorText.x = game.width * 0.5
  authorText.y = game.height * 0.93

  buttonsGroup.add(btnPlay)
}
