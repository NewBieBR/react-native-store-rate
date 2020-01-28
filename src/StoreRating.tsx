import * as React from 'react';
import { View, StyleSheet, Text, ModalProps } from 'react-native';

export interface StoreRatingProps {
  modalProps: ModalProps;
}

export interface StoreRatingState {}

export default class StoreRating extends React.Component<
  StoreRatingProps,
  StoreRatingState
> {
  constructor(props: StoreRatingProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        <Text>StoreRating Component</Text>
      </View>
    );
  }
}
