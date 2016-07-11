'use strict'

import {Global} from '../cls/global.js'
import {config as c} from '../cls/config.js'
import {createBag, createBug, createDashLine} from '../cls/fabric.js'

export function create (game) {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.world.setBounds(-350, 0, game.width + 700, game.height - c.marginFloor)

  const platformGroup = game.add.group()

  platformGroup.scale.set(c.scale)

  const backgroundGroup = game.add.group(platformGroup)
  const bugsGroup = game.add.group(platformGroup)
  const bagsGroup = game.add.group(platformGroup)

  const bgWood = game.add.tileSprite(0, 0, game.width / c.scale, game.height / c.scale - c.heightFloor, 'bg-wood')
  bgWood.alpha = 0.7
  backgroundGroup.add(bgWood)

  const bgFloor = game.add.tileSprite(
    0,
    game.height / c.scale - c.heightFloor,
    game.width / c.scale,
    game.height / c.scale,
    'bg-floor'
  )
  bgFloor.alpha = 0.7
  backgroundGroup.add(bgFloor)

  backgroundGroup.add(createDashLine())

  bagsGroup.add(createBag())
  bugsGroup.add(createBug())

  Global.set('bugsGroup', bugsGroup)
  Global.set('bagsGroup', bagsGroup)
}
