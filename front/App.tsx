import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {colors} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import {StatusBar, Text, View} from 'react-native';
import CodePush from 'react-native-code-push';
import useCodePush from '@/hooks/useCodePush';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors['light'].BLUE_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors['light'].RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

const App = () => {
  const {theme} = useThemeStorage();
  const {hasUpdate, syncProgress} = useCodePush();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        {hasUpdate ? (
          <View>
            <Text>업데이트 중...</Text>
          </View>
        ) : (
          <RootNavigator />
        )}
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default CodePush(App);
