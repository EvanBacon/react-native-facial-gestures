export default class Expression {
  name = '';
  shapes = [];
  getBlendShapes = () => {
    return this.shapes.map(({ shape }) => shape);
  };
  constructor() {
    this.isExpressing = this.isExpressing.bind(this);
  }
  isExpressing(blendShapes) {
    for (let shape of this.shapes) {
      if (!shape.isMet(blendShapes)) return false;
    }
    return true;
  }
}
