import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import offlineImage from '../../assets/no-connection.png';
import { permanentColors } from '../theme/colors';
import Spacer from '../components/Spacer';
import CustomButton from '../components/CustomButton';

interface Props {
  onPress: () => void;
}

function OfflineScreen({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <Image source={offlineImage} style={{ aspectRatio: 500 / 361, height: 150 }} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Du bist momentan offline.</Text>
        <Spacer height={10} />
        <Text style={styles.text}>
          Stelle eine Verbindung zum Internet her und versuche es erneut.
        </Text>
      </View>
      <CustomButton value="Neu laden" onPress={onPress} />
    </View>
  );
}

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: permanentColors.background,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  innerContainer: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
