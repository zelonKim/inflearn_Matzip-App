import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../hooks/queries/useAuth';

const MapHomeScreen() {
  const {logoutMutation} = useAuth()

  return (
    <SafeAreaView>
        <Text>맵 스크린</Text>
        <Button title='로그아웃' onPress={() => logoutMutation.mutate(null)}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default MapHomeScreen;