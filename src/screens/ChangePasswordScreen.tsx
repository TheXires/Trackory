import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseChangePassword } from '../firebase/auth.firebase';
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
    showLoadingPopup(true, I18n.t('changePassword'));
    try {
      await firebaseChangePassword(currentPassword, newPassword);
      showLoadingPopup(false);
      navigation.goBack();
    } catch (error: any) {
      showLoadingPopup(false);
      Alert.alert(
        I18n.t('errorTitle'),
        I18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>

      {/* current password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setCurrentPassword(text)}
        placeholder={I18n.t('currentPassword')}
        secureTextEntry
        title={I18n.t('currentPassword')}
        value={currentPassword}
      />

      {/* new password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setNewPassword(text)}
        placeholder={I18n.t('newPassword')}
        secureTextEntry
        title={I18n.t('newPassword')}
        value={newPassword}
      />

      {/* repeat new password input */}
      <CustomTextInput
        autoCompleteType="password"
        onChangeText={(text) => setNewRepeatedPassword(text)}
        placeholder={I18n.t('repeatNewPassword')}
        secureTextEntry
        title={I18n.t('repeatNewPassword')}
        value={newRepeatedPassword}
      />
      
      {/* Change password button */}
      <CustomButton
        value={I18n.t('changePassword')}
        onPress={changePassword}
        enabled={
          currentPassword !== '' && newPassword !== '' && newPassword === newRepeatedPassword
        }
      />
      <Text style={[styles.infoText, { color: colors.text }]}>{I18n.t('securityInfoText')}</Text>
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
