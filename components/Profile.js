import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../appwrite/AuthProvider';
import userDetailService from '../appwrite/userDetails/userDetails';

const ProfilePage = ({ navigation }) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const username = user?.email.split('@')[0];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await userDetailService.getUserDetails(username);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, [userData]);

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
                    <Text style={styles.name}>{userData?.name}</Text>
                    <Text style={styles.tagline}>{userData?.occupation}</Text>
                </View>
            </LinearGradient>

            <View style={styles.container}>
                <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfileScreen', { username: username, navigation: navigation })}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>

                <View style={styles.infoCard}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="person-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>User Name</Text>
                            <Text style={styles.fieldValue}>{userData?.username}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="mail-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Email</Text>
                            <Text style={styles.fieldValue}>{userData?.email}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="link-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Website</Text>
                            <Text style={styles.fieldValue}>{userData?.links}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="information-circle-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Bio</Text>
                            <Text style={styles.fieldValue}>{userData?.bio}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    headerGradient: {
        height: 250,
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
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        color: '#e0e0e0',
        marginTop: 5,
    },
    editProfileButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 2,
    },
    editProfileText: {
        color: '#4c669f',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        elevation: 3,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    fieldTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    fieldLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    fieldValue: {
        fontSize: 16,
        color: '#333',
    },
});

export default ProfilePage;