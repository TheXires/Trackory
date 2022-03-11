import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import dateFormat from 'dateformat';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBarChart from '../components/CustomBarChart';
import CustomLineChart from '../components/CustomLineChart';
import TopBar from '../components/TopBar';
import { StatisticContext } from '../contexts/StatisticContext';
import { StatisticsContextType } from '../types/context';
import { separateDailyStatisticData, separateWeightStatisticData } from '../util/statistics';
import {
  getWeeklyLabels,
  getFirstDateOfWeek,
  getLastDateOfWeek,
  getMonthlyLabels,
} from '../util/time';

function StatisticsScreen() {
  const { colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const { dailyStatistics, refreshDailyStatistics, refreshingDailyStatistics, weightHistory } =
    useContext<StatisticsContextType>(StatisticContext);

  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [yearlyLabels, setYearlyLabels] = useState<string[]>([]);
  const [weightYearData, setWeightYearData] = useState<number[]>([]);
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
    setWeeklyLabels(getWeeklyLabels(weeksInPast));
  }, [dailyStatistics, weeksInPast]);

  useEffect(() => {
    const res = separateWeightStatisticData(weightHistory);
    setWeightYearData(res);
    setYearlyLabels(getMonthlyLabels());
  }, [weightHistory]);

  const changeWeek = (direction: number) => {
    const newWeeksInPast = weeksInPast + direction;
    setWeeksInPast(newWeeksInPast < 0 ? 0 : newWeeksInPast);
  };

  return (
    <View
      style={[
        styles.container,
        { marginBottom: bottomTabBarHeight + (Platform.OS === 'ios' ? 0 : 25) },
      ]}
    >
      {/* top bar with week changer */}
      <TopBar
        onLeftPress={() => changeWeek(1)}
        onRightPress={() => changeWeek(-1)}
        rightButtonDisabled={weeksInPast === 0}
      >
        <View style={styles.topBarContainer}>
          <Text style={[styles.topBarText, { color: colors.text }]}>
            {dateFormat(getFirstDateOfWeek(weeksInPast), 'dd.mm.yyyy - ')}
            {dateFormat(getLastDateOfWeek(weeksInPast), 'dd.mm.yyyy')}
          </Text>
        </View>
      </TopBar>
      {/* chart container */}
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
        {/* calorie bar chart */}
        <CustomBarChart
          title={`${I18n.t('calories')} (${I18n.t('calorieAbbreviation')})`}
          labels={weeklyLabels}
          data={calorieWeekData}
        />
        {/* fat bar chart */}
        <CustomBarChart
          title={`${I18n.t('fat')} (${I18n.t('gramAbbreviation')})`}
          labels={weeklyLabels}
          data={fatWeekData}
        />
        {/* carbohydrates bar chart */}
        <CustomBarChart
          title={`${I18n.t('carbohydrates')} (${I18n.t('gramAbbreviation')})`}
          labels={weeklyLabels}
          data={carbohydratesWeekData}
        />
        {/* protein bar chart */}
        <CustomBarChart
          title={`${I18n.t('protein')} (${I18n.t('gramAbbreviation')})`}
          labels={weeklyLabels}
          data={proteinWeekData}
        />
        {/* weight line chart */}
        <CustomLineChart
          title={`${I18n.t('weight')} (${I18n.t('kilogramAbbreviation')}) - ${I18n.t('monthly')}`}
          labels={yearlyLabels}
          data={weightYearData}
        />
      </ScrollView>
    </View>
  );
}

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  topBarContainer: {
    alignItems: 'center',
    width: '100%',
  },
  topBarText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
