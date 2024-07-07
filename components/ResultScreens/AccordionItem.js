import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem = ({ item, isChild }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={[styles.accordionItem, isChild && styles.childItem]}>
            <TouchableOpacity style={styles.questionContainer} onPress={toggleExpand}>
                <Text style={[styles.questionText, expanded && styles.expandedText]}>{item.question}</Text>
                {item.children ? (
                    !expanded ? <Feather name="chevron-down" size={20} color="black" /> : <Feather name="chevron-up" size={20} color="black" />
                ) : <View />}
            </TouchableOpacity>

            {expanded && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                    {item.children && item.children.map((child, index) => (
                        <AccordionItem
                            key={index}
                            item={child}
                            isChild={true}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default AccordionItem;

const styles = StyleSheet.create({
    accordionItem: {
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    childItem: {
        paddingLeft: 15,
        borderLeftWidth: 2,
        borderLeftColor: '#ddd',
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
        width: '90%',
    },
    expandedText: {
        color: '#007BFF',
    },
    answerContainer: {
        paddingLeft: 10,
        marginTop: 10,
    },
    answerText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 15,
    },
});
