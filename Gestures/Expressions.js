import { AR } from 'expo';
import ShapePose from './ShapePose';
import Expression from './Expression';
import { FaceGesture } from './FaceGesture';

export class NoSmileExpression extends Expression {
  name = 'No Smile';

  shapes = [
    new ShapePose({ shape: AR.BlendShapes.MouthSmileL, max: 0.01 }),
    new ShapePose({ shape: AR.BlendShapes.MouthSmileR, max: 0.01 }),
  ];
}

export class SmileExpression extends Expression {
  name = 'Smile';

  shapes = [
    new ShapePose({ shape: AR.BlendShapes.MouthSmileL, min: 0.5 }),
    new ShapePose({ shape: AR.BlendShapes.MouthSmileR, min: 0.5 }),
  ];
}

export class JawOpenExpression extends Expression {
  name = 'Open Wide';
  shapes = [new ShapePose({ shape: AR.BlendShapes.JawOpen, min: 0.7 })];
}

export class LookLeftExpression extends Expression {
  name = 'Look Left';
  shapes = [new ShapePose({ shape: AR.BlendShapes.EyeLookOutR, min: 0.9 })];
}

export class LookRightExpression extends Expression {
  name = 'Look Right';
  shapes = [new ShapePose({ shape: AR.BlendShapes.EyeLookOutL, min: 0.9 })];
}

export class EyebrowsRaisedExpression extends Expression {
  name = 'Raise Eyebrows';
  shapes = [new ShapePose({ shape: AR.BlendShapes.BrowInnerUp, min: 0.7 })];
}

export class EyeCloseLeftExpression extends Expression {
  name = 'Close Eye Right';
  shapes = [new ShapePose({ shape: AR.BlendShapes.EyeBlinkL, min: 0.6 })];
}

export class EyeOpenLeftExpression extends Expression {
  name = 'Open Eye Right';
  shapes = [new ShapePose({ shape: AR.BlendShapes.EyeBlinkL, max: 0.0001 })];
}

export class EyeBlinkLeftExpression extends Expression {
  name = 'Blink Right';
  shapes = [new ShapePose({ shape: AR.BlendShapes.EyeBlinkL, min: 0.6 })];
}

export class EyeBlinkRightExpression extends Expression {
  name = 'Blink Left';
  shapes = [new ShapePose({ shape: AR.BlendShapes.EyeBlinkR, min: 0.6 })];
}

export class CheekPuffExpression extends Expression {
  name = 'Puff Cheeks';
  shapes = [new ShapePose({ shape: AR.BlendShapes.CheekPuff, min: 0.4 })];
}
