import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Dialog({ show, onClose, children }: Props) {
  if (!show) return null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.background} onPress={() => onClose()} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export default Dialog;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#00000088',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    width: 300,
  },
});
