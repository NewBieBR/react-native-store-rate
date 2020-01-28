import React, {useState} from 'react';
import {SafeAreaView, Button, View} from 'react-native';
import StoreRating from './StoreRating';

const App = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <SafeAreaView>
        <StoreRating
          primaryColor="coral"
          // modalProps={{animationType: 'slide'}}
          visible={visible}
          onPressOutside={() => setVisible(false)}
        />
        <View style={{top: 300}}>
          <Button
            color="steelblue"
            title="Show Store Rating"
            onPress={() => setVisible(true)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
