import { AR } from 'expo';

export default class GestureManager {
  gestures = [];

  constructor() {
    const hasFace = function(anchors) {
      for (let anchor of anchors) {
        if (anchor.type === AR.AnchorTypes.Face) return true;
      }
    };

    this.observer = AR.onAnchorsDidUpdate(({ anchors }) => {
      if (this.blendShapes && hasFace(anchors)) {
        /*
          After we know a face anchor is found, we can request frame data regarding the face.
          There is a lot of data so here we are just getting 2 blendShapes. 
          If you just return `true` it will get everything.
          You can also get the geometry but I don't recommend this as it's experimental.
          */
        const frame = AR.getCurrentFrame({
          [AR.FrameAttributes.Anchors]: {
            [AR.AnchorTypes.Face]: {
              blendShapes: this.blendShapes,
            },
          },
        });
        for (let anchor of frame.anchors) {
          if (anchor.type === AR.AnchorTypes.Face) {
            this.handleFace(anchor);
          }
        }
      }
    });
    this.handleFace = this.handleFace.bind(this);
  }

  add = gesture => {
    this.gestures.push(gesture);
    this.updateBlendShapes();
  };
  remove = gesture => {
    this.gestures = this.gestures.filter(item => {
      if (item !== gesture) return item;
    });
    this.updateBlendShapes();
  };

  updateBlendShapes = () => {
    this.blendShapes = this.getBlendShapes();
  };

  destroy = () => {
    if (this.observer) {
      this.observer();
    }
    this.gestures = [];
  };

  handleFace({ blendShapes }) {
    for (let gesture of this.gestures) {
      gesture.update(blendShapes);
    }
  }

  getBlendShapes = () => {
    let shapes = [];
    for (let gesture of this.gestures) {
      shapes = [...shapes, ...gesture.getBlendShapes()];
    }
    return shapes;
  };
}
