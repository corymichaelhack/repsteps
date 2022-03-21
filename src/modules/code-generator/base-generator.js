import Block from '@/modules/code-generator/block'
import { headlessActions, eventsToRecord } from '@/modules/code-generator/constants'

export const defaults = {
  keyCode: 13,
}
export default class BaseGenerator {
  constructor(options) {
    this._options = Object.assign(defaults, options)
    this._blocks = []
    this._screenshotCounter = 0

    this._hasNavigation = false
  }

  generate() {
    throw new Error('Not implemented.')
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
        case headlessActions.VIEWPORT:
          this._blocks.unshift(
            this._handleViewport(value.windowWidth, value.windowHeight, value.browserVendor)
          )
          break
        case headlessActions.NAVIGATION:
          this._blocks.push(this._handleNavigation(href))
          this._hasNavigation = true
          break
        case headlessActions.SCREENSHOT:
          this._blocks.push(this._handleScreenshot(value))
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

  _postProcess() {
    this._postProcessAddBlankLines()
  }

  _handleKeyDown(value) {
    const block = new Block()
    block.addLine({
      type: eventsToRecord.KEYDOWN,
      value: `Type value: '${this._escapeUserInput(value)}' into INPUT and hit Return/Enter`,
    })
    return block
  }

  _handleClick(tagName, text) {
    const block = new Block()
    if (tagName === 'INPUT') {
      block.addLine({
        type: eventsToRecord.CLICK,
        value: `Click inside ${tagName} field`,
      })
    } else if (tagName === ('A' || 'LINK')) {
      block.addLine({
        type: eventsToRecord.CLICK,
        value: `Click link with text: "${text}"`,
      })
    } else {
      block.addLine({
        type: eventsToRecord.CLICK,
        value: `Click text: "${text}"`,
      })
    }
    return block
  }

  _handleChange(selector, value) {
    return new Block({
      type: eventsToRecord.CHANGE,
      value: `Input a value like: ${value}`,
    })
  }

  _handleViewport(windowWidth, windowHeight, browserVendor) {
    return new Block({
      type: headlessActions.VIEWPORT,
      value: `BrowserInfo:\n  Broswer Vendor: ${browserVendor}\n  Window size: width: ${windowWidth}, height: ${windowHeight}`,
    })
  }

// include screenshot
//   _handleScreenshot(value) {
//     this._screenshotCounter += 1

//     if (value) {
//       return new Block({
//         type: headlessActions.SCREENSHOT,
//         value: `const element${this._screenshotCounter} = await page.$('${value}')
// await element${this._screenshotCounter}.screenshot({ path: 'screenshot_${this._screenshotCounter}.png' })`,
//       })
//     }

//     return new Block({
//       type: headlessActions.SCREENSHOT,
//       value: `await ${this._frame}.screenshot({ path: 'screenshot_${this._screenshotCounter}.png', fullPage: true })`,
//     })
//   }

  _handleNavigation(href) {
    const block = new Block()
    block.addLine({
      type: headlessActions.NAVIGATION,
      value: `Navigate to: ${href}`,
    })
    return block
  }

  _postProcessAddBlankLines() {
    let i = 0
    while (i <= this._blocks.length) {
      const blankLine = new Block()
      blankLine.addLine({ type: null, value: '' })
      this._blocks.splice(i, 0, blankLine)
      i += 2
    }
  }

  _escapeUserInput(value) {
    return value?.replace(/\\/g, '\\\\')?.replace(/'/g, "\\'")
  }
}
