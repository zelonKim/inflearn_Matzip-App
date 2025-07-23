import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from '../common/HeaderButton';
import { colors } from '@/constants';
import { CompositeNavigationProp } from '@react-navigation/native';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';


type SettingHeaderLeftProps = CompositeNavigationProp<
    StackNavigationProp<SettingStackParamList>,
    DrawerNavigationProp<MainDrawerParamList>
>

const SettingHeaderLeft = ({navigation}: SettingHeaderLeftProps) => {
  return (
    <HeaderButton 
        icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
        onPress={ () => navigation.openDrawer() }
  )
}



export default SettingHeaderLeft;
