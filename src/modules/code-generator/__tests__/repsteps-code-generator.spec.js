import RepStepListGenerator from '../repSteps'
import { headlessActions } from '@/services/constants'

describe('RepStepListGenerator', () => {
  test('it should generate nothing when there are no events', () => {
    const events = []
    const codeGenerator = new RepStepListGenerator()
    expect(codeGenerator._parseEvents(events)).toContain('')
  })

  test('it generates input values', () => {
    const events = [
      {
        action: 'change',
        // selector: 'select#animals',
        tagName: 'SELECT',
        value: 'hamster',
      },
    ]
    const codeGenerator = new RepStepListGenerator()
    expect(codeGenerator._parseEvents(events)).toContain('Input a value like: hamster')
  })

// ==============================================================
// Inlcude Iframe testing

  // test('it uses the default page frame when events originate from frame 0', () => {
  //   const events = [
  //     {
  //       action: 'click',
  //       selector: 'a.link',
  //       frameId: 0,
  //       frameUrl: 'https://some.site.com',
  //     },
  //   ]
  //   const codeGenerator = new RepStepListGenerator()
  //   const result = codeGenerator._parseEvents(events)
  //   expect(result).toContain("await page.click('a.link')")
  // })

  // test('it uses a different frame when events originate from an iframe', () => {
  //   const events = [
  //     {
  //       action: 'click',
  //       selector: 'a.link',
  //       frameId: 123,
  //       frameUrl: 'https://some.iframe.com',
  //     },
  //   ]
  //   const codeGenerator = new RepStepListGenerator()
  //   const result = codeGenerator._parseEvents(events)
  //   expect(result).toContain("await frame_123.click('a.link')")
  // })

  // test('it adds a frame selection preamble when events originate from an iframe', () => {
  //   const events = [
  //     {
  //       action: 'click',
  //       selector: 'a.link',
  //       frameId: 123,
  //       frameUrl: 'https://some.iframe.com',
  //     },
  //   ]
  //   const codeGenerator = new RepStepListGenerator()
  //   const result = codeGenerator._parseEvents(events)
  //   expect(result).toContain('let frames = await page.frames()')
  //   expect(result).toContain(
  //     "const frame_123 = frames.find(f => f.url() === 'https://some.iframe.com'"
  //   )
  // })
// ==============================================================

// ==============================================================
// Include Screenshot

  // test('it generates the correct current page screenshot code', () => {
  //   const events = [{ action: headlessActions.SCREENSHOT }]
  //   const codeGenerator = new RepStepListGenerator()
  //   const result = codeGenerator._parseEvents(events)

  //   expect(result).toContain("await page.screenshot({ path: 'screenshot_1.png' })")
  // })

  // test('it generates the correct clipped page screenshot code', () => {
  //   const events = [
  //     {
  //       action: headlessActions.SCREENSHOT,
  //       value: { x: '10px', y: '300px', width: '800px', height: '600px' },
  //     },
  //   ]
  //   const codeGenerator = new RepStepListGenerator()
  //   const result = codeGenerator._parseEvents(events)

  //   expect(result).toContain(
  //     "await page.screenshot({ path: 'screenshot_1.png', clip: { x: 10, y: 300, width: 800, height: 600 } })"
  //   )
  // })

// ==============================================================

  test('it generates the correct escaped value', () => {
    const events = [
      {
        action: 'keydown',
        keyCode: 13,
        value: 'hello world',
      },
    ]
    const codeGenerator = new RepStepListGenerator()
    const result = codeGenerator._parseEvents(events)

    expect(result).toContain("Type value: 'hello world' into INPUT and hit Return/Enter")
  })

  test('it generates the correct output for click on A tag or link', () => {
    const events = [{ action: 'click', tagName: 'INPUT' }]
    const codeGenerator = new RepStepListGenerator()
    const result = codeGenerator._parseEvents(events)

    expect(result).toContain('Click inside INPUT field')
  })
})
