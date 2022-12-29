import { Feather } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { calculateAspectRatio, getBestAspectRatio, selectImage, takeImage } from '../util/image';

function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('4:3');
  const [mainCamera, setMainCamera] = useState<boolean>(true);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [cameraAspectRatio, setCameraAspectRatio] = useState<number>(1);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') setSelectedAspectRatio(await getBestAspectRatio(camera));
    })();
  }, []);

  useEffect(() => {
    setCameraAspectRatio(calculateAspectRatio(selectedAspectRatio));
  }, [selectedAspectRatio]);

  if (!permission) requestPermission();
  // TODO add error message
  if (!permission?.granted) return <Text>Permission not granted</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={{
            alignItems: 'center',
            aspectRatio: cameraAspectRatio,
            justifyContent: 'center',
          }}
          type={mainCamera ? CameraType.back : CameraType.front}
          ratio={selectedAspectRatio}
        >
          <View style={styles.cameraBar} />
          <View style={styles.cameraCenter} />
          <View style={styles.cameraBar} />
        </Camera>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Feather
            name="image"
            size={35}
            color="white"
            onPress={async () => setImage(await selectImage())}
          />
        </View>
        <View style={styles.shutterRing}>
          <TouchableOpacity
            onPress={async () => setImage(await takeImage(camera))}
            style={styles.shutter}
          />
        </View>
        <View>
          <Feather
            name="refresh-cw"
            size={35}
            color="white"
            onPress={() => setMainCamera(!mainCamera)}
          />
        </View>
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={{ height: 200, left: 0, position: 'absolute', top: 0, width: 200 }}
        />
      )}
    </SafeAreaView>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: 50,
  },
  cameraBar: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.7,
    width: '100%',
  },
  cameraCenter: {
    aspectRatio: 1,
    width: '100%',
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
    height: 55,
    width: 55,
  },
  shutterRing: {
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 3,
    height: 73,
    justifyContent: 'center',
    width: 73,
  },
});
