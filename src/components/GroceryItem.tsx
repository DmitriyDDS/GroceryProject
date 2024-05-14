import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GroceryItemType } from '../types/GroceryItem.type';
import { purple } from '../constants/theme';
import CheckBox from '@react-native-community/checkbox';

type GroceryItemProps = {
  item: GroceryItemType,
  editItem: (item: GroceryItemType) => void,
  onCheckItem: (item: GroceryItemType) => void,
  deleteItem: (id: string | null) => void,
}

type ButtonProps = {
  text: string,
  callbackFN: () => void,
}

type CheckboxProps = {
  checked: boolean,
  onChange: () => void,
  styles?: any,
}

const GroceryItem = ({ item, editItem, deleteItem, onCheckItem }: GroceryItemProps) => {
  return (
    <View style={styles.container}>
      {item.isSelected && <CrossLine />}
      <CheckBoxComponent styles={styles.checkbox} checked={item.isSelected} onChange={() => onCheckItem({ ...item, isSelected: !item.isSelected })} />
      <Text style={{ marginRight: 10 }}>{item.quantity}</Text>
      <Text style={styles.titleText}>{item.title}</Text>
      <View style={styles.buttonsContainer}>
        <Button text='Edit' callbackFN={() => editItem(item)} />
        <Button text='Delete' callbackFN={() => deleteItem(item.id)} />
      </View>
    </View>
  );
};

const Button = ({ text, callbackFN }: ButtonProps) => {
  return <TouchableOpacity style={styles.button} onPress={callbackFN}>
    <Text>
      {text}
    </Text>
  </TouchableOpacity>
}

const CheckBoxComponent = ({ checked, onChange, styles }: CheckboxProps) => {
  return <CheckBox
    style={styles}
    value={checked}
    onValueChange={onChange}
    onCheckColor={purple}
    onTintColor={purple} // Border color when the checkbox is selected
  />
}

const CrossLine = () => {
  return <View style={styles.crossLine}></View>
}

export default GroceryItem;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 5,
    marginLeft: 5,
  },
  crossLine: {
    position: 'absolute',
    width: '60%',
    height: 1,
    backgroundColor: purple,
    left: 45,
  },
  titleText: {
    marginRight: 10,
    flex: 1
  },
  checkbox: {
    top: 4,
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
  },
});