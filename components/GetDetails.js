import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TagPicker from './TagPicker';

const InputForm = ({ navigation }) => {
    const [jobRole, setJobRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [scaleValue] = useState(new Animated.Value(1));
    const [isFocused, setIsFocused] = useState({
        jobRole: false,
        jobDescription: false,
        yearsOfExperience: false,
    });

    const scrollViewRef = useRef();

    const handleFormSubmit = () => {
        console.log('Submitted:', { jobRole, jobDescription, yearsOfExperience, selectedColor });
        // Add your form submission logic here
    };

    const animateButtonPress = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(handleFormSubmit);
        navigation.navigate('QuestionsScreen')
    };

    const handleFocus = (field) => {
        setIsFocused(prev => ({ ...prev, [field]: true }));
        scrollViewRef.current.scrollTo({ y: 100, animated: true });
    };

    const handleBlur = (field) => {
        setIsFocused(prev => ({ ...prev, [field]: false }));
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Create Job Posting</Text>

                <View style={[styles.inputContainer, isFocused.jobRole && styles.inputContainerFocused]}>
                    <Ionicons name="briefcase-outline" size={24} color="#4c669f" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Job Role"
                        value={jobRole}
                        onChangeText={setJobRole}
                        onFocus={() => handleFocus('jobRole')}
                        onBlur={() => handleBlur('jobRole')}
                    />
                </View>

                <View style={[styles.inputContainer, isFocused.jobDescription && styles.inputContainerFocused]}>
                    <Ionicons name="document-text-outline" size={24} color="#4c669f" style={styles.icon} />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Job Description"
                        multiline
                        numberOfLines={4}
                        value={jobDescription}
                        onChangeText={setJobDescription}
                        onFocus={() => handleFocus('jobDescription')}
                        onBlur={() => handleBlur('jobDescription')}
                    />
                </View>

                <View style={[styles.inputContainer, isFocused.yearsOfExperience && styles.inputContainerFocused]}>
                    <Ionicons name="time-outline" size={24} color="#4c669f" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Years of Experience"
                        keyboardType="numeric"
                        value={yearsOfExperience}
                        onChangeText={setYearsOfExperience}
                        onFocus={() => handleFocus('yearsOfExperience')}
                        onBlur={() => handleBlur('yearsOfExperience')}
                    />
                </View>

                <TagPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />

                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <TouchableOpacity onPress={animateButtonPress}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4c669f',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    inputContainerFocused: {
        borderColor: '#4c669f',
        borderWidth: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InputForm;