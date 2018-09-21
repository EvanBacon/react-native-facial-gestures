import { AR } from 'expo';
import { GraphicsView } from 'expo-graphics';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { BlinkGesture, SmileGesture } from './Gestures/FaceGestures';
import GestureManager from './Gestures/GestureManager';
import { InfoBox } from './InfoBox';

export default class App extends React.PureComponent {
  state = {};

  componentDidMount() {
    THREE.suppressExpoWarnings();

    this.manager = new GestureManager();
    this.addGesture(new SmileGesture(), 'Smile');
    this.addGesture(new BlinkGesture(), 'Blink');
    // console.log('Need shapes', { blendShapes: this.manager.blendShapes });
  }

  addGesture = (gesture, name) => {
    gesture.subscribe(({ state }) => {
      if (state === 'ended') {
        const current = this.state[name] || 0;
        this.setState({ [name]: current + 1 });
      }
    });
    this.manager.add(gesture);
  };

  componentWillUnmount() {
    this.manager.destroy();
  }

  onContextCreate = async event => {
    this.commonSetup(event);
  };

  commonSetup = ({ gl, scale, width, height }) => {
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      width,
      height,
      pixelRatio: scale,
    });
    this.renderer.setClearColor(0xff0000);
    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);

    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
  };

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    const items = Object.keys(this.state);
    return (
      <View style={styles.container}>
        <GraphicsView
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          arTrackingConfiguration={AR.TrackingConfigurations.Face}
          isArEnabled
          id="graphics-view"
        />
        <View style={styles.infoContainer}>
          {items.map(item => (
            <InfoBox key={item} title={item}>
              {this.state[item]}
            </InfoBox>
          ))}
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
