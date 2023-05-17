import { useNavigation, useTheme } from '@react-navigation/native';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ConsumedItemListElement from '../components/ConsumedItemListElement';
import FloatingActionButton from '../components/FloatingActionButton';
import HomeProgress from '../components/HomeProgress';
import Spacer from '../components/Spacer';
import TopBar from '../components/TopBar';
import { DAY_IN_MS } from '../constants';
import { i18n } from '../i18n/i18n';
import { RealmContext } from '../realm/RealmContext';
import { ConsumedItem, Consumption } from '../types/item';
import { ConsumedNavigationProp } from '../types/navigation';
import { Settings } from '../types/settings';

const { useRealm, useQuery } = RealmContext;

function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<ConsumedNavigationProp>();
  const realm = useRealm();

  // TODO add real settings
  const [settings, setSettings] = useState<Settings>({
    calorieTarget: 2000,
    weight: 84,
  });
  const [todaysCalories, setTodaysCalories] = useState<number>(0);
  const [daysInPast, setDaysInPast] = useState<number>(0);

  const consumption = useQuery<Consumption>('Consumption').filtered(
    `date = "${dateFormat(Date.now() - daysInPast * DAY_IN_MS, 'yyyy-mm-dd')}"`,
  )[0];

  useEffect(() => {
    if (!consumption) return setTodaysCalories(0);
    const caloriesSum = consumption.items.reduce(
      (sum, item) => sum + item.calories * item.quantity,
      0,
    );
    setTodaysCalories(caloriesSum);
  }, [consumption]);

  const changeQuantity = async (item: ConsumedItem, quantity: number) => {
    if (!consumption) return;
    const consumedItemIndex = consumption.items.findIndex((i) => i._id.equals(item._id));
    if (consumedItemIndex === -1) return;
    realm.write(() => {
      if (quantity === 0) {
        const tmp = [...consumption.items];
        tmp.splice(consumedItemIndex, 1);
        consumption.items = tmp;
      } else {
        consumption.items[consumedItemIndex].quantity = quantity;
      }
    });
  };

  const changeDay = (direction: number) => {
    const newDaysInPast = daysInPast + direction;
    setDaysInPast(newDaysInPast < 0 ? 0 : newDaysInPast);
  };

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
            daysInPast === 0
              ? i18n.t('today')
              : dateFormat(Date.now() - daysInPast * DAY_IN_MS, 'dd.mm')
          }
          todaysCalories={todaysCalories}
        />
      </TopBar>
      {consumption && (
        <FlatList
          data={consumption.items}
          keyExtractor={(item: ConsumedItem) => item._id.toHexString()}
          renderItem={({ item }) => (
            <ConsumedItemListElement
              consumedItem={item}
              onSave={(quantity: number) => changeQuantity(item, quantity)}
            />
          )}
          ListHeaderComponent={() => Spacer({ height: 15 })}
          ListFooterComponent={() => Spacer({ height: 100 })}
          ItemSeparatorComponent={() => Spacer({ height: 15 })}
          showsVerticalScrollIndicator={false}
        />
      )}
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
