'use strict'

import {Global} from './global.js'
import {config as c} from './config.js'

let bagsPositions = []

export function createBag () {
  let position = null
  const bagMaxCount = Global.get('bagMaxCount') || c.bagMaxCount

  const game = Global.get('game')
  const freePositions = Array(bagMaxCount).fill().map((v, k) => k).filter((i) => {
    return !bagsPositions.includes(i)
  })

  if (freePositions.length) {
    position = freePositions[game.rnd.integerInRange(0, freePositions.length - 1)]
    bagsPositions.push(position)
    game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      bagsPositions.splice(bagsPositions.indexOf(position), 1)
    })
  }

  const bag = game.add.sprite(
    ((game.width - 140 - game.width / 35) / bagMaxCount * position) + (game.width / 35),
    game.height * c.scorePanelHeightPercent,
    'bag'
  )

  game.physics.arcade.enable(bag)

  bag._position = position

  //  Player physics properties. Give the little guy a slight bounce.
  bag.body.bounce.y = 0.2
  bag.body.gravity.y = c.bagStartupGravity
  bag.body.collideWorldBounds = true
  bag.body.setSize(140, 180 * 0.8, 0, 180 * 0.2)

  bag.smoothed = false

  bag.animations.add('move', [0, 1, 2, 3], 5, true)
  bag.animations.play('move')

  if (Global.get('scoreObj').gameOn()) {
    bag.inputEnabled = true
    bag.input.enableDrag(false, false)
  }

  const mixY = game.height * c.scorePanelHeightPercent
  const maxY = (game.height * c.yBagMoveLimitPercent) - (bag.body.height * 1.25)

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
    sprite.body.gravity.y = c.bagDropGravity
    sprite.body.velocity.y = c.bagDropVelocity
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
  const width = game.height / 250

  bmd.ctx.beginPath()
  bmd.ctx.lineWidth = width
  bmd.ctx.strokeStyle = '#4d4d4d'
  bmd.ctx.setLineDash([width * 4, width * 3])
  bmd.ctx.moveTo(width, maxY)
  bmd.ctx.lineTo(game.width - width, maxY)
  bmd.ctx.stroke()
  bmd.ctx.closePath()

  return game.add.sprite(0, 0, bmd)
}

export function createButton (spriteTag, onClick) {
  const game = Global.get('game')
  const offset = new Phaser.Point(15, 15)
  const btnGroup = game.add.group()
  const configure = (b) => {
    b.scale.set(2)
    b.anchor.setTo(0.5)
    b.smoothed = false
    b.x = game.width / 2
  }

  const btn = game.add.sprite(0, 0, spriteTag)
  configure(btn)
  btn.x = game.width / 2
  btn.y = game.height / 2 - btn.height * 2

  btn.inputEnabled = true
  btn.events.onInputDown.add(() => {
    btn.x += offset.x / 2
    btn.y += offset.y / 2
  })
  btn.events.onInputUp.add(() => {
    btn.x -= offset.x / 2
    btn.y -= offset.y / 2
    onClick.bind(game)()
  })

  const shadow = game.add.sprite(0, 0, spriteTag)
  configure(shadow)
  shadow.y = game.height / 2 - shadow.height * 2
  shadow.tint = 0x000000
  shadow.alpha = 0.4

  shadow.x = btn.x + offset.x
  shadow.y = btn.y + offset.y

  btnGroup.add(shadow)
  btnGroup.add(btn)
  return btnGroup
}
