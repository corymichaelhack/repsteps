import RepStepListGenerator from '@/modules/code-generator/repSteps'

export default class CodeGenerator {
  constructor(options = {}) {
    this.repStepGenerator = new RepStepListGenerator(options)
  }

  generate(recording) {
    return {
      repSteps: this.repStepGenerator.generate(recording),
    }
  }
}
