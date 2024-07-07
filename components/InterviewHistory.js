import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const InterviewHistory = () => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Ionicons name="add-circle" size={24} color="black" />
                <Text style={styles.text}>Saved Interviews</Text>
            </View>
            <View style={styles.cardsContainer}>
                <TouchableOpacity style={styles.cardCreate}>
                    <Text style={styles.createText}>+</Text>
                    <Text style={styles.cardText}>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, { backgroundColor: '#ff6c3f6e' }]}>
                    <Text style={styles.cardLetter}>R</Text>
                    <Text style={styles.cardText}>React JS</Text>
                    <Text style={styles.cardDescription}>Description</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, { backgroundColor: '#536dfe75' }]}>
                    <Text style={styles.cardLetter}>F</Text>
                    <Text style={styles.cardText}>Front-End</Text>
                    <Text style={styles.cardDescription}>Description</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, { backgroundColor: '#7c4dff6e' }]}>
                    <Text style={styles.cardLetter}>S</Text>
                    <Text style={styles.cardText}>Software Developer</Text>
                    <Text style={styles.cardDescription}>Description</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        margin: 8
    },
    cardCreate: {
        width: '45%',
        height: 156,
        margin: 8,
        backgroundColor: '#d1e7fd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#007bff'
    },
    card: {
        width: '45%',
        height: 156,
        margin: 8,
        backgroundColor: '#B5FFC9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    createText: {
        fontSize: 48,
        color: '#007bff',
    },
    cardLetter: {
        fontSize: 48,
        color: '#000',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
    },

});


export default InterviewHistory