import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DAILY_STATISTICS, WEIGHT_HISTORY } from '../constants';
import {
  firebaseGetDailyStatistics,
  firebaseGetWeightHistory,
  firebaseUpdateStatistics
} from '../firebase/statistics.firebase';
import { i18n } from '../i18n/i18n';
import { StatisticsContextType } from '../types/context';
import { DailyStatistic, WeightHistory } from '../types/statistics';

export const StatisticContext = createContext({} as StatisticsContextType);

export function StatisticProvider(props: any) {
  const [weightHistory, setWeightHistory] = useState<WeightHistory[]>([]);
  const [dailyStatistics, setDailyStatistics] = useState<DailyStatistic[]>([]);
  const [refreshingDailyStatistics, setRefreshingDailyStatistics] = useState<boolean>(false);

  const getWeightHistory = async () => {
    try {
      const localWeightHistory = await AsyncStorage.getItem(WEIGHT_HISTORY);
      if (localWeightHistory) setDailyStatistics(JSON.parse(localWeightHistory));
      const history = await firebaseGetWeightHistory();
      setWeightHistory(history ?? []);
      await AsyncStorage.setItem(DAILY_STATISTICS, JSON.stringify(history ?? []));
    } catch (error: any) {
      console.error('getWeightHistory error:', error);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  const getDailyStatistics = async () => {
    try {
      const localDailyStatistics = await AsyncStorage.getItem(DAILY_STATISTICS);
      if (localDailyStatistics) setDailyStatistics(JSON.parse(localDailyStatistics));
      const statistics = await firebaseGetDailyStatistics();
      setDailyStatistics(statistics ?? []);
      await AsyncStorage.setItem(DAILY_STATISTICS, JSON.stringify(statistics ?? []));
    } catch (error: any) {
      console.error('getDailyStatistics error:', error);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  const refreshDailyStatistics = async () => {
    setRefreshingDailyStatistics(true);
    try {
      await firebaseUpdateStatistics();
      await getDailyStatistics();
    } catch (error: any) {
      setRefreshingDailyStatistics(false);
      console.error(`refreshDailyStatistics ${error}`);
      Alert.alert(
        i18n.t('errorTitle'),
        i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
      );
    }
  };

  useEffect(() => {
    getWeightHistory();
    getDailyStatistics();
  }, []);

  useEffect(() => {
    setRefreshingDailyStatistics(false);
  }, [dailyStatistics]);

  return (
    <StatisticContext.Provider
      value={{ dailyStatistics, refreshDailyStatistics, refreshingDailyStatistics, weightHistory }}
    >
      {props.children}
    </StatisticContext.Provider>
  );
}
