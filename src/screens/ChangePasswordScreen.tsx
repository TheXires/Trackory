import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseChangePassword } from '../firebase/auth.firebase';
import { i18n } from '../i18n/i18n';
import { LoadingContextType } from '../types/context';
import { ChangeEmailNavigationProp } from '../types/navigation';

function ChangePasswordScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ChangeEmailNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newRepeatedPassword, setNewRepeatedPassword] = useState<string>('');

  const changePassword = async () => {
    showLoadingPopup(true, i18n.t('changePassword'));
    try {
      await firebaseChangePassword(currentPassword, newPassword);
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
      {/* current password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setCurrentPassword(text)}
        placeholder={i18n.t('currentPassword')}
        secureTextEntry
        title={i18n.t('currentPassword')}
        value={currentPassword}
      />

      {/* new password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setNewPassword(text)}
        placeholder={i18n.t('newPassword')}
        secureTextEntry
        title={i18n.t('newPassword')}
        value={newPassword}
      />

      {/* repeat new password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setNewRepeatedPassword(text)}
        placeholder={i18n.t('repeatNewPassword')}
        secureTextEntry
        title={i18n.t('repeatNewPassword')}
        value={newRepeatedPassword}
      />

      {/* Change password button */}
      <CustomButton
        value={i18n.t('changePassword')}
        onPress={changePassword}
        enabled={
          currentPassword !== '' && newPassword !== '' && newPassword === newRepeatedPassword
        }
      />
      <Text style={[styles.infoText, { color: colors.text }]}>{i18n.t('securityInfoText')}</Text>
    </ScrollView>
  );
}

export default ChangePasswordScreen;

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
