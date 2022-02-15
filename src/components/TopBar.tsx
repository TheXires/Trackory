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
        <View
          style={[styles.buttonContainer, { alignItems: 'flex-start' }]}
          // onPress={onLeftPress}
        >
          <Feather name="chevron-left" size={24} color={colors.text} />
        </View>
        <View style={styles.innerContainer}>{children}</View>
        <View
          style={[styles.buttonContainer, { alignItems: 'flex-end' }]}
          // onPress={onRightPress}
        >
          <Feather name="chevron-right" size={24} color={colors.text} />
        </View>
      </View>
      <HorizontalLine />
    </>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    width: '5%',
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
