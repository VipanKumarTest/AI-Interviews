import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../appwrite/AuthProvider';

const SettingsScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleDeleteAccount = async () => {
        // await logout();
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Login' }],
        // });
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this awesome app!',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>
            </LinearGradient>

            <View style={styles.container}>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('EditProfileScreen', { username: user?.email.split('@')[0] })}>
                    <Ionicons name="person-outline" size={24} color="#4c669f" />
                    <Text style={styles.settingText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('TermsAndConditions')}>
                    <Ionicons name="document-text-outline" size={24} color="#4c669f" />
                    <Text style={styles.settingText}>Terms and Conditions</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={handleShare}>
                    <Ionicons name="share-outline" size={24} color="#4c669f" />
                    <Text style={styles.settingText}>Share App</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} >
                    <Text style={styles.logoutText}>Delete Account</Text>
                </TouchableOpacity>
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
        height: 150,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    settingText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#ff6b6b',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;