import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { permanentColors } from '../theme/colors';

interface Props {
  data: number[];
  labels: string[];
  title: string;
}

function CustomBarChart({ data, labels, title }: Props) {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <BarChart
        data={{
          datasets: [{ data }],
          labels,
        }}
        width={Dimensions.get('window').width - 30} // from react-native
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: permanentColors.primary,
          backgroundGradientTo: permanentColors.primary,
          barPercentage: 0.8,
          color: () => `rgba(255, 255, 255, 1)`,
          decimalPlaces: 0,
        }}
        style={styles.chart}
        showValuesOnTopOfBars
        withHorizontalLabels={false}
        fromZero
        withInnerLines={false}
      />
    </View>
  );
}

export default CustomBarChart;

const styles = StyleSheet.create({
  chart: {
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -15,
  },
});
