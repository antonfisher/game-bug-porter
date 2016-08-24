'use strict'

import {Utils} from '../../cls/utils.js'
import {Global} from '../../cls/global.js'
import {config as c} from '../../cls/config.js'
import {createText, createBug} from '../../cls/fabric.js'

export function create (game) {
  Utils.normalizeScale(game)

  const platformGroup = game.add.group()
  const backgroundGroup = game.add.group(platformGroup)
  const buttonsGroup = game.add.group(platformGroup)

  const bgWood = game.add.tileSprite(0, 0, game.width, game.height - c.heightFloor, 'bg-wood')
  bgWood.alpha = 0.7
  bgWood.smoothed = false
  backgroundGroup.add(bgWood)

  const bgFloor = game.add.tileSprite(0, game.height - c.heightFloor, game.width, game.height, 'bg-floor')
  bgFloor.alpha = 0.7
  bgFloor.smoothed = false
  backgroundGroup.add(bgFloor)

  const bag = createBug()
  bag.body.gravity = 0
  bag.anchor.setTo(0.5)
  bag.x = game.width * 0.52
  bag.y = game.height * 0.25

  const btnPlay = createText(' PLAY', 12, () => {
    game.state.start('play')
  })
  btnPlay.x = game.width * 0.5
  btnPlay.y = game.height * 0.5

  const authorText = createText(' ANTONFISHER.COM', 2.75, () => {
    const address = 'http://antonfisher.com/about'
    if (typeof device !== 'undefined' && device.platform && device.platform === 'iOS') {
      window.open(address, '_system')
      return false
    } else if (typeof navigator !== 'undefined' && navigator.app && navigator.app.loadUrl) {
      navigator.app.loadUrl(address, {openExternal: true})
      return false
    } else {
      window.open(address, '_blank')
      return false
    }
  })
  authorText.x = game.width * 0.5
  authorText.y = game.height * 0.93

  Global.set('vibrationEnabled', true);
  const ENABLE_VIBRATION_TEXT = '   ENABLE VIBRATION  '
  const DISABLE_VIBRATION_TEXT = '  DISABLE VIBRATION  '
  const disableVibrationText = createText(DISABLE_VIBRATION_TEXT, Utils.calculateFontSize(260), () => {
    const vibrationEnabled = !Global.get('vibrationEnabled')
    disableVibrationText.setText(vibrationEnabled ? DISABLE_VIBRATION_TEXT : ENABLE_VIBRATION_TEXT)
    Global.set('vibrationEnabled', vibrationEnabled)
  })
  disableVibrationText.x = game.width * 0.5
  disableVibrationText.y = game.height * 0.75

  buttonsGroup.add(btnPlay)
}
