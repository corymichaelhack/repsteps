export default class Block {
  constructor(line) {
    this._lines = []

    if (line) {
      this._lines.push(line)
    }
  }

  addLineToTop(line) {
    this._lines.unshift(line)
  }

  addLine(line) {
    this._lines.push(line)
  }

  getLines() {
    return this._lines
  }
}
