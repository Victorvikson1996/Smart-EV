import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { apppurple } from '../constants';

export type SuccessModalHandle = {
  openModal: (message: string, subtitle?: string) => void;
};

type SuccessModalProps = {
  title: string;
  btnText: string;
  onPress: () => void;
};

const SuccessModal = forwardRef<SuccessModalHandle, SuccessModalProps>(
  ({ title, btnText, onPress }, ref) => {
    const [visible, setVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalSubtitle, setModalSubtitle] = useState<string | undefined>('');

    useImperativeHandle(ref, () => ({
      openModal(message: string, subtitle?: string) {
        setModalMessage(message);
        setModalSubtitle(subtitle);
        setVisible(true);
      }
    }));

    return (
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{modalMessage}</Text>
            {modalSubtitle && (
              <Text style={styles.subtitle}>{modalSubtitle}</Text>
            )}
            <TouchableOpacity onPress={onPress} style={styles.button}>
              <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  message: {
    fontSize: 16,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20
  },
  button: {
    backgroundColor: apppurple,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default SuccessModal;
