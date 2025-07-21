import {getFormDataImages} from '@/utils/image';
import ImagePicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';
import {useState} from 'react';
import {ImageUri} from '@/types/domain';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);

  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개 입니다.');
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1); // splice(시작 인덱스, 제거할 개수): 배열의 해당 인덱스부터 주어진 개수만큼의 요소를 제거함. & 제거된 요소를 반환함.
    copyImageUris.splice(toIndex, 0, removedImage); // splice(시작 인덱스, 제거할 개수, 추가할 요소): 배열의 해당 인덱스부터 주어진 개수만큼의 요소를 제거하고, 그 자리에 요소를 추가함. & 제거된 요소를 반환함.
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediatype: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '갤러리를 열 수 없어요.',
            text2: '권한을 허용했는지 확인해주세요',
            position: 'bottom',
          });
        }
      });
  };

  return {
    imageUris,
    handleChange,
    changeOrder: changeImageUrisOrder,
    delete: deleteImageUri,
  };
}

export default useImagePicker;
