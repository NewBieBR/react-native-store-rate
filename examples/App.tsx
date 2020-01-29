import React, {useState} from 'react';
import {SafeAreaView, Button, View, Text} from 'react-native';
import StoreRatePopup from './StoreRatePopup';

const App = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <SafeAreaView>
        <StoreRatePopup
          primaryColor="#ff6a69"
          rateOptions={{
            AppleAppID: '1462815590',
            GooglePackageName: 'com.mywebsite.myapp',
            preferInApp: true,
            openAppStoreIfInAppFails: true,
          }}
          renderPopupHeading={() => (
            <View>
              <Text>Test</Text>
            </View>
          )}
          onFeedbackSubmit={feedback => {
            setVisible(false);
            console.warn(feedback);
          }}
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
