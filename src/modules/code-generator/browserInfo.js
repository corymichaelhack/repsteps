// browserInfo.js

// Collect the browser info related to the recent RepSteps list

import BaseGenerator from '@/modules/code-generator/base-generator'
import { headlessActions } from '@/modules/code-generator/constants'

export default class BrowserInfoGenerator extends BaseGenerator {
  constructor(options) {
    super(options)
  }

  _parseEvents(events) {
    let result = ''

    if (!events) return result
    for (let i = 0; i < events.length; i++) {
      const { action, value } = events[i]

      switch (action) {
        case headlessActions.VIEWPORT:
          this._blocks.unshift(
            this._handleViewport(value.windowWidth, value.windowHeight, value.browserVendor)
          )
          break
      }
    }

    this._postProcess()

    const newLine = `\n`

    for (let block of this._blocks) {
      const lines = block.getLines()
      for (let line of lines) {
        result += line.value + newLine
      }
    }

    return result
  }

  generate(events) {
    return this._parseEvents(events)
  }
}
