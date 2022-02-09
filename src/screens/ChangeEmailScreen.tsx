import auth from '@react-native-firebase/auth';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputContainer from '../components/InputContainer';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseChangeEmail } from '../firebase/auth.firebase';
import { LoadingContextType } from '../interfaces/context';
import { ChangeEmailNavigationProp } from '../navigation/types.navigation';

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

function ChangeEmailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ChangeEmailNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [password, setPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  const changeEmail = async () => {
    showLoadingPopup(true, I18n.t('changeEmail'));
    try {
      await firebaseChangeEmail(password, newEmail);
      showLoadingPopup(false);
      navigation.goBack();
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
        <Text style={[styles.heading, { color: colors.text }]}>
          {I18n.t('currentPassword')}
        </Text>
        <InputContainer>
          <TextInput
            secureTextEntry
            placeholder={I18n.t('currentPassword')}
            autoCompleteType="password"
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </InputContainer>
      </View>
      <View style={styles.inputRow}>
        <Text style={[styles.heading, { color: colors.text }]}>{I18n.t('newEmail')}</Text>
        <InputContainer>
          <TextInput
            placeholder={auth().currentUser?.email ?? ''}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCorrect={false}
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
          />
        </InputContainer>
      </View>
      <CustomButton
        value={I18n.t('changeEmail')}
        onPress={changeEmail}
        enabled={newEmail !== '' && password !== ''}
      />
      <Text style={[styles.infoText, { color: colors.text }]}>
        {I18n.t('securityInfoText')}
      </Text>
    </ScrollView>
  );
}

export default ChangeEmailScreen;
