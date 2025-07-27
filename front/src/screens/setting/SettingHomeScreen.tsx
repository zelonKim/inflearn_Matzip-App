import DarkModeOption from '@/components/setting/DarkModeOption';
import MapLegendOption from '@/components/setting/MapLegendOption';
import {colors, settingNavigatons} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();

  const darkModeOption = useModal();

  const mapLegendOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigatons.EDIT_PROFILE);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigatons.EDIT_CATEGORY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPres={handlePressEditProfile} />
        <SettingItem
          title="마커 카테고리 설정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="다크 모드" onPress={darkModeOption.show} />
        <SettingItem title="범례 표시" onPress={mapLegendOption.show} />

        <SettingItem
          title="로그아웃"
          onPress={handlePressLogout}
          color={colors.RED_500}
          icon={<Octicons name={'sign-out'} color={colors.RED_500} size={16} />}
        />

        <DarkModeOption
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
        />

        <MapLegendOption
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
