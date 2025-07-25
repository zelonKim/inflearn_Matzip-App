import useAuth from '@/hooks/queries/useAuth';
import {Alert, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../common/CustomButton';
import {alerts, colors, errorMessages} from '@/constants';
import Toast from 'react-native-toast-message';

interface DeleteAccountScreenProps {}

function DeleteAccountScreen({}: DeleteAccountScreenProps) {
  const {deleteAccountMutation} = useAuth();

  const handlePressDeleteAccount = () => {
    Alert.alert(
      alerts.DELETE_ACCOUNT.TITLE,
      alerts.DELETE_ACCOUNT.DESCRIPTION,
      [
        {
          text: '탈퇴',
          onPress: () =>
            deleteAccountMutation.mutate(null, {
              onSuccess: () =>
                Toast.show({
                  type: 'success',
                  text1: '탈퇴가 완료되었습니다.',
                  position: 'bottom',
                }),

              onError: error =>
                Toast.show({
                  type: 'error',
                  text1:
                    error.response?.data.message ||
                    errorMessages.UNEXPECT_ERROR,
                  position: 'bottom',
                }),
            }),
          style: 'destructive',
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          저장된 데이터를 모두 삭제해야 회원탈퇴가 가능해요.
        </Text>
        <Text style={styles.infoText}>
          저장된 장소가 남아있다면 삭제해주세요.
        </Text>
      </View>
      <CustomButton label="회원탈퇴" onPress={handlePressDeleteAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.PINK_700,
    borderRadius: 3,
    padding: 10,
    gap: 10,
  },
  infoText: {
    color: colors.PINK_700,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DeleteAccountScreen;
