'use strict'

import {Global} from './global.js'
import {config as c} from './config.js'

export function createBag (position) {
  const game = Global.get('game')
  const bag = game.add.sprite((game.width / 5) * (position || 1), game.height * c.scorePanelHeightPercent, 'bag')

  game.physics.arcade.enable(bag)

  //  Player physics properties. Give the little guy a slight bounce.
  bag.body.bounce.y = 0.2
  bag.body.gravity.y = 5
  bag.body.collideWorldBounds = true
  bag.body.setSize(140, 180 * 0.8, 0, 180 * 0.2)

  bag.smoothed = false

  bag.animations.add('move', [0, 1, 2, 3], 5, true)
  bag.animations.play('move')

  bag.inputEnabled = true
  bag.input.enableDrag(false, false)

  bag.events.onDragStart.add((sprite, pointer) => {
    const dy = sprite.y - pointer.y
    const dx = sprite.x - pointer.x

    sprite.body.velocity.y = 0
    sprite.events.onDragUpdate.add((sprite, pointer) => {
      const maxX = game.width - bag.width
      let x = pointer.x + dx
      if (x > maxX) {
        x = maxX
      } else if (x < 0) {
        x = 0
      }
      sprite.x = x

      const mixY = game.height * c.scorePanelHeightPercent
      const maxY = (game.height * c.yBagMoveLimitPercent) - (bag.body.height * 1.25)
      let y = pointer.y + dy
      if (y > maxY) {
        y = maxY
      } else if (y < mixY) {
        y = mixY
      }
      sprite.y = y
    }, this)
  }, this)

  bag.events.onDragStop.add((sprite) => {
    sprite.events.onDragUpdate.removeAll()
    sprite.input.disableDrag()
    sprite.body.gravity.y = 300
    sprite.body.velocity.y = 25
  }, this)

  return bag
}

export function createBug () {
  const game = Global.get('game')
  const bug = game.add.sprite(-350, 0, 'bug')

  game.physics.arcade.enable(bug)

  bug.body.bounce.y = 0
  bug.body.gravity.y = 400
  bug.body.collideWorldBounds = true
  bug.body.friction = 1
  bug.body.velocity.x = c.bugVelocity
  bug.body.immovable = false
  bug.body.setSize(320, 220 * 0.35, 0, 220 * 0.5)

  bug.smoothed = false

  bug.animations.add('move', [0, 1, 2, 3], 10, true)
  bug.animations.add('kill', [4, 5], 10, true)
  bug.animations.play('move')

  return bug
}

export function createDashLine (limitPercent) {
  const game = Global.get('game')
  const bmd = game.add.bitmapData(game.width, game.height)
  const maxY = game.height * limitPercent

  bmd.ctx.beginPath()
  bmd.ctx.lineWidth = 2.5
  bmd.ctx.strokeStyle = '#4d4d4d'
  bmd.ctx.setLineDash([13, 7])
  bmd.ctx.moveTo(10, maxY)
  bmd.ctx.lineTo(game.width, maxY)
  bmd.ctx.stroke()
  bmd.ctx.closePath()

  return game.add.sprite(0, 0, bmd)
}
