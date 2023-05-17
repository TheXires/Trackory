import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBarChart from '../components/CustomBarChart';
import CustomLineChart from '../components/CustomLineChart';
import TopBar from '../components/TopBar';
import { i18n } from '../i18n/i18n';
import { RealmContext } from '../realm/RealmContext';
import { Consumption } from '../types/item';
import { getFirstDateOfWeek, getLastDateOfWeek } from '../util/time';

const { useQuery } = RealmContext;

function StatisticsScreen() {
  const { colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const consumptionHistory = useQuery<Consumption[]>('Consumption');

  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [yearlyLabels, setYearlyLabels] = useState<string[]>([]);
  const [weightYearData, setWeightYearData] = useState<number[]>([]);
  const [weeksInPast, setWeeksInPast] = useState<number>(0);
  const [calorieWeekData, setCalorieWeekData] = useState<number[]>([]);
  const [carbohydratesWeekData, setCarbohydratesWeekData] = useState<number[]>([]);
  const [fatWeekData, setFatWeekData] = useState<number[]>([]);
  const [proteinWeekData, setProteinWeekData] = useState<number[]>([]);

  useEffect(() => {
    // const res = separateDailyStatisticData(dailyStatistics, weeksInPast);
    // setCalorieWeekData(res.calories);
    // setCarbohydratesWeekData(res.carbohydrates);
    // setFatWeekData(res.fat);
    // setProteinWeekData(res.protein);
    // setWeeklyLabels(getWeeklyLabels(weeksInPast));
    // console.log(consumptionHistory);
  }, [consumptionHistory]);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* calorie bar chart */}
        <CustomBarChart
          title={`${i18n.t('calories')} (${i18n.t('calorieAbbreviation')})`}
          labels={weeklyLabels}
          data={calorieWeekData}
        />
        {/* fat bar chart */}
        <CustomBarChart
          title={`${i18n.t('fat')} (${i18n.t('gramAbbreviation')})`}
          labels={weeklyLabels}
          data={fatWeekData}
        />
        {/* carbohydrates bar chart */}
        <CustomBarChart
          title={`${i18n.t('carbohydrates')} (${i18n.t('gramAbbreviation')})`}
          labels={weeklyLabels}
          data={carbohydratesWeekData}
        />
        {/* protein bar chart */}
        <CustomBarChart
          title={`${i18n.t('protein')} (${i18n.t('gramAbbreviation')})`}
          labels={weeklyLabels}
          data={proteinWeekData}
        />
        {/* weight line chart */}
        <CustomLineChart
          title={`${i18n.t('weight')} (${i18n.t('kilogramAbbreviation')}) - ${i18n.t('monthly')}`}
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
