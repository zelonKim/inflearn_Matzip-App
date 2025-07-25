import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {colors, feedNavigations, settingNavigatons} from '@/constants';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {LatLng} from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import ImageZoomScreen from '@/components/feed/ImageZoomScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import DeleteAccountScreen from '@/components/setting/DeleteAccountScreen';
import EditCategoryScreen from '@/components/setting/EditCategoryScreen';

export type SettingStackParamList = {
  [settingNavigatons.SETTING_HOME]: undefined;
  [settingNavigatons.EDIT_PROFILE]: undefined;
  [settingNavigatons.DELETE_ACCOUNT]: undefined;
  [settingNavigatons.EDIT_CATEGORY]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

function SettingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.GRAY_100,
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={settingNavigatons.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigatons.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />

      <Stack.Screen
        name={settingNavigatons.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={{
          headerTitle: '회원 탈퇴',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />

      <Stack.Screen
        name={settingNavigatons.DELETE_ACCOUNT}
        component={EditCategoryScreen}
        options={{
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;
