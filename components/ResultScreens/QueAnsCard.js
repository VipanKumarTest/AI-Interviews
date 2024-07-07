import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const QueAnsCard = ({ title, color, DATA }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handlePress = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <View>
            <Text style={[styles.subHeaderText, { color: color }]}>{title}</Text>
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
        </View>
    )
}

export default QueAnsCard;

const styles = StyleSheet.create({
    subHeaderText: {
        fontSize: 20,
        paddingLeft: 25,
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
})