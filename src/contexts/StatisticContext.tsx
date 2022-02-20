import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { DAILY_STATISTICS } from '../constants';
import {
  firebaseGetDailyStatistics,
  firebaseUpdateStatistics,
} from '../firebase/statistics.firebase';
import { StatisticsContextType } from '../interfaces/context';
import { DailyStatistic } from '../interfaces/statistics';

export const StatisticContext = createContext({} as StatisticsContextType);

export function StatisticProvider(props: any) {
  const [dailyStatistics, setDailyStatistics] = useState<DailyStatistic[]>([]);
  const [refreshingDailyStatistics, setRefreshingDailyStatistics] = useState<boolean>(false);

  const getDailyStatistics = async () => {
    try {
      const localDailyStatistics = await AsyncStorage.getItem(DAILY_STATISTICS);
      if (localDailyStatistics) setDailyStatistics(JSON.parse(localDailyStatistics));
      const statistics = await firebaseGetDailyStatistics();
      setDailyStatistics(statistics ?? []);
      await AsyncStorage.setItem(DAILY_STATISTICS, JSON.stringify(statistics ?? []));
    } catch (error) {
      console.error(`getDailyStatistics ${error}`);
    }
  };

  const refreshDailyStatistics = async () => {
    setRefreshingDailyStatistics(true);
    try {
      await firebaseUpdateStatistics();
      await getDailyStatistics();
    } catch (error) {
      console.error(`refreshDailyStatistics ${error}`);
    }
  };

  useEffect(() => {
    getDailyStatistics();
  }, []);

  useEffect(() => {
    setRefreshingDailyStatistics(false);
  }, [dailyStatistics]);

  return (
    <StatisticContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ dailyStatistics, refreshDailyStatistics, refreshingDailyStatistics }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </StatisticContext.Provider>
  );
}
