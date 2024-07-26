import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PremiumScreen from '../components/PremiumScreen';
import EditProfile from '../components/EditProfile';
import InputForm from '../components/GetDetails';
import ResultScreen1 from '../components/ResultScreens/ResultScreen';
import Question from '../components/QuestionScreens/Question';
import LoginScreen from '../components/UserSignupScreens/Login';
import SignupScreen from '../components/UserSignupScreens/Signup';
import InterviewScreen from '../components/InterviewScreen';
import HomeScreen from '../components/HomeScreens/HomeScreen';
import StartInterviewButton from '../components/HomeScreens/StartInterviewButton';

import InterviewHistory from '../components/HomeScreens/InterviewHistory';


const Stack = createStackNavigator();


const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="InputFormScreen" component={InputForm} />
                <Stack.Screen name="QuestionsScreen" component={Question} />
                <Stack.Screen name="InterviewScreen" component={InterviewScreen} />
                <Stack.Screen name="ResultScreen" component={ResultScreen1} />
                <Stack.Screen name="EditProfileScreen" component={EditProfile} />
                <Stack.Screen name="ProfilePageScreen" component={ProfilePage} />
                <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
                <Stack.Screen name="InterviewHistory" component={InterviewHistory} />

                <Stack.Screen name="StartInterviewButton" component={StartInterviewButton} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Router
