import { colors, mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import React, { useEffect, useRef, useState } from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import Octicons from 'react-native-vector-icons/Octicons'
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { getDateWithSeparator, validateAddPost, validateLogin } from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import { MarkerColor } from '@/types/domain';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';
import DatePickerOption from '@/components/DatePickerOption';
import useModal from '@/hooks/useModal';

interface AddPostScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST>


function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params; // 전달된 파라미터 객체를 받아옴.

  const descriptionRef = useRef<TextInput | null>(null);


  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  })

  const createPost = useMutateCreatePost()


  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED')
  const [score, setScore] = useState(5)
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const dateOption = useModal()
  

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide()
  }

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  }

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name)
  }

  const handleChangeScore = (value: number) => {
    setScore(value)
  }

  const handleSubmit = () => {
    const body = {
        date,
        title: addPost.values.title,
        description: addPost.values.description,
        color: markerColor,
        score,
        imageUris: []
    };
    createPost.mutate(
        {address, ...location, ...body}, 
        {
            onSuccess: () => navigation.goBack(), // 뒤로 가기
        }
    );
  };


  useEffect(() => {
    navigation.setOptions({
        headerRight: () => AddPostHeaderRight(handleSubmit),
    });

  });

  return (
    <SafeAreaView style={styles.container}>
        <Text>{location.latitude}</Text>
        <Text>{location.longitude}</Text>

        <ScrollView style={styles.contentContainer}>
            <View style={styles.inputContainer}>
                <InputField 
                    value={address} 
                    disabled  
                    icon={<Octicons name='location' size={16} color={colors.GRAY_500} />}
                />
                <CustomButton 
                    variant='outlined' 
                    size='large' 
                    label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
                    onPress={dateOption.show} 
                />
                <InputField
                    placeholder="제목을 입력하세요"
                    error={addPost.errors.title}
                    touched={addPost.touched.title}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onSubmitEditing={() => descriptionRef.current?.focus()}
                    {...addPost.getTextInputProps('title')}
                    />
                <InputField
                    ref={descriptionRef}
                    placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
                    multiline
                    returnKeyType="next"
                    error={addPost.errors.description}
                    touched={addPost.touched.description}
                    blurOnSubmit={false}
                    {...addPost.getTextInputProps('description')}
                    />
                <MarkerSelector 
                    score={score}
                    markerColor={markerColor} 
                    onPressMarker={handleSelectMarker}    
                />
                <ScoreInput 
                    score={score}
                    onChangeScore={handleChangeScore}
                />
                <DatePickerOption 
                    date={date} 
                    isVisible={dateOption.isVisible} 
                    onChangeDate={handleChangeDate} 
                    onConfirmDate={handleConfirmDate}
                />
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
