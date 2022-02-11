import { useNavigation, useTheme } from '@react-navigation/native';
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
import loginImage from '../../../assets/login.png';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { LoadingContext } from '../../contexts/LoadingContext';
import { firebaseSignIn } from '../../firebase/auth.firebase';
import { LoadingContextType } from '../../interfaces/context';
import { LoginNavigationProp } from '../../navigation/types.navigation';

function LoginScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<LoginNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [canLogin, setCanLogin] = useState<boolean>(false);

  useEffect(() => {
    setCanLogin(email !== '' && password !== '');
  }, [email, password]);

  const signUserIn = async () => {
    showLoadingPopup(true, I18n.t('login'));
    try {
      await firebaseSignIn(email, password);
    } catch (error: any) {
      Alert.alert(I18n.t('loginErrorTitle'), I18n.t(error), [
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
        <Image style={styles.image} source={loginImage} />
        <View style={styles.bottomContainer}>
          <Text style={[styles.heading, { color: colors.primary }]}>
            {I18n.t('login')}
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
          <CustomButton value={I18n.t('login')} enabled={canLogin} onPress={signUserIn} />
          <CustomButton
            value={I18n.t('forgotPassword')}
            onPress={() => navigation.navigate('ForgotPassword')}
            buttonColor={colors.background}
            textColor={colors.text}
            style={{ marginTop: 15, opacity: 0.6 }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

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
  textInput: {
    fontSize: 16,
  },
});
