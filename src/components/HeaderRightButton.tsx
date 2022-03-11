import { Feather } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  targetScreen: string;
}

function HeaderRightButton({ targetScreen }: Props) {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => navigation.navigate(targetScreen)}
    >
      <Feather name="settings" size={24} color={colors.text} />
    </TouchableWithoutFeedback>
  );
}

export default HeaderRightButton;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    padding: 5,
  },
});
