import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeOptionProps {}

function DarkModeOption({isVisible, hideOption}: DarkModeOptionProps) {
  const systemDefault = useColorScheme();

  const {theme, isSystem, setMode, setSystem} = useThemeStorage();

  const handlePressLight = () => {
    setMode('light');
    setSystem(false);
    hideOption();
  };

  const handlePressDark = () => {
    setMode('dark');
    setSystem(false);
    hideOption();
  };

  const handlePressSystem = () => {
    setMode(systemDefault ?? 'light');
    setSystem(true);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button
            onPress={handlePressLight}
            isChecked={isSystem === false && theme === 'lgiht'}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressDark}
            isChecked={isSystem === false && theme === 'dark'}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={handlePressSystem}>
            시스템 기본값 모드
          </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

const styles = StyleSheet.create({});

export default DarkModeOption;
