import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
  onLeftPress: () => void;
  onRightPress: () => void;
  rightButtonDisabled: boolean;
}

function TopBar({ children, onLeftPress, onRightPress, rightButtonDisabled }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* left button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onLeftPress} style={[styles.button, { alignItems: 'center' }]}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* center content */}
      <View style={styles.innerContainer}>{children}</View>

      {/* right button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onRightPress}
          style={[styles.button, { alignItems: 'center' }]}
          disabled={rightButtonDisabled}
        >
          <Feather
            name="chevron-right"
            size={24}
            color={rightButtonDisabled ? colors.border : colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  button: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '10%',
  },
  container: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    width: '100%',
  },
  innerContainer: {
    justifyContent: 'center',
    width: '80%',
  },
});
