import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import registrationImage from '../../../assets/registration.png';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { LoadingContext } from '../../contexts/LoadingContext';
import { firebaseSignUp } from '../../firebase/auth.firebase';
import { LoadingContextType } from '../../interfaces/context';
import { permanentColors } from '../../theme/colors';

function RegistrationScreen() {
  const { colors } = useTheme();
  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [canRegister, setCanRegister] = useState<boolean>(false);

  useEffect(() => {
    setCanRegister(email !== '' && password !== '');
  }, [email, password]);

  const signUserUp = async () => {
    showLoadingPopup(true, I18n.t('register'));
    try {
      await firebaseSignUp(email, password);
    } catch (error: any) {
      Alert.alert(I18n.t('registrationErrorTitle'), I18n.t(error.code));
    }
    showLoadingPopup(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Image style={styles.image} source={registrationImage} />
        <View style={styles.bottomContainer}>
          <Text style={[styles.heading, { color: permanentColors.success }]}>
            {I18n.t('register')}
          </Text>
          <CustomTextInput
            autoCompleteType="email"
            autoCorrect={false}
            hideTitle
            keyboardType="email-address"
            onChangeText={(input: string) => setEmail(input)}
            placeholder={I18n.t('email')}
            value={email}
          />
          <CustomTextInput
            autoCompleteType="password"
            autoCorrect={false}
            hideTitle
            keyboardType="default"
            onChangeText={(input: string) => setPassword(input)}
            placeholder={I18n.t('password')}
            secureTextEntry
            value={password}
          />
          <CustomButton
            value={I18n.t('register')}
            enabled={canRegister}
            onPress={signUserUp}
            buttonColor={permanentColors.success}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    paddingTop: '10%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    aspectRatio: 1107 / 728,
    height: '30%',
  },
  inputContainer: {
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
  },
});
