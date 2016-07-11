'use strict'

export function preload (game) {
  game.load.spritesheet('bag', '/assets/bag.png', 140, 180)
  game.load.spritesheet('bug', '/assets/bug.png', 320, 210)
  game.load.image('bg-wood', '/assets/bg-wood.png', 320, 320)
  game.load.image('bg-floor', '/assets/bg-floor.png', 320, 120)
}
