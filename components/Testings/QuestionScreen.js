import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const questions = [
    'What is the capital of France?',
    'What is 2 + 2?',
    'Who wrote "To be, or not to be"?',
    'What is the boiling point of water?',
    'What is the largest planet in our solar system?'
];

const QuestionScreen = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {questions.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            selectedQuestion === index && styles.selectedButton
                        ]}
                        onPress={() => setSelectedQuestion(index)}
                    >
                        <Text style={styles.buttonText}>Question {index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {selectedQuestion !== null && (
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                        {questions[selectedQuestion]}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 10,
        rowGap: 5

    },
    button: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
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
});

export default QuestionScreen;
