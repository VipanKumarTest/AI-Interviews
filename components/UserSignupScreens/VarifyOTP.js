import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const VerifyOTPScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const validatePassword = (pass) => {
        setPasswordValidation({
            minLength: pass.length >= 8,
            hasUpperCase: /[A-Z]/.test(pass),
            hasLowerCase: /[a-z]/.test(pass),
            hasNumber: /[0-9]/.test(pass),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
        });
    };

    const handleSavePassword = () => {
        if (otp.length !== 6) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (Object.values(passwordValidation).every(Boolean)) {
            // Implement your password reset logic here
            console.log('Password reset successful');
            navigation.navigate('LoginScreen');
        } else {
            alert('Please ensure all password requirements are met');
        }
    };

    const ValidationItem = ({ isValid, text }) => (
        <View style={styles.validationItem}>
            <MaterialCommunityIcons
                name={isValid ? "check-circle" : "close-circle"}
                size={16}
                color={isValid ? "#4CAF50" : "#F44336"}
            />
            <Text style={[styles.validationText, { color: isValid ? "#4CAF50" : "#F44336" }]}>{text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.formContainer}>
                        <Text style={styles.headerText}>Verify OTP</Text>
                        <Text style={styles.emailText}>{email}</Text>

                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="numeric" size={24} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter OTP"
                                placeholderTextColor="#999"
                                onChangeText={setOtp}
                                value={otp}
                                keyboardType="numeric"
                                maxLength={6}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor="#999"
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="lock-check-outline" size={24} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor="#999"
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.validationContainer}>
                            <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                            <ValidationItem isValid={passwordValidation.hasUpperCase} text="At least one uppercase letter" />
                            <ValidationItem isValid={passwordValidation.hasLowerCase} text="At least one lowercase letter" />
                            <ValidationItem isValid={passwordValidation.hasNumber} text="At least one number" />
                            <ValidationItem isValid={passwordValidation.hasSpecialChar} text="At least one special character" />
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
                            <LinearGradient
                                colors={['#4287f5', '#3b5998']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.saveButtonText}>Save Password</Text>
                                <MaterialCommunityIcons name="content-save" size={24} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
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
        marginBottom: 10,
    },
    emailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
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
    validationContainer: {
        width: '100%',
        marginBottom: 20,
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    validationText: {
        marginLeft: 5,
        fontSize: 14,
    },
    saveButton: {
        width: '100%',
    },
    buttonGradient: {
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default VerifyOTPScreen;