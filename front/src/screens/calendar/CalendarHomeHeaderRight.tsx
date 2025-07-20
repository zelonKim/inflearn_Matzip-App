import HeaderButton from '@/components/common/HeaderButton';
import React from 'react';
import {StyleSheet, View} from 'react-native';

function CalendarHomeHeaderRight(onPress: () => void) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

export default CalendarHomeHeaderRight;
