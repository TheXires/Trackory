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
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import registrationImage from '../../../assets/registration.png';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import CustomButton from '../../components/CustomButton';
import Dialog from '../../components/Dialog';
import InputContainer from '../../components/InputContainer';
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

function Registration() {
  const { colors } = useTheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [canRegister, setCanRegister] = useState<boolean>(false);

  useEffect(() => {
    setCanRegister(email !== '' && password !== '');
  }, [email, password]);

  const signUserUp = async () => {
    try {
      // TODO funktion in firebase ordner aufrufen
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Fehler einfügen',
        text2: 'fehlerbeschreibung einfügen',
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
              enabled={canRegister && !loading}
              onPress={signUserUp}
              buttonColor={permanentColors.success}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Loading popup */}
      <Dialog show={loading} onClose={() => null}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomActivityIndicator />
          <Text>Registrieren</Text>
        </View>
      </Dialog>
    </>
  );
}

export default Registration;
