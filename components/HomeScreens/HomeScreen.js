import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Header from './Header';
import SearchBar from './SearchBar';
import StartInterviewButton from './StartInterviewButton';
import ExploreSection from './ExploreSection';
import InterviewHistory from './InterviewHistory';
import BottomNavBar from './BottomNavBar';
import { useAuth } from '../../appwrite/AuthProvider';

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('Home');
    const { user } = useAuth();

    const handleTabPress = (tabName, screenName) => {
        console.log(user);
        setActiveTab(tabName);
        navigation.navigate(screenName);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header navigation={navigation} />
                <View style={styles.content}>
                    <SearchBar value={search} onChangeText={setSearch} />
                    <StartInterviewButton navigation={navigation} />
                    <ExploreSection />
                    <InterviewHistory navigation={navigation} />
                </View>
            </ScrollView>
            <BottomNavBar navigation={navigation} activeTab={activeTab} onTabPress={handleTabPress} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    content: {
        padding: 20,
    },
});

export default HomeScreen;