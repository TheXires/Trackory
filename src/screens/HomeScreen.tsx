import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeScreen() {
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('logoutError: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Logged in</Text>
      <Button title="LogOut" onPress={logout} />
    </View>
  );
}

export default HomeScreen;
