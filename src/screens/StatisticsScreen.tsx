import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBarChart from '../components/BarChart';
import { firebaseGetDailyStatistics } from '../firebase/statistics.firebase';
import { DailyStatistic } from '../interfaces/statistics';

function StatisticsScreen() {
  const [view, setView] = useState<'week' | 'year'>('week');
  const [statistics, setStatistics] = useState<DailyStatistic[]>([]);

  useEffect(() => {
    // TODO darf nicht bei jedem auruf mit 0 aufgerufen werden. Vielleicht einen context erstellen
    // muss auf jeden Fall zwischen gespeichert werden.
    const getDailyStatistics = async () => {
      const response = await firebaseGetDailyStatistics(0);
      setStatistics(response);
    };
    getDailyStatistics();
  }, []);

  useEffect(() => {
    console.log('statistics changed');
    console.log(statistics);
  }, [statistics]);

  return (
    <View>
      {/* <CustomButton value={view} onPress={() => setView(view === 'week' ? 'year' : 'week')} />
      <CustomButton value="update" onPress={() => firebaseUpdateStatistics()} /> */}
      <ScrollView contentContainerStyle={styles.container}>
        <CustomBarChart title={I18n.t('calories')} view={view} data={statistics} />
        <CustomBarChart title={I18n.t('fat')} view={view} data={statistics} />
        <CustomBarChart title={I18n.t('carbohydrates')} view={view} data={statistics} />
        <CustomBarChart title={I18n.t('protein')} view={view} data={statistics} />
      </ScrollView>
    </View>
  );
}

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
});
