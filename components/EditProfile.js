import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const EditProfile = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [links, setLinks] = useState('www.johndoe.com');
    const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.');

    return (
        <ScrollView style={{ backgroundColor: '#E0E5EC' }}>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editProfileButton}>
                    <Text style={styles.editProfileText}>Save Profile</Text>
                </TouchableOpacity>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Name:</Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email:</Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Links:</Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={links}
                        onChangeText={setLinks}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Bio:</Text>
                    <TextInput
                        style={[styles.fieldInput, styles.bioInput]}
                        value={bio}
                        onChangeText={setBio}
                        multiline
                    />
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
        marginBottom: 5,
    },
    fieldInput: {
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default EditProfile;
