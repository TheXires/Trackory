import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface Props {
  onPress: () => void;
  left: React.ReactNode;
  right?: React.ReactNode | null;
  color?: string | undefined;
}

function SettingsItem({ onPress, left, right = null, color = undefined }: Props) {
  const { colors } = useTheme();

  return (
    <RectButton style={styles.container} onPress={() => onPress()}>
      <View>
        <Text style={{ color: color ?? colors.text }}>{left}</Text>
      </View>
      <View>
        <Text style={{ color: color ?? colors.text, opacity: 0.6 }}>{right}</Text>
      </View>
    </RectButton>
  );
}

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
});
