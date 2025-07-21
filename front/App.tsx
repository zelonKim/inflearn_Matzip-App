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

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.BLUE_500}}
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
      style={{borderLeftColor: colors.RED_500}}
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
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
