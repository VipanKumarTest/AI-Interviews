import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from '../appwrite/AuthProvider';

// Screens
import PremiumScreen from '../components/PremiumScreen';
// import VoiceTest from '../components/Testing2';
// import InterviewScreen from '../components/Testing';
import ProfilePage from '../components/Profile';
import EditProfile from '../components/EditProfile';
import InputForm from '../components/GetDetails';
// import HomeScreen from '../components/Testings/HomePageTest';
import ResultScreen1 from '../components/ResultScreens/ResultScreen';
import Question from '../components/QuestionScreens/Question';
import LoginScreen from '../components/UserSignupScreens/Login';
import SignupScreen from '../components/UserSignupScreens/Signup';
import InterviewScreen from '../components/InterviewScreen';
// import HomeScreen from '../components/Testings/TempTest';
import HomeScreen from '../components/HomeScreens/HomeScreen';
import StartInterviewButton from '../components/HomeScreens/StartInterviewButton';
import Herooo from '../components/NavTemp/Hero';
import About from '../components/NavTemp/About';
import Contact from '../components/NavTemp/Contact';
import InterviewHistory from '../components/HomeScreens/InterviewHistory';
import LoadingScreen from '../components/LoadingScreen';
import SettingsScreen from '../components/Settings/SettingScreen';
import TermsAndConditionsScreen from '../components/Settings/TermsAndConditionsScreen';
import ForgotPassword from '../components/UserSignupScreens/ForgetPassword';
import VerifyOTPScreen from '../components/UserSignupScreens/VarifyOTP';

// import Home from '../components/Home';
// import TempTest from '../components/Testings/TempTest';
// import ResultScreen from '../components/Testings/ResultScreen';
// import QuestionScreen from '../components/Testings/QuestionScreen';


const Stack = createStackNavigator();


const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
    </Stack.Navigator>
);


const RootNavigator = () => {
    const { user, loading } = useAuth();
    console.log(user);

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const Router = () => {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
};


export default Router

// {/* <HomeScreen /> */}
// {/* <HomeScreen /> */}
// {/* <ProfilePage /> */}
// {/* <EditProfile /> */}
// {/* <InputForm /> */}
// {/* <InterviewScreen /> */}
// {/* <PremiumScreen /> */}
// {/* <Question /> */}
// {/* <ResultScreen1 /> */}
// {/* <LoginScreen /> */}
// {/* <SignupScreen /> */}

// {/* <TempTest /> */}
// {/* <VoiceTest /> */}


// Deprecated
// {/* <Home /> */}
// {/* <ResultScreen /> */}
// {/* <QuestionScreen /> */}