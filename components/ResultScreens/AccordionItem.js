import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default AccordionItem = ({ item, expanded, onPress, isChild }) => {
    return (
        <View style={[styles.accordionItem, isChild && styles.childItem]}>
            <TouchableOpacity style={styles.questionContainer} onPress={onPress}>
                <Text style={[styles.questionText, expanded && styles.expandedText]}>{item.question}</Text>
                {item.children ? (!expanded ? <Feather name="chevron-down" size={20} color="black" /> : <Feather name="chevron-up" size={20} color="black" />) : <View></View>}
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

const styles = StyleSheet.create({
    accordionItem: {
        marginBottom: 10,
    },
    childItem: {
        paddingLeft: 15,
        borderLeftWidth: 2,
        borderLeftColor: '#ddd',
    },
    questionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5,
        width: '92%',
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
