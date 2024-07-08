import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AccordionItem = ({ item, isChild = false }) => {
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleExpand = () => {
        setExpanded(!expanded);
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: false
        }).start();
    };

    const rotateIcon = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return (
        <View style={[styles.accordionItem, isChild && styles.childItem]}>
            <TouchableOpacity style={styles.questionContainer} onPress={toggleExpand}>
                <Text style={[styles.questionText, expanded && styles.expandedText]}>{item.question}</Text>
                <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                    <MaterialIcons name="expand-more" size={24} color="#007AFF" />
                </Animated.View>
            </TouchableOpacity>

            {expanded && (
                <Animated.View style={[styles.answerContainer, { opacity: animation }]}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                    {item.children && item.children.map((child, index) => (
                        <AccordionItem
                            key={index}
                            item={child}
                            isChild={true}
                        />
                    ))}
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    accordionItem: {
        marginBottom: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        overflow: 'hidden',
    },
    childItem: {
        marginLeft: 20,
        borderLeftWidth: 2,
        borderLeftColor: '#007AFF',
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    expandedText: {
        color: '#007AFF',
    },
    answerContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
    },
    answerText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});

export default AccordionItem;