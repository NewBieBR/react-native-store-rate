import * as React from 'react';
import {
  Dimensions,
  Modal,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import normalize from 'react-native-normalize';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const DEFAULT_HEADING = 'Enjoying the app?';

export interface StoreRatingProps {
  primaryColor?: string;
  visible: boolean;
  style?: any;
  containerStyle?: any;
  modalProps?: ModalProps;
  heading?: string;
  rateFiveStarsLabel?: string;
  rateFiveStarsLabelStyle?: any;
  feedbackLabel?: string;
  feedbackLabelStyle?: any;
  cancelLabel?: string;
  cancelLabelStyle?: any;
  renderPopup?: () => React.ReactNode;
  renderPopupHeading?: () => React.ReactNode;
  onCancel?: () => void;
  onRateFiveStars?: () => void;
  onFeedbackPress?: () => void;
  onFeedbackSubmit?: (feedback: string) => void;
  onPressOutside?: () => void;
}

export interface StoreRatingState {}

export default class StoreRating extends React.Component<
  StoreRatingProps,
  StoreRatingState
> {
  static defaultProps: Partial<StoreRatingProps> = {
    primaryColor: '#08f',
    rateFiveStarsLabel: 'Rate 5 stars',
    feedbackLabel: 'Feedback',
    cancelLabel: 'Cancel',
  };

  constructor(props: StoreRatingProps) {
    super(props);
    this.state = {};
  }

  renderPopup() {
    const {
      style,
      renderPopupHeading,
      primaryColor,
      rateFiveStarsLabel,
      rateFiveStarsLabelStyle,
      feedbackLabel,
      feedbackLabelStyle,
      cancelLabel,
      cancelLabelStyle,
    } = this.props;
    return (
      <View style={[styles.popup, style]}>
        {renderPopupHeading ? (
          renderPopupHeading()
        ) : (
          <View style={styles.headingCont}>
            <Text>{DEFAULT_HEADING}</Text>
          </View>
        )}
        <View style={styles.centerCont}>
          <TouchableOpacity
            style={[styles.primaryButton, {backgroundColor: primaryColor}]}>
            <Text style={[{color: 'white'}, rateFiveStarsLabelStyle]}>
              {rateFiveStarsLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerCont}>
          <TouchableOpacity
            style={[styles.button, {borderColor: primaryColor}]}>
            <Text style={[{color: primaryColor}, feedbackLabelStyle]}>
              {feedbackLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerCont}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={[{color: 'lightgray'}, cancelLabelStyle]}>
              {cancelLabel}
            </Text>
          </TouchableOpacity>
        </View>
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
        <View style={[styles.popupContainer, containerStyle]}>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={onPressOutside}
            style={StyleSheet.absoluteFill}
          />
          {renderPopup ? renderPopup() : this.renderPopup()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
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
    paddingHorizontal: normalize(15),
  },
  headingCont: {
    flex: 2,
    // backgroundColor: 'lightskyblue',
    alignItems: 'center',
    justifyContent: 'center',
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
});
