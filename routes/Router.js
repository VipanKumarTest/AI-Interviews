import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

import PremiumScreen from '../components/PremiumScreen';
import Home from '../components/Home';
import VoiceTest from '../components/Testing2';
// import InterviewScreen from '../components/Testing';
import ProfilePage from '../components/Profile';
import EditProfile from '../components/EditProfile';
import InputForm from '../components/GetDetails';
import TempTest from '../components/Testings/TempTest';
import ResultScreen from '../components/Testings/ResultScreen';
import QuestionScreen from '../components/Testings/QuestionScreen';
import HomeScreen from '../components/Testings/HomePageTest';
import ResultScreen1 from '../components/ResultScreens/ResultScreen';
import Question from '../components/QuestionScreens/Question';
import LoginScreen from '../components/UserSignupScreens/Login';
import SignupScreen from '../components/UserSignupScreens/Signup';
import InterviewScreen from '../components/InterviewScreen';




const Router = () => {
    return (
        <View style={styles.container}>
            {/* <HomeScreen /> */}
            {/* <ProfilePage /> */}
            {/* <EditProfile /> */}
            {/* <InputForm /> */}
            {/* <InterviewScreen /> */}
            {/* <PremiumScreen /> */}
            {/* <Question /> */}
            <ResultScreen1 />
            {/* <LoginScreen /> */}
            {/* <SignupScreen /> */}

            {/* <TempTest /> */}
            {/* <VoiceTest /> */}


            {/* Deprecated */}
            {/* <Home /> */}
            {/* <ResultScreen /> */}
            {/* <QuestionScreen /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Router