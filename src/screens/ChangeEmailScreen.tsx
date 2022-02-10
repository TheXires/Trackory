import auth from '@react-native-firebase/auth';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseChangeEmail } from '../firebase/auth.firebase';
import { LoadingContextType } from '../interfaces/context';
import { ChangeEmailNavigationProp } from '../navigation/types.navigation';

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    padding: 15,
  },
  infoText: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.6,
    paddingHorizontal: 15,
  },
});

function ChangeEmailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ChangeEmailNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [password, setPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  const changeEmail = async () => {
    showLoadingPopup(true, I18n.t('changeEmail'));
    try {
      await firebaseChangeEmail(password, newEmail);
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(I18n.t('errorTitle'), I18n.t(error), [
        {
          text: 'OK',
        },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setPassword(text)}
        placeholder={I18n.t('password')}
        secureTextEntry
        title={I18n.t('password')}
        value={password}
      />
      <CustomTextInput
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => setNewEmail(text)}
        placeholder={auth().currentUser?.email ?? ''}
        title={I18n.t('newEmail')}
        value={newEmail}
      />
      <CustomButton
        value={I18n.t('changeEmail')}
        onPress={changeEmail}
        enabled={newEmail !== '' && password !== ''}
      />
      <Text style={[styles.infoText, { color: colors.text }]}>
        {I18n.t('securityInfoText')}
      </Text>
    </ScrollView>
  );
}

export default ChangeEmailScreen;
