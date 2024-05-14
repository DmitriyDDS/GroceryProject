import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { GroceryItemType } from '../types/GroceryItem.type';
import { purple } from '../constants/theme';

type ModalProps = {
  visible: boolean,
  onClose: () => void,
  item: GroceryItemType | null,
  onSave: (item: GroceryItemType) => void
}

class ItemInfo {
  public title: string;
  public quantity: string;

  constructor(dto?: any) {
    this.title = dto?.title ? dto.title : '';
    this.quantity = dto?.quantity ? dto.quantity.toString() : "1";
  }
}

const GroceryItemModal = ({ visible, onClose, item, onSave }: ModalProps) => {
  const [itemInfo, setItemInfo] = useState<ItemInfo>(new ItemInfo());
  const [disabled, setDisabled] = useState(true);

  // Effect to initialize data when the item prop changes (for edit flow)
  useEffect(() => {
    if (item && item) {
      setItemInfo(new ItemInfo(item));
    } else {
      setItemInfo(new ItemInfo());
    }
  }, [item]);

  useEffect(() => {
    if (!!itemInfo.title && !!itemInfo.quantity) {
      setDisabled(false);
    } else (
      setDisabled(true)
    );
  }, [itemInfo.title, itemInfo.quantity]);

  const generatePayload = (): GroceryItemType => {
    const quantity = itemInfo?.quantity ? itemInfo.quantity : "1";
    return {
      title: itemInfo.title,
      id: item?.id ? item.id : null,
      isSelected: item?.isSelected ? item.isSelected : false,
      quantity: +quantity,
    }
  }

  const close = () => {
    onClose();
    setItemInfo(new ItemInfo());
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        close();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Product Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setItemInfo({ ...itemInfo, title: text })
            }
            value={itemInfo.title}
            placeholder="Enter Product Name"
          />
          <Text style={styles.modalText}>Quantity:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setItemInfo({ ...itemInfo, quantity: text })
            }
            value={itemInfo.quantity}
            placeholder="Enter Quantity"
            keyboardType='number-pad'
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Close"
              onPress={onClose}
            />
            <Button
              title="Save"
              onPress={() => {
                onSave(generatePayload());
                close();
              }}
              disabled={disabled}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GroceryItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: purple,
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  }
});