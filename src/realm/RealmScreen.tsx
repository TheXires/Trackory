import React from 'react';
import { StyleSheet, View } from 'react-native';
import InnerComponent from './InnerComponent';
import { RealmContext } from './RealmContext';

function RealmScreen() {
  const { RealmProvider } = RealmContext;

  return (
    <View>
      <RealmProvider>
        <InnerComponent />
      </RealmProvider>
    </View>
  );
}

export default RealmScreen;

const styles = StyleSheet.create({});
