import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import HorizontalLine from './HorizontalLine';

interface Props {
  children: React.ReactNode;
  onLeftPress: () => void;
  onRightPress: () => void;
}

function TopBar({ children, onLeftPress, onRightPress }: Props) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.buttonContainer, { alignItems: 'flex-start' }]}>
          <TouchableOpacity onPress={onLeftPress} style={styles.button}>
            <Feather name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>{children}</View>
        <View style={[styles.buttonContainer, { alignItems: 'flex-end' }]}>
          <TouchableOpacity onPress={onRightPress} style={styles.button}>
            <Feather name="chevron-right" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalLine />
    </>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '7%',
  },
  container: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    paddingVertical: 5,
    width: '100%',
  },
  innerContainer: {
    justifyContent: 'center',
    width: '85%',
  },
});
