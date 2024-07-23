import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ExploreSection = () => {
    const data = [
        { id: '1', title: 'Interview Types', icon: 'comments' },
        { id: '2', title: 'Industries', icon: 'building' },
        { id: '3', title: 'Skills', icon: 'chart-line' },
        { id: '4', title: 'Tips', icon: 'lightbulb' },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <FontAwesome5 name={item.icon} size={24} color="#3b5998" />
            <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.cardContainer}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
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
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        margin: 5,
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
