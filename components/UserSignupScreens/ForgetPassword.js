import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../appwrite/AuthProvider';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const { generateOtpService } = useAuth();
    const url = 'cloud.appwrite.io'

    const handleSendOTP = async () => {
        if (!email) {
            shakeInput();
            return;
        }
        setLoading(true);
        try {
            const data = await generateOtpService(email, url);
            console.log('Forget Pass -> ', data);
            navigation.navigate('VerifyOTPScreen', { email: email });
            console.log('Sending OTP to:', email);
            // Navigate to OTP verification screen or show success message
        } catch (error) {
            console.log('Failed to send OTP:', error);
            shakeInput();
        } finally {
            setLoading(false);
        }
    };

    const shakeInput = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}
            >
                <Animated.View style={[styles.formContainer, { transform: [{ translateX: shakeAnimation }] }]}>
                    <Text style={styles.headerText}>Forgot Password</Text>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#999"
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.sendOTPButton} onPress={handleSendOTP}>
                        <LinearGradient
                            colors={['#4287f5', '#3b5998']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.sendOTPButtonText}>Send OTP</Text>
                            <MaterialCommunityIcons name="email-send" size={24} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.goBack()}>
                        <Text style={styles.backToLoginText}>Back to Login</Text>
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#333',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
    },
    sendOTPButton: {
        width: '100%',
        marginBottom: 20,
    },
    buttonGradient: {
        padding: 15,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 5
    },
    sendOTPButtonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    backToLogin: {
        width: '100%',
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#1D4ED8',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ForgotPassword;