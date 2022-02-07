import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import loginImage from '../../../assets/login.png';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import CustomButton from '../../components/CustomButton';
import Dialog from '../../components/Dialog';
import InputContainer from '../../components/InputContainer';
import { firebaseSignIn } from '../../firebase/auth.firebase';

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

function Login() {
  const { colors } = useTheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [canLogin, setCanLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCanLogin(email !== '' && password !== '');
  }, [email, password]);

  const signUserIn = async () => {
    setLoading(true);
    try {
      await firebaseSignIn(email, password);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: I18n.t('loginErrorTitle'),
        text2: I18n.t(error),
      });
      setLoading(false);
    }
  };

  return (
    <>
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
              value={I18n.t('login')}
              enabled={canLogin}
              onPress={signUserIn}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Loading popup */}
      <Dialog show={loading} onClose={() => null}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomActivityIndicator />
          <Text>{I18n.t('login')}</Text>
        </View>
      </Dialog>
    </>
  );
}

export default Login;
