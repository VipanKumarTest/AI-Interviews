import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const questions = [
    'What is React Native?',
    'How does React Native differ from React?',
    'What are the advantages of using React Native for mobile app development?',
    'Can you explain the architecture of a React Native app?',
    'How does React Native handle navigation?',
    'What is the role of the React Native bridge?',
    'How do you style components in React Native?',
    'What are some common performance optimization techniques in React Native?',
    'How do you handle state management in React Native apps?',
    'What are the steps to deploy a React Native app to the App Store and Google Play Store?'
];

const QuestionCard = ({ question, index, onPress, navigation }) => {
    const [status, setStatus] = useState('unanswered');
    const animatedValue = new Animated.Value(0);

    const handlePress = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(0);
            onPress();
            setStatus(status === 'unanswered' ? 'correct' : 'unanswered');
            navigation.navigate('InterviewScreen')
        });
    };

    const animatedStyle = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.1, 1],
                }),
            },
        ],
    };

    return (
        <Animated.View style={[styles.questionContainer, animatedStyle]}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradientBackground}
            >
                <Text style={styles.questionText}>
                    {index + 1}. {question}
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.status}>
                        Status: {status === 'unanswered' ? '❓' : '✅'}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <AntDesign name="arrowright" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const QuestionScreen = (props) => {
    const [answeredCount, setAnsweredCount] = useState(0);
    const { navigation } = props;
    // console.log(props);

    const handleQuestionPress = () => {
        setAnsweredCount(prev => prev + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>React Native Quiz</Text>
            <Text style={styles.subHeader}>
                Answered: {answeredCount} / {questions.length}
            </Text>
            <ScrollView style={styles.scrollView}>
                {questions.map((question, index) => (
                    <QuestionCard
                        key={index}
                        question={question}
                        index={index}
                        onPress={() => navigation.navigate('InterviewScreen')}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    scrollView: {
        flex: 1,
    },
    questionContainer: {
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    gradientBackground: {
        padding: 20,
    },
    questionText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 15,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    status: {
        fontSize: 16,
        color: 'white',
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
    },
});

export default QuestionScreen;