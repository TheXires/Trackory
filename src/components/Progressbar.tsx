import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { permanentColors } from '../theme/colors';

interface Props {
  progress: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  progressbar: {
    width: '80%',
    height: 16,
    borderRadius: 8,
    backgroundColor: permanentColors.border,
  },
  progress: {
    height: 16,
    borderRadius: 8,
  },
  datacontainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
              width: `${Math.min(Math.round(percent), 100)}%`,
              backgroundColor:
                percent <= 100 ? permanentColors.success : permanentColors.error,
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
