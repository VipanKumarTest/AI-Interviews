import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ExploreSection = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>
            <View style={styles.cardContainer}>
                {['Interview Types', 'Industries', 'Skills', 'Tips'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <FontAwesome5 name={getIconName(item)} size={24} color="#4facfe" />
                        <Text style={styles.cardText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const getIconName = (item) => {
    switch (item) {
        case 'Interview Types':
            return 'comments';
        case 'Industries':
            return 'building';
        case 'Skills':
            return 'chart-line';
        case 'Tips':
            return 'lightbulb';
        default:
            return 'question';
    }
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ExploreSection;