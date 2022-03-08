import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Props {
  data: number[];
  labels: string[];
  title: string;
}

function CustomLineChart({ data, labels, title }: Props) {
  const { colors } = useTheme();

  if (data.length === 0 || labels.length === 0) return null;

  return (
    <View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <LineChart
        data={{
          datasets: [{ data }],
          labels,
        }}
        width={Dimensions.get('window').width - 30} // from react-native
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: colors.primary,
          backgroundGradientTo: colors.primary,
          barPercentage: 0.8,
          color: () => `rgba(255, 255, 255, 1)`,
          decimalPlaces: 0,
        }}
        style={styles.chart}
        withHorizontalLabels
        withHorizontalLines
        fromZero
        withInnerLines={false}
      />
    </View>
  );
}

export default CustomLineChart;

const styles = StyleSheet.create({
  chart: {
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    paddingBottom: 20,
    paddingTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -15,
  },
});
