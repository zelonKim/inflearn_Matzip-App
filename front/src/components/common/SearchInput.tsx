import {TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SearchInput({onSubmit, ...props}) {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
      <Ionicons name={'search'} size={20} onPress={onSubmit} />
    </View>
  );
}

export default SearchInput;
