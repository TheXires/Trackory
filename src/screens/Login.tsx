import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = async () => {
    try {
      if (!email || !password) return;
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('loginError: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(input: string) => setEmail(input)}
        style={{ marginBottom: 30 }}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(input: string) => setPassword(input)}
        style={{ marginBottom: 60 }}
      />
      <Button title="login" onPress={login} />
    </View>
  );
}

export default Login;
