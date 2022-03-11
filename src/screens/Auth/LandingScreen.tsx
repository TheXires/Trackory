import { useNavigation } from '@react-navigation/core';
import I18n from 'i18n-js';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import backgroundImage from '../../../assets/splash.jpg';
import CustomButton from '../../components/CustomButton';
import { LandingPageNavigationProp } from '../../types/navigation';
import { permanentColors } from '../../theme/colors';

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
        {/* registration button */}
        <CustomButton
          value={I18n.t('register')}
          onPress={() => navigation.navigate('Registration')}
          buttonColor={permanentColors.success}
          style={{ marginBottom: 15 }}
        />

        {/* login button */}
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
