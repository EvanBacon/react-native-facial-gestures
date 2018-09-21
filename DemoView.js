import { AR } from 'expo';
import { GraphicsView } from 'expo-graphics';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BlinkGesture, SmileGesture } from './Gestures/FaceGestures';
import GestureManager from './Gestures/GestureManager';

const Settings = {
  pageTurning: true,
  zooming: true,
  panning: true,
};

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
      <View style={{ flex: 1 }}>
        <GraphicsView
          style={{ backgroundColor: 'orange', flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          arTrackingConfiguration={AR.TrackingConfigurations.Face}
          isArEnabled
          id={'graphics-view'}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  hint: {
    ...StyleSheet.absoluteFillObject,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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
  infoBoxContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  infoSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
  },
  coolMessage: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    position: 'absolute',
    left: 24,
    right: 24,
    padding: 24,
    backgroundColor: 'white',
    bottom: '10%',
  },
});

class InfoBox extends React.PureComponent {
  render() {
    const { title, children } = this.props;
    let value = (children || 0).toFixed(2);
    return (
      <View style={styles.infoBoxContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoSubtitle}>{value}</Text>
      </View>
    );
  }
}
