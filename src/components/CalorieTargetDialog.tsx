import I18n from 'i18n-js';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../contexts/SettingsContext';
import { SettingsContextType } from '../interfaces/context';
import { Settings } from '../interfaces/settings';
import { permanentColors } from '../theme/colors';
import { convertTextToInteger } from '../util/numberconverter';
import Dialog from './Dialog';

interface Props {
  show: boolean;
  onClose: () => void;
}

function CalorieTargetDialog({ show, onClose }: Props) {
  const { settings, setSettings } = useContext<SettingsContextType>(SettingsContext);
  const [calorieTarget, setCalorieTarget] = useState<number | undefined>(
    settings?.calorieTarget ?? undefined,
  );
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    calorieTarget == null ? setCanSave(false) : setCanSave(true);
  }, [calorieTarget]);

  const save = () => {
    if (!calorieTarget) return;
    const newSettings: Settings = { ...settings, calorieTarget };
    setSettings(newSettings);
    onClose();
  };

  return (
    <Dialog show={show} onClose={() => onClose()}>
      <View style={styles.container}>
        <Text style={styles.dialogHeader}>{I18n.t('dailyCalorieTarget')}</Text>
        <Text>{I18n.t('dailyCalorieTargetQuestion')}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="2100"
            keyboardType="numeric"
            value={calorieTarget?.toString()}
            onChangeText={(input) => setCalorieTarget(convertTextToInteger(input))}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.dialogButton}
            activeOpacity={0.8}
            onPress={() => onClose()}
          >
            <Text>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!canSave}
            style={styles.dialogButton}
            activeOpacity={0.8}
            onPress={save}
          >
            <Text
              style={{
                color: canSave ? permanentColors.primary : permanentColors.border,
              }}
            >
              {I18n.t('save')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
}

export default CalorieTargetDialog;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  container: {
    padding: 5,
  },
  dialogButton: {
    alignItems: 'flex-end',
    marginRight: 5,
    padding: 5,
  },
  dialogHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    borderBottomColor: '#00000099',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
});
