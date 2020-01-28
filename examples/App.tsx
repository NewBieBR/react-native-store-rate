import React, {useState} from 'react';
import {SafeAreaView, Button, View} from 'react-native';
import StoreRating from './StoreRating';

const App = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <SafeAreaView>
        <StoreRating
          primaryColor="#ff6a69"
          rateOptions={{
            AppleAppID: '1462815590',
            preferInApp: true,
            openAppStoreIfInAppFails: true,
          }}
          // modalProps={{animationType: 'slide'}}
          onFeedbackSubmit={feedback => console.warn(feedback)}
          visible={visible}
          onCancelPress={() => setVisible(false)}
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
