import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

import PremiumScreen from '../components/PremiumScreen';
import Home from '../components/Home';
import VoiceTest from '../components/Testing2';
import InterviewScreen from '../components/Testing';
import ProfilePage from '../components/Profile';
import EditProfile from '../components/EditProfile';
import InputForm from '../components/GetDetails';
import TempTest from '../components/Testings/TempTest';
import ResultScreen from '../components/Testings/ResultScreen';
import QuestionScreen from '../components/Testings/QuestionScreen';
import HomeScreen from '../components/Testings/HomePageTest';
import ResultScreen1 from '../components/ResultScreens/ResultScreen';
import Question from '../components/QuestionScreens/Question';



const Router = () => {
    return (
        <View style={styles.container}>
            {/* <Home /> */}
            {/* <HomeScreen /> */}
            {/* <ProfilePage /> */}
            {/* <EditProfile /> */}
            {/* <InputForm /> */}
            {/* <InterviewScreen /> */}
            {/* <VoiceTest /> */}
            {/* <PremiumScreen /> */}

            <Question />
            {/* <QuestionScreen /> */}
            {/* <ResultScreen /> */}
            {/* <ResultScreen1 /> */}
            {/* <TempTest /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Router