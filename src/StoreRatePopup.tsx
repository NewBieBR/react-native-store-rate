import * as React from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import normalize, {SCREEN_HEIGHT} from 'react-native-normalize';
import Rate, {IConfig} from 'react-native-rate';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export interface StoreRatePopupProps {
  primaryColor?: string;
  visible: boolean;
  rateOptions?: IConfig;
  style?: any;
  containerStyle?: any;
  modalProps?: ModalProps;
  heading?: string;
  rateFiveStarsLabel?: string;
  rateFiveStarsLabelStyle?: any;
  feedbackLabel?: string;
  sendFeedbackLabel?: string;
  feedbackLabelStyle?: any;
  cancelLabel?: string;
  cancelLabelStyle?: any;
  renderPopup?: () => React.ReactNode;
  renderPopupHeading?: () => React.ReactNode;
  onCancelPress?: () => void;
  onRated?: (success: boolean) => void;
  onRateFiveStarsPress?: () => void;
  onFeedbackPress?: () => void;
  onFeedbackSubmit?: (feedback: string) => void;
  onPressOutside?: () => void;
  cancelable?: boolean;
}

export interface StoreRatePopupState {
  givingFeedback: boolean;
  feedback: string;
}

export default class StoreRatePopup extends React.Component<
  StoreRatePopupProps,
  StoreRatePopupState
> {
  static defaultProps: Partial<StoreRatePopupProps> = {
    primaryColor: '#08f',
    heading: 'Enjoying the app?',
    rateFiveStarsLabel: 'Rate 5 stars',
    feedbackLabel: 'Feedback',
    sendFeedbackLabel: 'Send feedback',
    cancelLabel: 'Cancel',
    cancelable: true,
    modalProps: {animationType: 'slide'},
  };
  headingSize = new Animated.Value(0);

  constructor(props: StoreRatePopupProps) {
    super(props);
    this.state = {givingFeedback: false, feedback: ''};
  }

  onRateFiveStarsPress() {
    Rate.rate(this.props.rateOptions || {}, success => {
      if (this.props.onRated) this.props.onRated(success);
    });
    if (this.props.onRateFiveStarsPress) this.props.onRateFiveStarsPress();
  }

  onFeedbackPress() {
    if (this.state.givingFeedback) {
      if (this.props.onFeedbackSubmit)
        this.props.onFeedbackSubmit(this.state.feedback);
      return;
    }
    Animated.timing(this.headingSize, {
      duration: 200,
      toValue: 1,
    }).start();
    this.setState({givingFeedback: true});
    if (this.props.onFeedbackPress) this.props.onFeedbackPress();
  }

  renderPopup() {
    const {
      style,
      cancelable,
      heading,
      renderPopupHeading,
      primaryColor,
      rateFiveStarsLabel,
      rateFiveStarsLabelStyle,
      feedbackLabel,
      feedbackLabelStyle,
      cancelLabel,
      cancelLabelStyle,
      onCancelPress,
      sendFeedbackLabel,
    } = this.props;
    const {givingFeedback} = this.state;
    return (
      <View style={[styles.popup, style]}>
        {renderPopupHeading ? (
          renderPopupHeading()
        ) : (
          <Animated.View
            style={[
              {
                height: this.headingSize.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    normalize((2 / 5) * 240, 'height'),
                    normalize((1 / 2) * 240, 'height'),
                  ],
                }),
              },
              styles.headingCont,
            ]}>
            {givingFeedback ? (
              <TextInput
                autoFocus
                selectionColor={primaryColor}
                onChangeText={feedback => this.setState({feedback})}
                style={styles.textInput}
                blurOnSubmit
                multiline
                returnKeyType="done"
              />
            ) : (
              <Text style={styles.heading}>{heading}</Text>
            )}
          </Animated.View>
        )}
        <View style={styles.centerCont}>
          <TouchableOpacity
            onPress={this.onRateFiveStarsPress.bind(this)}
            style={[styles.primaryButton, {backgroundColor: primaryColor}]}>
            <Text style={[{color: 'white'}, rateFiveStarsLabelStyle]}>
              {rateFiveStarsLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerCont}>
          <TouchableOpacity
            onPress={this.onFeedbackPress.bind(this)}
            style={[styles.button, {borderColor: primaryColor}]}>
            <Text style={[{color: primaryColor}, feedbackLabelStyle]}>
              {givingFeedback ? sendFeedbackLabel : feedbackLabel}
            </Text>
          </TouchableOpacity>
        </View>
        {cancelable && (
          <View style={styles.centerCont}>
            <TouchableOpacity
              onPress={onCancelPress}
              style={styles.secondaryButton}>
              <Text style={[{color: 'lightgray'}, cancelLabelStyle]}>
                {cancelLabel}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  public render() {
    const {
      modalProps,
      visible,
      containerStyle,
      onPressOutside,
      renderPopup,
    } = this.props;
    return (
      <Modal visible={visible} transparent {...modalProps}>
        <ScrollView
          scrollEnabled={false}
          style={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            style={[styles.popupContainer, containerStyle]}>
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={onPressOutside}
              style={StyleSheet.absoluteFill}
            />
            {renderPopup ? renderPopup() : this.renderPopup()}
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: SCREEN_WIDTH - normalize(50) * 2,
    height: normalize(240, 'height'),
    borderRadius: normalize(10),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 0.1,
    // paddingVertical: normalize(15, 'height'),
    paddingHorizontal: normalize(20),
  },
  headingCont: {
    // backgroundColor: 'lightskyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: normalize(16),
  },
  centerCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#08F',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    width: '80%',
    borderRadius: normalize(6),
  },
  button: {
    borderColor: '#08F',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    width: '80%',
    borderRadius: normalize(6),
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    width: '70%',
  },
  textInput: {
    width: '100%',
    height: '70%',
    padding: normalize(10),
    borderRadius: normalize(8),
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
});
