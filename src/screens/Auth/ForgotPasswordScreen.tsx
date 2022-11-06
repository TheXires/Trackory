import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { LoadingContext } from '../../contexts/LoadingContext';
import { firebaseRequestPasswordReset } from '../../firebase/auth.firebase';
import { LoadingContextType } from '../../types/context';
import { ForgotPasswordNavigationProp } from '../../types/navigation';
import { i18n } from '../../util/translation';

function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [email, setEmail] = useState<string>('');

  const requestPasswordReset = async () => {
    showLoadingPopup(true, i18n.t('sendingEmail'));
    try {
      await firebaseRequestPasswordReset(email);
      showLoadingPopup(false);
      Alert.alert(i18n.t('emailSentTitle'), i18n.t('emailSentMessage'), [
        {
          onPress: () => navigation.goBack(),
          text: 'OK',
        },
      ]);
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
      {/* Email input */}
      <CustomTextInput
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        placeholder={i18n.t('email')}
        title={i18n.t('email')}
        value={email}
      />

      {/* Request button */}
      <CustomButton
        value={i18n.t('resetPassword')}
        onPress={requestPasswordReset}
        enabled={email !== ''}
      />
      <Text style={styles.infoText}>{i18n.t('resetPasswordInfoText')}</Text>
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
