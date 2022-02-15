import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBarChart from '../components/BarChart';
import TopBar from '../components/TopBar';
import { StatisticContext } from '../contexts/StatisticContext';
import { StatisticsContextType } from '../interfaces/context';
import { separateDailyStatisticData } from '../util/statistics';
import { getDateLabels } from '../util/time';

function StatisticsScreen() {
  const { colors } = useTheme();

  const { dailyStatistics, refreshDailyStatistics, refreshingDailyStatistics } =
    useContext<StatisticsContextType>(StatisticContext);

  const [labels, setLabels] = useState<string[]>([]);
  const [weeksInPast, setWeeksInPast] = useState<number>(0);
  const [calorieWeekData, setCalorieWeekData] = useState<number[]>([]);
  const [carbohydratesWeekData, setCarbohydratesWeekData] = useState<number[]>([]);
  const [fatWeekData, setFatWeekData] = useState<number[]>([]);
  const [proteinWeekData, setProteinWeekData] = useState<number[]>([]);

  useEffect(() => {
    const res = separateDailyStatisticData(dailyStatistics, weeksInPast);
    setCalorieWeekData(res.calories);
    setCarbohydratesWeekData(res.carbohydrates);
    setFatWeekData(res.fat);
    setProteinWeekData(res.protein);
    setLabels(getDateLabels(weeksInPast));
  }, [dailyStatistics]);

  useEffect(() => {
    refreshDailyStatistics();
  }, [weeksInPast]);

  const changeWeek = (direction: number) => {
    const newWeeksInPast = weeksInPast + direction;
    setWeeksInPast(newWeeksInPast < 0 ? 0 : newWeeksInPast);
  };

  return (
    <View style={styles.container}>
      <TopBar
        onLeftPress={() => changeWeek(1)}
        onRightPress={() => changeWeek(-1)}
        rightButtonDisabled={weeksInPast === 0}
      >
        {/* TODO hier noch etwas für finden */}
        <Text>Hier noch etwas für finden</Text>
      </TopBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingDailyStatistics}
            onRefresh={refreshDailyStatistics}
            tintColor={colors.primary}
          />
        }
      >
        <CustomBarChart title={I18n.t('calories')} labels={labels} data={calorieWeekData} />
        <CustomBarChart title={I18n.t('fat')} labels={labels} data={carbohydratesWeekData} />
        <CustomBarChart title={I18n.t('carbohydrates')} labels={labels} data={fatWeekData} />
        <CustomBarChart title={I18n.t('protein')} labels={labels} data={proteinWeekData} />
      </ScrollView>
    </View>
  );
}

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
