import { useTheme } from '@react-navigation/native';
import I18n from 'i18n-js';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomBarChart from '../components/BarChart';
import CustomButton from '../components/CustomButton';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
});

function StatisticsScreen() {
  const [view, setView] = useState<'week' | 'year'>('week');

  return (
    <View>
      <CustomButton
        value={view}
        onPress={() => setView(view === 'week' ? 'year' : 'week')}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomBarChart title={I18n.t('calories')} view={view} />
        <CustomBarChart title={I18n.t('fat')} view={view} />
        <CustomBarChart title={I18n.t('carbohydrates')} view={view} />
        <CustomBarChart title={I18n.t('protein')} view={view} />
      </ScrollView>
    </View>
  );
}

export default StatisticsScreen;
