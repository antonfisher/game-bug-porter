'use strict'

export function preload (game) {
  game.load.image('bg-wood', 'assets/bg-wood.png', 320, 320)
  game.load.image('bg-floor', 'assets/bg-floor.png', 320, 120)
  game.load.image('btn-play', 'assets/btn-play.png', 240, 70)

  game.load.bitmapFont('pixel', 'assets/font/pixel.png', 'assets/font/pixel.xml')
}
