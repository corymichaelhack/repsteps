import { headlessActions } from '@/modules/code-generator/constants'
import BaseGenerator from '@/modules/code-generator/base-generator'

export default class RepStepListGenerator extends BaseGenerator {
  constructor(options) {
    super(options)
  }

  _parseEvents(events) {
    let result = ''

    if (!events) return result
    for (let i = 0; i < events.length; i++) {
      const { action, selector, value, href, keyCode, tagName, text } = events[i]
      const escapedSelector = selector ? selector?.replace(/\\/g, '\\\\') : selector

      switch (action) {
        case 'keydown':
          if (keyCode === this._options.keyCode) {
            this._blocks.push(this._handleKeyDown(value))
          }
          break
        case 'click':
          this._blocks.push(this._handleClick(tagName, text))
          break
        case 'change':
          if (tagName === 'SELECT') {
            this._blocks.push(this._handleChange(escapedSelector, value, text))
          }
          break
        case headlessActions.NAVIGATION:
          this._blocks.push(this._handleNavigation(href))
          this._hasNavigation = true
          break
// ==============================================================
      // include screenshots    
        // case headlessActions.SCREENSHOT:
        //   this._blocks.push(this._handleScreenshot(value))
        //   break
// ==============================================================
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
