import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  hight: number;
}

function Spacer({ hight }: Props) {
  return <View style={{ height: hight }} />;
}

export default Spacer;
