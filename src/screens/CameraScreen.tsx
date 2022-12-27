import { Camera, CameraType } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) requestPermission();
  if (!permission?.granted) return <Text>Permission not granted</Text>;

  const takePicture = () => {
    // TODO to be implemented
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ratio="4:3">
        <View>
          <TouchableOpacity style={styles.shutter} onPress={takePicture} />
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  camera: {
    aspectRatio: 3 / 4,
    backgroundColor: 'pink',
    width: '100%',
  },
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
  },
  shutter: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 50,
    width: 50,
  },
});
