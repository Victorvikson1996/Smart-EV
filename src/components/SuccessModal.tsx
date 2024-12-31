/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';

import { lightBlue } from '../constants';
import { Logo } from '../assets/icons';
import { Button } from './Button';

interface ModalProps {
  btnText?: string;
  subtitle?: string;
  title?: string;
  btnColor?: string;
  textColor?: string;
  onPress?: () => void;
}
export interface SuccessModalHandle {
  openModal: () => void;
  closeModal: () => void;
}
const SuccessModal = forwardRef<SuccessModalHandle, ModalProps>(
  ({ btnText = '', subtitle, title, btnColor = lightBlue, onPress }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      closeModal: () => {
        closeModal();
      },
      openModal: () => {
        openModal();
      }
    }));
    const openModal = () => setVisible(true);
    const closeModal = () => {
      setVisible(false);
    };
    return (
      <Modal transparent animationType='fade' visible={visible}>
        <View style={styles.modalCover}>
          <View style={styles.modal}>
            <Logo style={{ width: 10 }} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalSubtitle}>
              A six digit number has been sent to {subtitle}
            </Text>
            <Button
              backgroundColor={btnColor}
              text={btnText}
              textStyle={{ fontWeight: 'bold' }}
              style={{ margin: 5 }}
              onPress={() => {
                onPress?.();
                closeModal();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
);
export default SuccessModal;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 29,
    width: '100%'
  },
  modalCover: {
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: '#0F0F0F',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  modalImage: {
    height: 150,
    marginBottom: 20,
    width: 150
  },
  modalSubtitle: {
    fontSize: 13,
    marginBottom: 10,
    // marginTop: 5,
    textAlign: 'center'
  },
  modalTitle: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'NeueMontreal-Bold'
  }
});
