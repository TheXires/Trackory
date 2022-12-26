import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseChangeEmail } from '../firebase/auth.firebase';
import { auth } from '../firebase/init.firebase';
import { i18n } from '../i18n/i18n';
import { LoadingContextType } from '../types/context';
import { ChangeEmailNavigationProp } from '../types/navigation';

function ChangeEmailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ChangeEmailNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [password, setPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  const changeEmail = async () => {
    showLoadingPopup(true, i18n.t('changeEmail'));
    try {
      await firebaseChangeEmail(password, newEmail);
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      {/* Password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setPassword(text)}
        placeholder={i18n.t('password')}
        secureTextEntry
        title={i18n.t('password')}
        value={password}
      />

      {/* Email input */}
      <CustomTextInput
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => setNewEmail(text)}
        placeholder={auth.currentUser?.email ?? ''}
        title={i18n.t('newEmail')}
        value={newEmail}
      />

      {/* Change email button  */}
      <CustomButton
        value={i18n.t('changeEmail')}
        onPress={changeEmail}
        enabled={newEmail !== '' && password !== ''}
      />
      <Text style={[styles.infoText, { color: colors.text }]}>{i18n.t('securityInfoText')}</Text>
    </ScrollView>
  );
}

export default ChangeEmailScreen;

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
