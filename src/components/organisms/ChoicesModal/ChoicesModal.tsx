import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, { FC, PropsWithChildren, ReactElement } from 'react';
import Modal from 'react-native-modal';

interface ChoicesInModal {
  name?: string;
  onPress?: () => void;
}

const ChoicesModal: FC<PropsWithChildren<ChoicesModalProps>> = (
  props: PropsWithChildren<ChoicesModalProps>
): ReactElement => {
  const { isVisible, onBackdropPress, choices } = props;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <SafeAreaView style={styles.bottomBoxContainer}>
        <View style={styles.backgroundChoice}>
          {choices.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.textContainer}
              onPress={item.onPress}
              key={index}
            >
              <Text style={[styles.text]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onBackdropPress}
          style={[styles.backgroundChoice, styles.textContainer]}
        >
          <Text style={[styles.textCancel]}>Hủy</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomBoxContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 50,
  },

  backgroundChoice: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    borderRadius: 15,
    zIndex: 0,
  },

  textContainer: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    marginTop: 8,
  },

  text: {
    color: '#5C61F4',
    fontSize: 14,
  },

  textCancel: {
    fontSize: 14,
    color: '#BC2C3D',
  },
});

export interface ChoicesModalProps {
  //
  isVisible: boolean;

  onBackdropPress: () => void;

  choices: ChoicesInModal[];
}

ChoicesModal.defaultProps = {
  //
};

ChoicesModal.propTypes = {
  //
};

export default React.memo(ChoicesModal);
