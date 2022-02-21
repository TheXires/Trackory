import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { permanentColors } from '../theme/colors';
import { convertTextToInteger } from '../util/numberconverter';
import Dialog from './Dialog';

interface Props {
  headerText: string;
  onClose: () => void;
  onSave: (newValue: number | undefined) => void;
  placeholder: string;
  show: boolean;
  text: string;
  value: number | undefined;
}

function InputDialog({
  headerText,
  onClose,
  onSave,
  placeholder,
  show,
  text,
  value,
}: Props) {
  const [localValue, setLocalValue] = useState<number | undefined>(value);
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    setCanSave(localValue != null);
  }, [localValue]);

  return (
    <Dialog show={show} onClose={() => onClose()}>
      <View style={styles.container}>
        <Text style={styles.dialogHeader}>{headerText}</Text>
        <Text>{text}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            keyboardType="numeric"
            value={localValue?.toString()}
            onChangeText={(input) => setLocalValue(convertTextToInteger(input))}
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
            onPress={() => onSave(localValue)}
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

export default InputDialog;

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
