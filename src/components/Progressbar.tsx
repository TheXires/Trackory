import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { permanentColors } from '../theme/colors';

interface Props {
  progress: number;
}

function Progressbar({ progress }: Props) {
  const percent = progress * 100;
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.progressbar}>
        <View
          style={[
            styles.progress,
            {
              backgroundColor: percent <= 100 ? permanentColors.success : permanentColors.error,
              width: `${Math.min(Math.round(percent), 100)}%`,
            },
          ]}
        />
      </View>
      <View style={styles.datacontainer}>
        <Text style={{ color: colors.text }}>{Math.round(percent)}%</Text>
      </View>
    </View>
  );
}

export default Progressbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  datacontainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '15%',
  },
  progress: {
    borderRadius: 8,
    height: 16,
  },
  progressbar: {
    backgroundColor: permanentColors.border,
    borderRadius: 8,
    height: 16,
    width: '85%',
  },
});
