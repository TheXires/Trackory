import { useNavigation } from '@react-navigation/core';
import I18n from 'i18n-js';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import backgroundImage from '../../../assets/splash.jpg';
import CustomButton from '../../components/CustomButton';
import { LandingPageNavigationProp } from '../../navigation/types.navigation';
import { permanentColors } from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  upperContainer: {
    marginTop: 70,
  },
  lowerContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headingRow: {
    display: 'flex',
    flexDirection: 'row',
  },
});

function LandingScreen() {
  const navigation = useNavigation<LandingPageNavigationProp>();

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={[styles.headingRow, { marginLeft: '10%' }]}>
            <Text style={styles.heading}>{I18n.t('count')} </Text>
            <Text style={[styles.heading, { color: permanentColors.primary }]}>
              {I18n.t('calories')}
            </Text>
          </View>
          <View style={[styles.headingRow, { marginLeft: 'auto', marginRight: '10%' }]}>
            <Text style={styles.heading}>{I18n.t('life')} </Text>
            <Text style={[styles.heading, { color: permanentColors.success }]}>
              {I18n.t('healthier')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <CustomButton
          value={I18n.t('register')}
          onPress={() => navigation.navigate('Registration')}
          buttonColor={permanentColors.success}
          style={{ marginBottom: 15 }}
        />
        <CustomButton
          value={I18n.t('login')}
          onPress={() => navigation.navigate('Login')}
          style={{ marginBottom: 15 }}
        />
      </View>
    </ImageBackground>
  );
}

export default LandingScreen;
