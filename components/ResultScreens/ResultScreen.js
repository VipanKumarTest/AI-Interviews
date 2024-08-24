import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import QueAnsCard from './QueAnsCard';
import Accuracy from './Accuracy';

const DATA = [
    {
        question: 'What is JavaScript?',
        answer: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is widely used for building interactive and dynamic websites.',
        children: [
            {
                question: 'What are the key features of React?',
                answer: 'React is a JavaScript library for building user interfaces. Its key features include virtual DOM, component-based architecture, JSX syntax for defining components, and uni-directional data flow.',
            },
            {
                question: 'What is the purpose of CSS?',
                answer: 'CSS (Cascading Style Sheets) is used to style the layout and appearance of HTML elements on web pages. It enables developers to control aspects such as colors, fonts, spacing, and positioning.',
            },
        ],
    },
    {
        question: 'What are the advantages of using Git for version control?',
        answer: 'Git allows multiple developers to collaborate on projects efficiently by tracking changes to files, facilitating branching and merging, and providing a distributed architecture. It also offers features like version history and easy rollback.',
        children: [
            {
                question: 'Explain the concept of responsive web design.',
                answer: 'Responsive web design is an approach to designing websites that ensures optimal viewing and interaction across various devices and screen sizes. It involves using flexible layouts, media queries, and fluid grids.',
                children: [
                    {
                        question: 'What is the difference between HTML and HTML5?',
                        answer: 'HTML5 is the latest version of HTML (Hypertext Markup Language), which introduces new elements, attributes, and APIs for building modern web applications. It also supports multimedia and offline capabilities.',
                    },
                ],
            },
        ],
    },
];

const ResultScreen1 = (props) => {
    console.log('props => ', props);
    const answeredCount = props.route.params.answeredCount;
    const totalQuestions = props.route.params.totalQuestions;
    const questions = props.route.params.questions;
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.headerText}>Your Results</Text>
                    <Accuracy answeredCount={answeredCount} totalQuestions={totalQuestions} />
                    <QueAnsCard passkey={1} title={'AI-Generated Answers'} color={'#4CAF50'} DATA={questions} />
                    <QueAnsCard passkey={2} title={'Your Answers'} color={'#FF5722'} DATA={questions} />
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    headerText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
});

export default ResultScreen1;