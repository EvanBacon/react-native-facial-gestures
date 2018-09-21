export default class FaceGesture {
  static States = {
    BEGAN: 'began',
    FAILED: 'failed',
    ENDED: 'ended',
  };
  name = '';
  delay = 1000;
  expressions = [];
  handlers = [];
  getBlendShapes = () => {
    let shapes = [];
    for (let expression of this.expressions) {
      shapes = [...shapes, ...expression.getBlendShapes()];
    }
    return shapes;
  };
  _currentExpressionIndex = 0;
  constructor() {
    this.update = this.update.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.fire = this.fire.bind(this);
    this.reset = this.reset.bind(this);
  }
  update(blendShapes) {
    let currentExpression = this.expressions[this._currentExpressionIndex];
    const now = Date.now();
    let complete = currentExpression.isExpressing(blendShapes);
    // console.log('Expression Complete', currentExpression.name);
    if (this._startTime == null) {
      if (complete) this.fire({ state: FaceGesture.States.BEGAN });
    } else if (now - this._startTime > this.delay) {
      this.fire({ state: FaceGesture.States.FAILED });
      this.reset();
      return;
    }
    if (complete) {
      this._startTime = now;
      if (this._currentExpressionIndex >= this.expressions.length - 1) {
        this.fire({ state: FaceGesture.States.ENDED });
        this.reset();
        return;
      } else {
        this._currentExpressionIndex++;
      }
    }
  }
  reset() {
    this._currentExpressionIndex = 0;
    this._startTime = null;
  }
  subscribe(fn) {
    this.handlers.push(fn);
  }
  unsubscribe(fn) {
    this.handlers = this.handlers.filter(function(item) {
      if (item !== fn) {
        return item;
      }
    });
  }
  fire(o) {
    this.handlers.forEach(item => item(o));
  }
}
