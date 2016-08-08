'use strict'

// import {Utils} from '../cls/utils.js'
import {Global} from '../../cls/global.js'
import {config as c} from '../../cls/config.js'
import {createBag, createBug} from '../../cls/fabric.js'

let _createBagEvent = null

export function update (game) {
  let lastBug = null
  const bugsGroup = Global.get('bugsGroup')
  const bagsGroup = Global.get('bagsGroup')

  bugsGroup.forEachExists((bug) => {
    // Utils.debug(bug)
    if (bug.body.y < game.height - bug.body.height - c.marginFloor) {
      bug.body.y = game.height - bug.body.height - c.marginFloor
    }
    if (bug.body.velocity.x < 10) {
      bug.body.velocity.x = c.bugVelocity
    }
    if (bug.body.x > game.width) {
      Global.get('scoreObj').increaseTimeout(5 + Math.round(2.5 * bug.children.length))
      Global.get('scoreObj').increaseScore(1 + 10 * bug.children.length)
      bug.destroy()
    } else if (!lastBug || lastBug.body.x > bug.body.x) {
      lastBug = bug
    }
  })

  if (
    !lastBug ||
    (lastBug && lastBug.body.x > game.width / 2 && game.rnd.integerInRange(0, 100) < 2) ||
    (lastBug && lastBug.body.x > game.width / 5 && game.rnd.integerInRange(0, 1000) < 3)
  ) {
    bugsGroup.add(createBug())
  }

  let bagCount = 0
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
    const maxY = (game.height * c.yBagMoveLimitPercent) - (bag.body.height * 1.25) + 10
    if (bag.y > maxY) {
      bag.inputEnabled = false
      bag.body.gravity.y = c.bagDropGravity
    }

    if (bag.body.x >= game.width) {
      bag.destroy()
    } else {
      bagCount++
    }
  })

  if (bagCount < Global.get('bagMaxCount') && !_createBagEvent) {
    _createBagEvent = game.time.events.add(Phaser.Timer.SECOND, () => {
      bagsGroup.add(createBag())
    })
    setTimeout(() => {
      _createBagEvent = null
    }, Phaser.Timer.SECOND)
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
  game.physics.arcade.collide(bagsGroup, bagsGroup)
}

function collideUpBugsBags (obj1, obj2) {
  let bug
  let bag

  if (obj1.key === 'bug') {
    bug = obj1
    bag = obj2
  } else if (obj2.key === 'bug') {
    bug = obj2
    bag = obj1
  } else {
    return
  }

  const dx = Math.abs(bug.x - bag.x)

  if (bag.x > bug.x - bag.width * 0.4 && bag.x + bag.width < bug.x + bug.width - bug.width * 0.2) {
    const bagsGroup = Global.get('bagsGroup')
    bag.body.bounce.x = 0
    bag.body.bounce.y = 0
    bag.body.velocity.x = 0
    bag.body.velocity.y = 0
    bag.x = dx
    bag.y = 0
    bag.body.setSize(140, 180, 0, 180 * 0.45)
    bagsGroup.remove(bag)
    bug.addChild(bag)
  } else if (bag.x + bag.width > bug.x + bug.width - bug.width * 0.2 && bag.x < bug.x + bug.width) {
    bag.body.bounce.x = 0
    bag.body.bounce.y = 0
    bag.body.velocity.x = 0
    bag.body.velocity.y = 0
    bag.x = dx
    bag.y = bug.height - bag.height
    bag.body.setSize(140, 180, 0, 180 * 0.2)
    bug.body.velocity.x = c.bugVelocity * 0.3

    bug.addChild(bag)
    bug.animations.play('kill')
    bug.__tween = Global.get('game').add.tween(bug)
      .to({alpha: 0}, 400, Phaser.Easing.Linear.None, false, 1500, 0, false)
    bug.__tween.start()
    bug.__tween.onComplete.add(function (sprite) {
      sprite.destroy()
    })
  }
}
