import { colors, mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import Octicons from 'react-native-vector-icons/Octicons'
import CustomButton from '@/components/CustomButton';

interface AddPostScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST>


function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params; // 전달된 파라미터 객체를 받아옴.

  return (
    <SafeAreaView style={styles.container}>
        <Text>{location.latitude}</Text>
        <Text>{location.longitude}</Text>

        <ScrollView style={styles.contentContainer}>
            <View style={styles.inputContainer}>
                <InputField value='' disabled  
                    icon={<Octicons name='location' size={16} color={colors.GRAY_500}/>}
                />
                <CustomButton variant='outlined' size='large' label='날짜 선택' />
                <InputField />
                <InputField />
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        marginBottom: 10,
    },
    inputContainer: {
        gap: 20,
        marginBottom: 20,
    }
});

export default AddPostScreen;
