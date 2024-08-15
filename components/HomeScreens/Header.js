import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ProfileModal from './ProfileModal';
import { useAuth } from '../../appwrite/AuthProvider';

const Header = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { profileImage } = useAuth();

    return (
        <View style={styles.header}>
            <View style={styles.nameProfile}>
                <Text style={styles.headerText}>AI Interview</Text>
                <TouchableOpacity style={styles.profileButton} onPress={() => setModalVisible(true)}>
                    <View style={styles.profileImage}>
                        <Text style={styles.profileText}>{profileImage()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.subHeaderText}>Assistant Pro</Text>
            <ProfileModal visible={modalVisible} navigation={navigation} onClose={() => setModalVisible(false)} />
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
        backgroundColor: '#c2185b',
    },
    profileText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    }
});

export default Header;