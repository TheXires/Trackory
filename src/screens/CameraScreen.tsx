import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('4:3');

  const [camera, setCamera] = useState<Camera | null>(null);

  useEffect(() => {
    const setUpCamera = async () => {
      if (Platform.OS === 'android') {
        const availableRatios = await camera?.getSupportedRatiosAsync();
        ['4:3', '1:1', '3:2', '5:3', '16:9'].every((ratio) => {
          if (availableRatios?.includes(ratio)) {
            setSelectedAspectRatio(ratio);
            return false;
          }
          return true;
        });
      }
    };
    setUpCamera();
  }, []);

  if (!permission) requestPermission();
  if (!permission?.granted) return <Text>Permission not granted</Text>;

  const calculateAspectRatio = (ratio: string) => {
    const [width, height] = ratio.split(':').map(Number);
    return height / width;
  };

  const takePicture = () => {
    // TODO to be implemented
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={{ aspectRatio: calculateAspectRatio(selectedAspectRatio) }}
          type={CameraType.back}
          ratio={selectedAspectRatio}
        />
      </View>
      {/* TODO figure out a good position for the buttons (ios is currently looking weird) */}
      <View style={styles.buttonContainer}>
        <View>{/* TODO add button to select image from gallery */}</View>
        <View style={styles.shutterRing}>
          <TouchableOpacity onPress={takePicture} style={styles.shutter} />
        </View>
        <View>{/* TODO add button to flip camera */}</View>
      </View>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  shutter: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  shutterRing: {
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 3,
    height: 78,
    justifyContent: 'center',
    width: 78,
  },
});
