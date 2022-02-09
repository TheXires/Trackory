import auth from '@react-native-firebase/auth';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputContainer from '../../components/InputContainer';
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
  inputRow: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    marginTop: 5,
    paddingHorizontal: 15,
    fontSize: 10,
    opacity: 0.6,
  },
});

function ForgotPasswordScreen() {
  const { colors } = useTheme();
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
      <View style={styles.inputRow}>
        <Text style={[styles.heading, { color: colors.text }]}>{I18n.t('email')}</Text>
        <InputContainer>
          <TextInput
            placeholder={I18n.t('email')}
            autoCompleteType="email"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </InputContainer>
      </View>
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
