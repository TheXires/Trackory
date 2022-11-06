import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import backgroundImage from '../../../assets/splash.jpg';
import CustomButton from '../../components/CustomButton';
import { permanentColors } from '../../theme/colors';
import { LandingPageNavigationProp } from '../../types/navigation';
import { i18n } from '../../util/translation';

function LandingScreen() {
  const navigation = useNavigation<LandingPageNavigationProp>();

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ height: '100%', width: '100%' }}
    >
      {/* Heading */}
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={[styles.headingRow, { marginLeft: '10%' }]}>
            <Text style={styles.heading}>{i18n.t('count')} </Text>
            <Text style={[styles.heading, { color: permanentColors.primary }]}>
              {i18n.t('calories')}
            </Text>
          </View>
          <View style={[styles.headingRow, { marginLeft: 'auto', marginRight: '10%' }]}>
            <Text style={styles.heading}>{i18n.t('life')} </Text>
            <Text style={[styles.heading, { color: permanentColors.success }]}>
              {i18n.t('healthier')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        {/* registration button */}
        <CustomButton
          value={i18n.t('register')}
          onPress={() => navigation.navigate('Registration')}
          buttonColor={permanentColors.success}
          style={{ marginBottom: 15 }}
        />

        {/* login button */}
        <CustomButton
          value={i18n.t('login')}
          onPress={() => navigation.navigate('Login')}
          style={{ marginBottom: 15 }}
        />
      </View>
    </ImageBackground>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headingRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  lowerContainer: {
    paddingBottom: 35,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  upperContainer: {
    marginTop: 70,
  },
});
