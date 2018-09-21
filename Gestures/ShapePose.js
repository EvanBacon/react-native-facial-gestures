export default class ShapePose {
  shape;
  min = null;
  max = null;
  constructor(props) {
    const { shape, min, max } = props || {};
    this.shape = shape;
    this.min = min;
    this.max = max;
    if (!shape) {
      throw new Error('ShapePose: `shape` must be defined');
    }
  }
  isMet = shapes => {
    const { [this.shape]: shape } = shapes;
    if (shape === undefined) {
      throw new Error(`ShapePose: BlendShape ${this.shape} is not defined.`);
    }
    let isMet = false;
    if (this.min != null) {
      isMet = shape > this.min;
    }
    if (this.max != null) {
      isMet = shape < this.max;
    }
    return isMet;
  };
}
