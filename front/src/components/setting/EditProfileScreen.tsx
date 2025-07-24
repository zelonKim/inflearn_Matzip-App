import React, {useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InputField from '../common/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateEditProfile} from '@/utils';
import useImagePicker from '@/hooks/useImagePicker';
import {colors, errorMessages} from '@/constants';
import useModal from '@/hooks/useModal';
import EditProfileImageOption from './EditProfileImageOption';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import Toast from 'react-native-toast-message';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const {getProfileQuery, profileMutation} = useAuth();
  const {nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  
  const imageOption = useModal();

  const imagePicker = useImagePicker({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
    onSettled: imageOption.hide,
  });

  const editProfile = useForm({
    initialValue: {nickname: nickname ?? ''},
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    profileMutation.mutate(
      {...editProfile.values, imageUri: imagePicker.imageUris[0]?.uri},
      {
        onSuccess: () =>
          Toast.show({
            type: 'success',
            text1: '프로필이 변경되었습니다.',
            position: 'bottom',
          }),
        onError: error =>
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
          }),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => EditProfileHeaderRight(handleSubmit),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable style={[styles.imageContainer, styles.emptyImageContainer]}>
          {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
            <Ionicons name="camera-outline" size={30} color={colors.GRAY_500} />
          )}
          {imagePicker.imageUris.length === 0 && kakaoImageUri && (
            <>
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3000/'
                  }${kakaoImageUri}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </>
          )}

          {imagePicker.imageUris.length > 0 && (
            <>
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3000/'
                  }${imagePicker.imageUris[0]?.uri}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </>
          )}
        </Pressable>
      </View>
      <InputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
      />
      <Pressable
        style={styles.deleteAccountContainer}
        onPress={() => navigation.navigate(settingNavigation.DELETE_ACCOUNT)}>
        <Ionicons name="remove-circle-sharp" size={18} color={colors.RED_500} />
        <Text style={styles.deleteAccountText}>회원 탈퇴</Text>
      </Pressable>

      <EditProfileImageOption
        isVisible={imageOption.isVisible}
        hideOption={imageOption.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default EditProfileScreen;
