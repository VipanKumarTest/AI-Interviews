import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import authService from '../../appwrite/auth';

const Signup = ({ navigation }) => {
    const [credential, setCredential] = useState({ user: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleChange = (name, value) => {
        setCredential({ ...credential, [name]: value });
    };

    const signUpWithEmail = async () => {
        if (!credential.email || !credential.password) {
            shakeInput();
            return;
        }
        setLoading(true);
        try {
            const user = authService.createAccount(credential.email, credential.password, credential.user);
            if (user) {
                console.log(user);
                navigation.navigate('Home');
            } else {
                shakeInput();
            }
        } catch (error) {
            console.log('Register failed:', error);
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
                    <Text style={styles.signinText}>Welcome</Text>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="account-outline" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="User"
                            placeholderTextColor="#999"
                            onChangeText={(text) => handleChange('user', text)}
                            value={credential.user}
                            keyboardType="user"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            onChangeText={(text) => handleChange('email', text)}
                            value={credential.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            onChangeText={(text) => handleChange('password', text)}
                            value={credential.password}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.continueButton} onPress={signUpWithEmail}>
                        <LinearGradient
                            colors={['#4287f5', '#3b5998']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.continueButtonText}>Register</Text>
                            <MaterialCommunityIcons name="login" size={24} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.miniLogin} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.miniLoginText}>Already have an account? Sign in</Text>
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
    signinText: {
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
    signupButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#34D399',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    signupText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    miniLogin: {
        width: '100%',
        alignItems: 'center',
    },
    miniLoginText: {
        color: '#1D4ED8',
        fontSize: 16,
        fontWeight: '500',
    },
    continueButton: {
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
    continueButtonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default Signup;
