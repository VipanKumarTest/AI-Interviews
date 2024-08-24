import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
            navigation.navigate('InterviewScreen', { question });
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
                    {index + 1}. {question.question}
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

const QuestionScreen = ({ navigation, route }) => {
    const [questions, setQuestions] = useState([]);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (route.params && route.params.geminiData) {
            try {
                const parsedData = JSON.parse(route.params.geminiData);
                if (Array.isArray(parsedData)) {
                    setQuestions(parsedData);
                } else {
                    console.error("Parsed data is not an array:", parsedData);
                }
            } catch (error) {
                console.error("Error parsing geminiData:", error);
            }
        }
        setIsLoading(false);
    }, [route.params]);

    const handleNavigation = () => {
        navigation.navigate('ResultScreen', { totalQuestions: questions.length, answeredCount: answeredCount, questions: questions });
    };

    const handleQuestionPress = () => {
        setAnsweredCount(prev => prev + 1);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (questions.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No questions available.</Text>
            </View>
        );
    }

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
                        onPress={handleQuestionPress}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity onPress={handleNavigation}>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>Submit your response</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
        marginBottom: 30
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
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

export default QuestionScreen;