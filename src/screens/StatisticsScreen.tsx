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
import { separateDailyStatisticData } from '../util/statistics';
import { getDateLabels, getFirstDateOfWeek, getLastDateOfWeek } from '../util/time';

function StatisticsScreen() {
  const { colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

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
  }, [dailyStatistics, weeksInPast]);

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
        <CustomBarChart
          title={`${I18n.t('calories')} (${I18n.t('calorieAbbreviation')})`}
          labels={labels}
          data={calorieWeekData}
        />
        <CustomBarChart
          title={`${I18n.t('fat')} (${I18n.t('gramAbbreviation')})`}
          labels={labels}
          data={fatWeekData}
        />
        <CustomBarChart
          title={`${I18n.t('carbohydrates')} (${I18n.t('gramAbbreviation')})`}
          labels={labels}
          data={carbohydratesWeekData}
        />
        <CustomBarChart
          title={`${I18n.t('protein')} (${I18n.t('gramAbbreviation')})`}
          labels={labels}
          data={proteinWeekData}
        />
        <CustomLineChart title={`${I18n.t('weight')}`} labels={labels} data={calorieWeekData} />
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
