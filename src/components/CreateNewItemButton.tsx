import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { i18n } from '../i18n/i18n';

interface Props {
  onPress: () => void;
}

function CreateNewItemButton({ onPress }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={onPress} style={{ paddingRight: 15, width: '50%' }}> */}
      <Pressable onPress={onPress} style={{ width: '100%' }}>
        <View style={[styles.button, { borderColor: colors.primary }]}>
          <View style={styles.innerBox}>
            <Feather name="plus" style={[styles.icon, { color: colors.primary }]} />
            <Text style={[styles.text, { color: colors.primary }]}>{i18n.t('create')}</Text>
          </View>
        </View>
      </Pressable>
      {/* TODO hier Möglichkeit einbauen einmal etwas hinzuzufügen, ohne es richtig erstellen zu müssen */}
      {/* <Pressable onPress={() => alert('toImplement')} style={{ paddingLeft: 15, width: '50%' }}>
        <View style={[styles.button, { borderColor: colors.primary }]}>
          <View style={styles.innerBox}>
            <Feather name="plus" style={[styles.icon, { color: colors.primary }]} />
            <Text style={[styles.text, { color: colors.primary }]}>{i18n.t('addOnce')}</Text>
          </View>
        </View>
      </Pressable> */}
    </View>
  );
}

export default CreateNewItemButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 6,
    height: 150,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  icon: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  innerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
