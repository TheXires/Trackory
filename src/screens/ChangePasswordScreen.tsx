import auth from '@react-native-firebase/auth';
import { useNavigation, useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputContainer from '../components/InputContainer';
import { LoadingContext } from '../contexts/LoadingContext';
import { firebaseChangePassword } from '../firebase/auth.firebase';
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

function ChangePasswordScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ChangeEmailNavigationProp>();

  const { showLoadingPopup } = useContext<LoadingContextType>(LoadingContext);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newRepeatedPassword, setNewRepeatedPassword] = useState<string>('');

  const changePassword = async () => {
    showLoadingPopup(true, I18n.t('changePassword'));
    try {
      await firebaseChangePassword(currentPassword, newPassword);
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
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          />
        </InputContainer>
      </View>
      <View style={styles.inputRow}>
        <Text style={[styles.heading, { color: colors.text }]}>
          {I18n.t('newPassword')}
        </Text>
        <InputContainer>
          <TextInput
            secureTextEntry
            placeholder={I18n.t('newPassword')}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
        </InputContainer>
      </View>
      <View style={styles.inputRow}>
        <Text style={[styles.heading, { color: colors.text }]}>
          {I18n.t('repeatNewPassword')}
        </Text>
        <InputContainer>
          <TextInput
            secureTextEntry
            placeholder={I18n.t('repeatNewPassword')}
            value={newRepeatedPassword}
            onChangeText={(text) => setNewRepeatedPassword(text)}
          />
        </InputContainer>
      </View>
      <CustomButton
        value={I18n.t('changePassword')}
        onPress={changePassword}
        enabled={
          currentPassword !== '' &&
          newPassword !== '' &&
          newPassword === newRepeatedPassword
        }
      />
      <Text style={[styles.infoText, { color: colors.text }]}>
        {I18n.t('securityInfoText')}
      </Text>
    </ScrollView>
  );
}

export default ChangePasswordScreen;
