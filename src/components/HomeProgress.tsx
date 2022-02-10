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
    height: 80,
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 5,
    width: '100%',
  },
  innerProgressbar: {
    backgroundColor: 'green',
    borderRadius: 8,
    height: 16,
    width: '80%',
  },
  outerProgressbar: {
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    height: 16,
    width: '50%',
  },
  subtext: {
    fontSize: 10,
    marginLeft: 8,
    opacity: 0.6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
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
