import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfilePage = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editProfileButton}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Name:</Text>
                    <Text style={styles.fieldValue}>John Doe</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email:</Text>
                    <Text style={styles.fieldValue}>johndoe@example.com</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Links:</Text>
                    <Text style={styles.fieldValue}>www.johndoe.com</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Bio:</Text>
                    <Text style={styles.fieldValue}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</Text>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    editProfileButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 30,
    },
    editProfileText: {
        color: '#fff',
        fontSize: 16,
    },
    fieldContainer: {
        width: '80%',
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    fieldValue: {
        fontSize: 16,
        color: '#666',
    },
});

export default ProfilePage;
