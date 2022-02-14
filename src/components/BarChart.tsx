import { useTheme } from '@react-navigation/native';
import dateformat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { DailyStatistic } from '../interfaces/statistics';
import { permanentColors } from '../theme/colors';

interface Props {
  data: DailyStatistic[];
  title: string;
  view: 'week' | 'year';
}

const dayInMs = 24 * 60 * 60 * 1000;

const now = Date.now();

function CustomBarChart({ data, title, view }: Props) {
  const { colors } = useTheme();

  const [labels, setLabels] = useState<string[]>([]);
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(7);

  useEffect(() => {
    switch (view) {
      case 'week':
        const newWeekLabels: string[] = [];
        let i, j;
        for (i = 0, j = 6; i < 7; i++, j--) {
          newWeekLabels[i] = dateformat(now - j * dayInMs, 'dd.mm');
        }
        setLabels(newWeekLabels);
        setA(0.9);
        setB(7);
        break;
      case 'year':
        const newYearLabels: string[] = [];
        let k, l;
        for (k = 0, l = 11; k < 12; k++, l--) {
          // TODO rechnet nicht richtig. Muss überarbeitet werden
          newYearLabels[k] = dateformat(now - l * dayInMs * 31, 'mm');
        }
        setLabels(newYearLabels);
        setA(0.5);
        setB(12);
        break;
      default:
        break;
    }
  }, [view]);

  useEffect(() => {
    // TODO hier weiter machen, in dem erst die labels erstellt werden und dann die Daten an den
    // ensprechenden Stellen hinzugefügt werden. buildLabelForWeeksInPast bereits vorläufig unten erstellt
    if (data.length <= 0) return;
    const tempLabel: string[] = [];
    data.forEach((element) => {
      tempLabel.push(dateformat(element.date, 'dd.mm'));
    });
    console.log('labels', tempLabel);
  }, [data]);

  return (
    <View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <BarChart
        data={{
          datasets: [{ data: new Array(b).fill(Math.floor(Math.random() * 2500)) }],
          labels,
        }}
        width={Dimensions.get('window').width - 30} // from react-native
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: permanentColors.primary,
          backgroundGradientTo: permanentColors.primary,
          barPercentage: a,
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

const buildLabelForWeeksInPast = (weeksInPast: number) => {
  // TODO hier weiter machen
};
