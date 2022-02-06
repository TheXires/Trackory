import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HorizontalLine from './HorizontalLine';
import Progressbar from './Progressbar';

interface Props {
  todaysCalories: number;
  calorieTarget: number;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  outerProgressbar: {
    width: '50%',
    height: 16,
    borderRadius: 8,
    backgroundColor: 'lightgreen',
  },
  innerProgressbar: {
    width: '80%',
    height: 16,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtext: {
    marginLeft: 8,
    fontSize: 10,
    opacity: 0.6,
  },
});

function HomeProgress({ todaysCalories, calorieTarget }: Props) {
  const { colors } = useTheme();

  const [caloriesLeft, setCaloriesLeft] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(((100 / calorieTarget) * todaysCalories) / 100);
    setCaloriesLeft(calorieTarget - todaysCalories);
  }, [calorieTarget, todaysCalories]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{I18n.t('today')}</Text>
      <View>
        <Progressbar progress={percent} />
        {caloriesLeft > 0 ? (
          <Text style={[styles.subtext, { color: colors.text }]}>
            {I18n.t('caloriesLeft', { caloriesLeft })}
          </Text>
        ) : (
          <Text style={[styles.subtext, { color: colors.text }]}>
            {I18n.t('negativeCaloriesLeft', { caloriesLeft: -caloriesLeft })}
          </Text>
        )}
      </View>
      <HorizontalLine />
    </View>
  );
}

export default HomeProgress;
