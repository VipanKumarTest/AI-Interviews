import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AccordionItem from './AccordionItem';

const QueAnsCard = ({ title, color, DATA }) => {
    // console.log(DATA);
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: color }]}>{title}</Text>
            <FlatList
                data={DATA}
                renderItem={({ item, index }) => (
                    <AccordionItem
                        key={index}
                        item={item}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default QueAnsCard;