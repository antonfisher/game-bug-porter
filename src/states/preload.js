'use strict'

export function preload (game) {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  game.scale.pageAlignHorizontally = true
  game.scale.pageAlignVertically = true
  game.stage.backgroundColor = '#ff0000'

  game.load.spritesheet('bag', '/assets/bag.png', 140, 180)
  game.load.spritesheet('bug', '/assets/bug.png', 320, 210)
  game.load.image('bg-wood', '/assets/bg-wood.png', 320, 320)
  game.load.image('bg-floor', '/assets/bg-floor.png', 320, 120)

  game.load.bitmapFont('pixel', '/assets/font/pixel.png', '/assets/font/pixel.xml')
}
