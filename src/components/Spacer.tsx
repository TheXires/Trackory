import React from 'react';
import { View } from 'react-native';

interface Props {
  hight: number;
}

function Spacer({ hight }: Props) {
  return <View style={{ height: hight }} />;
}

export default Spacer;
