import {
  EyeCloseLeftExpression,
  EyeOpenLeftExpression,
  SmileExpression,
  NoSmileExpression,
} from './Expressions';
import FaceGesture from './FaceGesture';

export class BlinkGesture extends FaceGesture {
  expressions = [new EyeOpenLeftExpression(), new EyeCloseLeftExpression()];
}

export class SmileGesture extends FaceGesture {
  expressions = [new NoSmileExpression(), new SmileExpression()];
}
