import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {feedNavigations} from '@/constants';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  //[feedNavigations.FEED_DETAIL]: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
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
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
