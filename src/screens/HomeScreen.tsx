import { useNavigation, useTheme } from '@react-navigation/native';
import dateformat from 'dateformat';
import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import HomeProgress from '../components/HomeProgress';
import OverviewItem from '../components/OverviewItem';
import Spacer from '../components/Spacer';
import TopBar from '../components/TopBar';
import { HistoryContext } from '../contexts/HistoryContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { HistoryContextType } from '../types/context';
import { ConsumedItem } from '../types/item';
import { ConsumedNavigationProp } from '../types/navigation';
import { getStartOfDay } from '../util/time';

function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ConsumedNavigationProp>();

  const { settings } = useContext(SettingsContext);
  const { consumedItems, refreshConsumedItems, refreshingConsumedItems, consumeItem } =
    useContext<HistoryContextType>(HistoryContext);

  const [todaysCalories, setTodaysCalories] = useState<number>(0);
  const [daysInPast, setDaysInPast] = useState<number>(0);

  useEffect(() => {
    const caloriesSum = consumedItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);
    setTodaysCalories(caloriesSum);
  }, [consumedItems]);

  useEffect(() => {
    refreshConsumedItems(daysInPast, true);
  }, [daysInPast]);

  const changeQuantity = async (daysInThePast: number, item: ConsumedItem, quantity: number) => {
    const changeQuantityBy = quantity - item.quantity;
    consumeItem(daysInThePast, item, changeQuantityBy);
    return null;
  };

  const renderedItem = (item: ConsumedItem) => (
    <OverviewItem
      consumedItem={item}
      onSave={(quantity: number) => changeQuantity(daysInPast, item, quantity)}
    />
  );

  const changeDay = (direction: number) => {
    const newDaysInPast = daysInPast + direction;
    setDaysInPast(newDaysInPast < 0 ? 0 : newDaysInPast);
  };

  const renderSpacer = () => <Spacer height={15} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TopBar
        onLeftPress={() => changeDay(1)}
        onRightPress={() => changeDay(-1)}
        rightButtonDisabled={daysInPast === 0}
      >
        <HomeProgress
          calorieTarget={settings?.calorieTarget ?? 0}
          title={
            daysInPast === 0 ? I18n.t('today') : dateformat(getStartOfDay(daysInPast), 'dd.mm')
          }
          todaysCalories={todaysCalories}
        />
      </TopBar>
      <FlatList
        data={consumedItems}
        keyExtractor={(item: ConsumedItem) => item.id}
        renderItem={({ item }) => renderedItem(item)}
        ListHeaderComponent={<Spacer height={15} />}
        ListFooterComponent={<Spacer height={100} />}
        ItemSeparatorComponent={renderSpacer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingConsumedItems}
            onRefresh={() => refreshConsumedItems(daysInPast)}
            tintColor={colors.primary}
          />
        }
      />
      <FloatingActionButton
        icon="plus"
        onPress={() => navigation.navigate('AddItem', { daysInPast })}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textDark: {
    color: 'red',
  },
});
