'use strict'

import {Global} from '../cls/global.js'
import {config as c} from '../cls/config.js'
import {createBag, createBug, createDashLine} from '../cls/fabric.js'

export function create (game) {
  game.stage.smoothed = false
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

  //backgroundGroup.add(createDashLine(c.scorePanelHeightPercent))
  backgroundGroup.add(createDashLine(c.yBagMoveLimitPercent))

  bagsGroup.add(createBag())
  bugsGroup.add(createBug())

  Global.set('bugsGroup', bugsGroup)
  Global.set('bagsGroup', bagsGroup)

  let t = c.matchTimeout;
  const text = game.add.bitmapText(0, game.height / 150, 'pixel', ' * :' + t-- + ' ', game.height / 140)
  var deadline = game.time.events.repeat(Phaser.Timer.SECOND, c.matchTimeout * 2, () => {
    if (t === 0) {
      game.time.events.remove(deadline)
    }
    text.setText(' * :' + (t--) + ' ')
  })
}
