import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import offlineImage from '../../assets/no-connection.png';
import CustomButton from '../components/CustomButton';
import Spacer from '../components/Spacer';
import { permanentColors } from '../theme/colors';
import { i18n } from '../util/translation';

interface Props {
  onPress: () => void;
}

function OfflineScreen({ onPress }: Props) {
  return (
    <View style={styles.container}>
      {/* image */}
      <Image source={offlineImage} style={{ aspectRatio: 500 / 361, height: 150 }} />
      <Spacer height={50} />
      {/* header */}
      <Text style={styles.title}>{i18n.t('clientOffline')}</Text>
      <Spacer height={10} />
      {/* text */}
      <Text style={styles.text}>{i18n.t('reconnectMessage')}</Text>
      <Spacer height={30} />
      {/* button */}
      <CustomButton value={i18n.t('retry')} onPress={onPress} />
    </View>
  );
}

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: permanentColors.background,
    flex: 1,
    justifyContent: 'center',
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
