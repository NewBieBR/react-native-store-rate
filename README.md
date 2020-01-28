# React Native Store Rate

Show a popup asking for ratings or feedback. Show real in app (*or open store*) rating if users gave 5 stars.

## Installation

```bash
yarn add react-native-store-rate
```

OR

```bash
npm install --save react-native-store-rate
```

## Basic Usage

```tsx
import StoreRatePopup from 'react-native-store-rate';

const [visible, setVisible] = useState(true);

<StoreRatePopup
  primaryColor="#ff6a69"
  rateOptions={{
    AppleAppID: '1462815590',
    GooglePackageName: 'com.mywebsite.myapp',
  }}
  onFeedbackSubmit={feedback => setVisible(false)}
  visible={visible}
  onCancelPress={() => setVisible(false)}
/>
```