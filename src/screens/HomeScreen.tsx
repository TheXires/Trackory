import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import HomeProgress from '../components/HomeProgress';
import OverviewItem from '../components/OverviewItem';
import Spacer from '../components/Spacer';
import { HistoryContext } from '../contexts/HistoryContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { ConsumedItem } from '../interfaces/item';
import { ConsumedNavigationProp } from '../navigation/types.navigation';

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

function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ConsumedNavigationProp>();

  const { settings } = useContext(SettingsContext);
  const { consumedItems, refreshConsumedItems, refreshingConsumedItems, consumeItem } =
    useContext(HistoryContext);

  const [todaysCalories, setTodaysCalories] = useState<number>(0);

  useEffect(() => {
    const caloriesSum = consumedItems.reduce(
      (sum, item) => sum + item.calories * item.quantity,
      0,
    );
    setTodaysCalories(caloriesSum);
  }, [consumedItems]);

  const changeQuantity = async (
    daysInThePast: number,
    item: ConsumedItem,
    quantity: number,
  ) => {
    const changeQuantityBy = quantity - item.quantity;
    consumeItem(daysInThePast, item, changeQuantityBy);
    return null;
  };

  const renderedItem = (item: ConsumedItem) => (
    <OverviewItem
      consumedItem={item}
      onSave={(quantity: number) => changeQuantity(0, item, quantity)}
    />
  );

  const renderSpacer = () => <Spacer hight={15} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HomeProgress
        calorieTarget={settings?.calorieTarget ?? 0}
        todaysCalories={todaysCalories}
      />
      <FlatList
        data={consumedItems}
        keyExtractor={(item: ConsumedItem) => item.id}
        renderItem={({ item }) => renderedItem(item)}
        ListHeaderComponent={<Spacer hight={15} />}
        ListFooterComponent={<Spacer hight={100} />}
        ItemSeparatorComponent={renderSpacer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshingConsumedItems}
            onRefresh={() => refreshConsumedItems(0)}
            tintColor={colors.primary}
          />
        }
      />
      <FloatingActionButton icon="plus" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
}

export default HomeScreen;
