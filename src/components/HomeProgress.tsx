import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Progressbar from './Progressbar';

interface Props {
  title: string;
  todaysCalories: number;
  calorieTarget: number;
}

function HomeProgress({ title, todaysCalories, calorieTarget }: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [caloriesLeft, setCaloriesLeft] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(((100 / calorieTarget) * todaysCalories) / 100);
    setCaloriesLeft(calorieTarget - todaysCalories);
  }, [calorieTarget, todaysCalories]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View>
        <Progressbar progress={percent} />
        {caloriesLeft > 0 ? (
          <Text style={[styles.subtext, { color: colors.text }]}>
            {t('component.homeProgress.caloriesLeft', { caloriesLeft })}
          </Text>
        ) : (
          <Text style={[styles.subtext, { color: colors.text }]}>
            {t('component.homeProgress.negativeCaloriesLeft', { caloriesLeft: -caloriesLeft })}
          </Text>
        )}
      </View>
    </View>
  );
}

export default HomeProgress;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '100%',
  },
  subtext: {
    fontSize: 10,
    marginLeft: 8,
    opacity: 0.6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
