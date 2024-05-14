import React, { useState } from 'react';
import { Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import GroceryItem from '../components/GroceryItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { purple } from '../constants/theme';
import { GroceryItemType } from '../types/GroceryItem.type';
import GroceryItemModal from '../modals/groceryItem.modal';
import { useMutationCreateGrocery, useMutationDeleteGrocery, useMutationEditGrocery, useQueryGetGrocery } from '../hooks/grocery';

const GroceryListScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GroceryItemType | null>(null);

  const { data, isSuccess, isLoading, error } = useQueryGetGrocery();
  const createGroceryItemMutation = useMutationCreateGrocery();
  const editGroceryItemMutation = useMutationEditGrocery();
  const deleteGroceryItemMutation = useMutationDeleteGrocery();

  const editItem = (item: GroceryItemType) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const onSave = (item: GroceryItemType) => {
    if (item.id) {
      updateGroceryItem(item);
    } else {
      createGroceryItem(item);
    };
  };

  const createGroceryItem = (item: GroceryItemType) => {
    createGroceryItemMutation.mutate({ id: `${data.length + 1}`, title: item.title, isSelected: false, quantity: 1 });
  };

  const updateGroceryItem = (item: GroceryItemType) => {
    editGroceryItemMutation.mutate(item);
  };

  const deleteGroceryItem = (id: string | null) => {
    deleteGroceryItemMutation.mutate(id);
  };

  const onCheckItem = (item: GroceryItemType) => {
    updateGroceryItem(item);
  }

  return (
    <SafeAreaView style={styles.container}>

      {isLoading && <ActivityIndicator color={purple} />}

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {isSuccess && <>
        <GroceryItemModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onSave={onSave}
        />

        <View style={styles.content} >
          <Text style={styles.header}>Grocery List</Text>
          <FlatList
            data={data}
            style={styles.list}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <GroceryItem item={item} deleteItem={deleteGroceryItem} editItem={editItem} onCheckItem={onCheckItem} />
            )}
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addItemButton}>
          <Text style={styles.addItemButtonText}>
            Add Item
          </Text>
        </TouchableOpacity>
      </>}
    </SafeAreaView >
  );
};

export default observer(GroceryListScreen);


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  content: {
    flex: 1,
    marginLeft: 20,
    marginRight: 5,
  },
  list: {
    paddingRight: 15,
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  addItemButton: {
    padding: 10,
    backgroundColor: purple,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff'
  },
  errorText: {
    color: '#0f0',
  }
});