import { useNavigation } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { LoadingContext } from '../../contexts/LoadingContext';
import { firebaseRequestPasswordReset } from '../../firebase/auth.firebase';
import { LoadingContextType } from '../../types/context';
import { ForgotPasswordNavigationProp } from '../../types/navigation';

function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [email, setEmail] = useState<string>('');

  const requestPasswordReset = async () => {
    showLoadingPopup(true, I18n.t('sendingEmail'));
    try {
      await firebaseRequestPasswordReset(email);
      showLoadingPopup(false);
      Alert.alert(I18n.t('emailSentTitle'), I18n.t('emailSentMessage'), [
        {
          onPress: () => navigation.goBack(),
          text: 'OK',
        },
      ]);
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
      {/* Email input */}
      <CustomTextInput
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        placeholder={I18n.t('email')}
        title={I18n.t('email')}
        value={email}
      />

      {/* Request button */}
      <CustomButton
        value={I18n.t('resetPassword')}
        onPress={requestPasswordReset}
        enabled={email !== ''}
      />
      <Text style={styles.infoText}>{I18n.t('resetPasswordInfoText')}</Text>
    </ScrollView>
  );
}

export default ForgotPasswordScreen;

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
