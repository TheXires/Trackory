import { useNavigation } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { LoadingContext } from '../../contexts/LoadingContext';
import { firebaseRequestPasswordReset } from '../../firebase/auth.firebase';
import { LoadingContextType } from '../../interfaces/context';
import { ForgotPasswordNavigationProp } from '../../navigation/types.navigation';

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    padding: 15,
  },
  infoText: {
    marginTop: 5,
    paddingHorizontal: 15,
    fontSize: 10,
    opacity: 0.6,
  },
});

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
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
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
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        placeholder={I18n.t('email')}
        title={I18n.t('email')}
        value={email}
      />
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
