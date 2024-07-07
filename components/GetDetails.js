import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import TagPicker from './TagPicker';

const InputForm = () => {
    const [jobRole, setJobRole] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [scaleValue] = useState(new Animated.Value(1));

    const handleFormSubmit = () => {
        console.log('Submitted:', { jobRole, jobDescription, yearsOfExperience, selectedColor });
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

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={[styles.input, styles.neumorphic]}
                placeholder="Job Role"
                value={jobRole}
                onChangeText={text => setJobRole(text)}
            />
            <TextInput
                style={[styles.input, styles.textArea, styles.neumorphic]}
                placeholder="Job Description"
                multiline
                numberOfLines={4}
                value={jobDescription}
                onChangeText={text => setJobDescription(text)}
            />
            <TextInput
                style={[styles.input, styles.neumorphic]}
                placeholder="Years of Experience (Number only)"
                keyboardType="numeric"
                value={yearsOfExperience}
                onChangeText={text => setYearsOfExperience(text)}
            />
            <TagPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <TouchableOpacity style={[styles.submitButton, styles.neumorphicButton]} onPress={animateButtonPress}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: '100%',
    },
    input: {
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    textArea: {
        height: 100,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',  // Light background color for better contrast
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
    neumorphic: {
        backgroundColor: '#f5f5f5',  // Ensure this matches the input background
        borderRadius: 10,
        shadowColor: '#A3B1C6',
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        paddingHorizontal: 10,
        borderWidth: 1,  // Adding border width for better visibility
        borderColor: '#E0E5EC',  // Border color for neumorphic effect
    },
});

export default InputForm;
