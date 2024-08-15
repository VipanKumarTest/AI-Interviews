import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Pressable } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import InterviewHistory from '../InterviewHistory';
import SavedInterviews from '../SavedInterviews';
import Banner from '../Banner';
import SearchBar from '../HomeScreens/SearchBar';
import StartInterviewButton from '../HomeScreens/StartInterviewButton';
import ExploreSection from '../HomeScreens/ExploreSection';


const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.nameProfile}>
                    <Text style={styles.headerText}>AI Interview</Text>
                    <TouchableOpacity style={styles.profileButton} onPress={toggleModal}>
                        <Image
                            style={styles.profileImage}
                            source={require('../../assets/profile.png')}
                        />
                    </TouchableOpacity>
                </View>
                {modalVisible && (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Pressable style={styles.option} onPress={() => { /* Handle Profile Press */ }}>
                                <FontAwesome5 name="user" size={20} color="black" style={styles.icon} />
                                <Text style={styles.optionText}>Profile</Text>
                            </Pressable>
                            <Pressable style={styles.option} onPress={() => { /* Handle Setting Press */ }}>
                                <Icon name="cog" size={20} color="#000" style={styles.icon} />
                                <Text style={styles.optionText}>Settings</Text>
                            </Pressable>
                            <Pressable style={styles.option} onPress={() => { /* Handle Logout Press */ }}>
                                <MaterialIcons name="logout" size={20} color="#FF0000" style={styles.icon} />
                                <Text style={[styles.optionText, { color: '#FF0000' }]}>Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                <Text style={styles.subHeaderText}>Assistant Pro</Text>

                {/* <TextInput
                    style={[styles.input, styles.neumorphic]}
                    placeholder="Search"
                    value={search}
                    onChangeText={text => setSearch(text)}
                /> */}

                <View style={styles.content}>
                    <SearchBar value={search} onChangeText={setSearch} />
                    <StartInterviewButton />
                </View>

                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start Practice Interview</Text>
                </TouchableOpacity> */}
            </View>
            <Banner />
            <InterviewHistory />
            <SavedInterviews />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20
    },
    content: {
        padding: 20,
    },
    header: {
        backgroundColor: '#2e3a4f',
        padding: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    nameProfile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
    },
    headerText: {
        color: 'white',
        fontSize: 47,
        fontWeight: 'bold',
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 30,
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
        top: 75,
        right: 10,
        width: 160,
        backgroundColor: 'transparent',
        zIndex: 2
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
    input: {
        height: 50,
        marginBottom: 10,
        marginTop: 40,
        borderColor: '#ccc',
    },
    neumorphic: {
        backgroundColor: '#f5f5f5',
        borderRadius: 30,
        shadowColor: '#A3B1C6',
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E0E5EC',
    },
    subHeaderText: {
        color: 'lightgrey',
        fontSize: 22,
    },
    mainContent: {
        padding: 20,
    },
    button: {
        backgroundColor: '#c4fc19',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#2e3a4f',
        fontSize: 16,
    },
    exploreSection: {
        marginTop: 20,
    },
    exploreText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    card: {
        width: '48%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cardText: {
        color: '#333',
        fontSize: 16,
    },
});

export default HomeScreen;
