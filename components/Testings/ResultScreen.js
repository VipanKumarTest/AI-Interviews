import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

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

const AccordionItem = ({ item, expanded, onPress, isChild }) => {
    return (
        <View style={[styles.accordionItem, isChild && styles.childItem]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.questionText, expanded && styles.expandedText]}>{item.question}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                    {item.children && item.children.map((child, index) => (
                        <AccordionItem
                            key={index}
                            item={child}
                            expanded={expanded}
                            onPress={onPress}
                            isChild={true}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const ResultScreen = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handlePress = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Result</Text>
            <Text style={styles.subHeaderText}>Perfect Answers by AI</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.questionContainer}>
                    {DATA.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            expanded={index === expandedIndex}
                            onPress={() => handlePress(index)}
                        />
                    ))}
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default ResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subHeaderText: {
        textAlign: "center",
        fontSize: 20,
        color: 'green'
    },
    scrollContainer: {
        padding: 10,
        paddingTop: 0
    },
    questionContainer: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 1,
        elevation: 1,
    },
    accordionItem: {
        marginBottom: 10,
    },
    childItem: {
        paddingLeft: 15,
        borderLeftWidth: 2,
        borderLeftColor: '#ddd',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    expandedText: {
        color: 'blue',
    },
    answerContainer: {
        paddingLeft: 10,
        marginTop: 10,
    },
    answerText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 15
    },
});
