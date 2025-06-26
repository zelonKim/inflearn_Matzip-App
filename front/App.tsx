/*
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  View,
} from 'react-native';


function App() {
  const [name, setName] = useState('');

  const handleChangeText = (text: string) => {
    setName(text);
  };

  return (

      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text> 텍스트 </Text>
          <Button title="버튼명" onPress={() => console.log('클릭됨.')} />
          <TextInput
            style={styles.input}
            onChangeText={handleChangeText}
            value={name}
          />
        </View>
      </SafeAreaView>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    margin: '10%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;

*/

//////////////////////////////////

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
