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
import { TextInput } from 'react-native-gesture-handler';
import registrationImage from '../../../assets/registration.png';
import CustomButton from '../../components/CustomButton';
import InputContainer from '../../components/InputContainer';
import { LoadingContext } from '../../contexts/LoadingContext';
import { firebaseSignUp } from '../../firebase/auth.firebase';
import { LoadingContextType } from '../../interfaces/context';
import { permanentColors } from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    height: '30%',
    aspectRatio: 1107 / 728,
  },
  bottomContainer: {
    paddingTop: '10%',
    width: '100%',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
  },
});

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
    showLoadingPopup(true, I18n.t('registration'));
    try {
      await firebaseSignUp(email, password);
    } catch (error: any) {
      Alert.alert(I18n.t('registrationErrorTitle'), I18n.t(error), [
        {
          text: 'OK',
        },
      ]);
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
          <View style={styles.inputContainer}>
            <InputContainer>
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                placeholderTextColor={colors.border}
                placeholder={I18n.t('email')}
                autoCompleteType="email"
                autoCorrect={false}
                value={email}
                onChangeText={(input: string) => setEmail(input)}
              />
            </InputContainer>
            <InputContainer>
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                placeholderTextColor={colors.border}
                placeholder={I18n.t('password')}
                secureTextEntry
                autoCompleteType="password"
                autoCorrect={false}
                value={password}
                onChangeText={(input: string) => setPassword(input)}
              />
            </InputContainer>
          </View>
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
