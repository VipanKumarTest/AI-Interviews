import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TagPicker from './TagPicker';
import Loader from './Loaders/Loader';
import InterviewScript from './RawData/InterviewScript';
import geminiAI from '../gemini/config';

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
    const [geminiData, setGeminiData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const scrollViewRef = useRef();

    const handleFormSubmit = async () => {
        console.log('Submitted:', { jobRole, jobDescription, yearsOfExperience, selectedColor });
        const interviewScriptData = InterviewScript(jobRole, jobDescription, yearsOfExperience);
        setIsLoading(true);
        try {
            const data = await geminiAI.run(interviewScriptData);
            const stringifiedData = JSON.stringify(data);
            const parsedData = JSON.parse(stringifiedData);
            setGeminiData(parsedData);
            console.log(geminiData);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
            navigation.navigate('QuestionsScreen', { geminiData: geminiData });
        }
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

                <Text style={styles.label}>Job Role</Text>
                <View style={[styles.inputContainer, isFocused.jobRole && styles.inputContainerFocused]}>
                    <Ionicons name="briefcase-outline" size={24} color="#4c669f" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. Full-Stack Developer"
                        value={jobRole}
                        onChangeText={setJobRole}
                        onFocus={() => handleFocus('jobRole')}
                        onBlur={() => handleBlur('jobRole')}
                    />
                </View>

                <Text style={styles.label}>Job Description</Text>
                <View style={[styles.inputContainer, isFocused.jobDescription && styles.inputContainerFocused]}>
                    <Ionicons name="document-text-outline" size={24} color="#4c669f" style={styles.icon} />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Ex. React js, Devops, MYSQL"
                        multiline
                        numberOfLines={4}
                        value={jobDescription}
                        onChangeText={setJobDescription}
                        onFocus={() => handleFocus('jobDescription')}
                        onBlur={() => handleBlur('jobDescription')}
                    />
                </View>

                <Text style={styles.label}>Years of Experience</Text>
                <View style={[styles.inputContainer, isFocused.yearsOfExperience && styles.inputContainerFocused]}>
                    <Ionicons name="time-outline" size={24} color="#4c669f" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Ex. 2"
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
            {isLoading && <Loader />}
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
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
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
        textAlignVertical: 'center',
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