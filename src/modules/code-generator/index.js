import RepStepListGenerator from '@/modules/code-generator/repSteps'
import BrowserInfoListGenerator from '@/modules/code-generator/browserInfo'

export default class CodeGenerator {
  constructor(options = {}) {
    this.repStepGenerator = new RepStepListGenerator(options)
    this.browserInfoGenerator = new BrowserInfoListGenerator(options)
  }

  generate(recording) {
    return {
      repSteps: this.repStepGenerator.generate(recording),
      browserInfo: this.browserInfoGenerator.generate(recording),
    }
  }
}
