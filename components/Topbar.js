import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopBar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>AI Interview</Text>
        <TouchableOpacity style={styles.profileButton} onPress={toggleModal}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://img.freepik.com/premium-vector/hand-drawing-cartoon-girl-cute-girl-drawing-profile-picture_488586-692.jpg?w=740' }}
          />
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable style={styles.option} onPress={() => { /* Handle Profile Press */ }}>
              <Icon name="user" size={20} color="#000" style={styles.icon} />
              <Text style={styles.optionText}>Profile</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={() => { /* Handle Setting Press */ }}>
              <Icon name="cog" size={20} color="#000" style={styles.icon} />
              <Text style={styles.optionText}>Settings</Text>
            </Pressable>
            <Pressable style={styles.option} onPress={() => { /* Handle Logout Press */ }}>
              <Icon name="sign-out" size={20} color="#FF0000" style={styles.icon} />
              <Text style={[styles.optionText, { color: '#FF0000' }]}>Logout</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 9,
    paddingTop: 6,
    paddingBottom: 6
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContainer: {
    position: 'absolute',
    top: 65,
    right: 10,
    width: 160,
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default TopBar;
