import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const questions = [
    'What is the capital of France?',
    'What is 2 + 2?',
    'Who wrote "To be, or not to be"?',
    'What is the boiling point of water?',
    'What is the largest planet in our solar system?'
];

const QuestionScreen = () => {

    return (
        <View style={styles.container}>
            {questions.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                        {question}
                    </Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.status}>Status: ✅ | ❌</Text>
                        <TouchableOpacity style={styles.button}>
                            <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    questionContainer: {
        marginTop: 20,
        margin: 15,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    questionText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 10,
        rowGap: 5

    },
    button: {
        padding: 20,
        backgroundColor: '#059669',
        borderRadius: 50,
        position: 'absolute',
        right: 0
    },
    selectedButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    status: {
        marginTop: 6
    },

});

export default QuestionScreen;
