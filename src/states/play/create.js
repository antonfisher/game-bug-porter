'use strict'

import {Global} from '../../cls/global.js'
import {Score} from '../../cls/score.js'
import {Utils} from '../../cls/utils.js'
import {config as c} from '../../cls/config.js'
import {createBag, createBug, createDashLine} from '../../cls/fabric.js'

export function create (game) {
  Utils.normalizeScale(game)

  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.world.setBounds(-350, 0, game.width + 700, game.height - c.marginFloor)

  const platformGroup = game.add.group()
  const backgroundGroup = game.add.group(platformGroup)
  const bugsGroup = game.add.group(platformGroup)
  const bagsGroup = game.add.group(platformGroup)

  const bgWood = game.add.tileSprite(0, 0, game.width, game.height - c.heightFloor, 'bg-wood')
  bgWood.alpha = 0.7
  bgWood.smoothed = false
  backgroundGroup.add(bgWood)

  const bgFloor = game.add.tileSprite(0, game.height - c.heightFloor, game.width, game.height, 'bg-floor')
  bgFloor.alpha = 0.7
  bgFloor.smoothed = false
  backgroundGroup.add(bgFloor)

  backgroundGroup.add(createDashLine(c.yBagMoveLimitPercent))

  bagsGroup.add(createBag())
  bugsGroup.add(createBug())

  Global.set('bugsGroup', bugsGroup)
  Global.set('bagsGroup', bagsGroup)
  Global.set('bagMaxCount', c.bagMaxCount)

  let gameTime = 0
  const score = new Score(game)
  const initTimeout = score.decreaseTimeout()
  const text = game.add.bitmapText(0, game.height / 150, 'pixel', ' ^ :' + initTimeout + ' ', game.height / 140)
  const deadline = game.time.events.repeat(Phaser.Timer.SECOND, c.matchTimeout * 100000, () => {
    const timeout = score.decreaseTimeout()
    if (timeout === 0) {
      game.time.events.remove(deadline)
      game.state.start('menu')
    }
    text.setText(' ^ :' + timeout + ' ')
    if ((gameTime++) % 5 === 0) {
      Global.set('bagMaxCount', Global.get('bagMaxCount') + 1)
    }
  })

  Global.set('scoreObj', score)
}
