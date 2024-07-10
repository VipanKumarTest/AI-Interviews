import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText }) => {
    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
            <TextInput
                style={styles.input}
                placeholder="Search interviews"
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#999"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginVertical: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
});

export default SearchBar;