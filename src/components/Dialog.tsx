import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  background: {
    backgroundColor: '#00000088',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  content: {
    width: 300,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});

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
