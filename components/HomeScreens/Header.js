import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfileModal from './ProfileModal';

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.header}>
            <View style={styles.nameProfile}>
                <Text style={styles.headerText}>AI Interview</Text>
                <TouchableOpacity style={styles.profileButton} onPress={() => setModalVisible(true)}>
                    <Image
                        style={styles.profileImage}
                        source={require('../../assets/profile.png')}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.subHeaderText}>Assistant Pro</Text>
            <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2e3a4f',
        padding: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    nameProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'lightgrey',
        fontSize: 20,
        marginTop: 5,
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Header;