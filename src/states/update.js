'use strict'

import {Utils} from '../cls/utils.js'
import {Global} from '../cls/global.js'
import {config as c} from '../cls/config.js'
import {createBag, createBug} from '../cls/fabric.js'

export function update (game) {
  let lastBug = null
  const bugsGroup = Global.get('bugsGroup')
  const bagsGroup = Global.get('bagsGroup')

  bugsGroup.forEachExists((bug) => {
    Utils.debug(bug)

    if (bug.body.y < game.height - bug.body.height - c.marginFloor) {
      bug.body.y = game.height - bug.body.height - c.marginFloor
    }

    bug.body.velocity.x = 100

    if (bug.body.x > game.width) {
      bug.destroy()
    } else if (!lastBug || lastBug.body.x > bug.body.x) {
      lastBug = bug
    }
  })

  if (!lastBug || (lastBug && lastBug.body.x > game.width * c.scale / 2)) {
    bugsGroup.add(createBug())
  }

  let bagExists = false
  bagsGroup.forEachExists((bag) => {
    // Utils.debug(bag)
    if (bag.body.y >= game.height - bag.body.height - c.marginFloor - 1) {
      bag.body.velocity.x = 0

      if (!bag.__tween) {
        bag.__tween = game.add.tween(bag).to({alpha: 0}, 400, Phaser.Easing.Linear.None, false, 2500, 0, false)
        bag.__tween.start()
        bag.__tween.onComplete.add(function (sprite) {
          sprite.destroy()
        })
      } else if (bag.__tween.isPaused) {
        bag.__tween.resume()
      } else if (!bag.__tween.isRunning) {
        bag.__tween.start()
      }
    } else if (bag.__tween && !bag.__tween.isPaused) {
      bag.__tween.pause()
    }
    bagExists = true

    if (bag.body.x > game.width) {
      bag.destroy()
    }
  })

  if (!bagExists) {
    bagsGroup.add(createBag())
  }

  bugsGroup.forEachExists((bug) => {
    bug.body.checkCollision.up = true
    bug.body.checkCollision.right = false
  })
  game.physics.arcade.collide(bagsGroup, bugsGroup, collideUpBugsBags, null, this)

  bugsGroup.forEachExists((bug) => {
    bug.body.checkCollision.up = false
    bug.body.checkCollision.right = true
  })
  game.physics.arcade.collide(bagsGroup, bugsGroup)
}

function collideUpBugsBags (bag, bug) {
  if (bag.x > bug.x - bag.width * 0.4 && bag.x + bag.width < bug.x + bug.width - bug.width * 0.2) {
    const dx = Math.abs(bug.x - bag.x)
    bag.body.bounce.x = 0
    bag.body.bounce.y = 0
    bag.body.velocity.x = 0
    bag.body.velocity.y = 0
    bag.x = dx
    bag.y = 0
    bag.body.setSize(140 * c.scale, 180 * c.scale, 0, 180 * c.scale * 0.45)
    bug.addChild(bag)
  } else if (bag.x + bag.width > bug.x + bug.width - bug.width * 0.2 && bag.x < bug.x + bug.width) {
    bag.body.bounce.x = 0
    bag.body.bounce.y = 0
    bag.body.velocity.x = 0
    bag.body.velocity.y = 0
    bug.destroy()
  }
}