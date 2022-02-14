import React from 'react';
import { View } from 'react-native';

interface Props {
  height: number;
}

function Spacer({ height }: Props) {
  return <View style={{ height }} />;
}

export default Spacer;
