import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import setUserDetailService from '../appwrite/userDetails/setUserDetails';

const EditProfile = (props) => {
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [links, setLinks] = useState('');
    const [bio, setBio] = useState('');
    const [userData, setUserData] = useState(null);

    const username = props.route.params.username;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await setUserDetailService.getUserDetail(username);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setOccupation(userData.occupation || '');
            setEmail(userData.email || '');
            setLinks(userData.links || '');
            setBio(userData.bio || '');
        }
    }, [userData]);

    const handleEdit = async () => {
        const userDataDocument = {
            name: name,
            occupation: occupation,
            links: links,
            bio: bio,
            updatedAt: new Date().toISOString(),
        };

        try {
            await setUserDetailService.setUpdateUserDetail(username, userDataDocument);
            props.navigation.navigate('ProfilePageScreen');
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <Image
                        source={require('../assets/profile.png')}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="person-outline" size={24} color="#4c669f" style={styles.icon} />
                        <TextInput
                            style={styles.fieldInput}
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="briefcase-outline" size={24} color="#4c669f" style={styles.icon} />
                        <TextInput
                            style={styles.fieldInput}
                            value={occupation}
                            onChangeText={setOccupation}
                            placeholder="Occupation"
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="mail-outline" size={24} color="#4c669f" style={styles.icon} />
                        <TextInput
                            style={[styles.fieldInput, styles.disabledFieldInput]}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="email-address"
                            editable={false}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="link-outline" size={24} color="#4c669f" style={styles.icon} />
                        <TextInput
                            style={styles.fieldInput}
                            value={links}
                            onChangeText={setLinks}
                            placeholder="Website"
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="information-circle-outline" size={24} color="#4c669f" style={styles.icon} />
                        <TextInput
                            style={[styles.fieldInput, styles.bioInput]}
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Bio"
                            multiline
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        bottom: 40,
        backgroundColor: '#f0f2f5',
    },
    headerGradient: {
        height: 200,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
    },
    changePhotoButton: {
        position: 'absolute',
        bottom: 40,
        right: '35%',
        backgroundColor: '#4c669f',
        borderRadius: 20,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        marginBottom: 20,
        elevation: 3,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    icon: {
        marginRight: 10,
    },
    fieldInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
    },
    disabledFieldInput: {
        flex: 1,
        fontSize: 16,
        color: '#777',
        paddingVertical: 10,
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#1D4ED8',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 2,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfile;
