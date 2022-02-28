// import Block from '@/modules/code-generator/block'
// import { headlessActions } from '@/modules/code-generator/constants'
import BaseGenerator from '@/modules/code-generator/base-generator'

// const repStepsDescription = `rep step descriptions`

export default class RepStepListGenerator extends BaseGenerator {
  constructor(options) {
    super(options)
  }

  generate(events) {
    return this._parseEvents(events)
  }
}
