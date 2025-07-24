import useAuth from '@/hooks/queries/useAuth';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../common/CustomButton';

interface DeleteAccountScreenProps {}

function DeleteAccountScreen({}: DeleteAccountScreenProps) {
  const {deleteAccountMutation} = useAuth();

  return (
    <View style={styles.container}>
      <CustomButton label="회원탈퇴" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
});

export default DeleteAccountScreen;
