import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const ColorButtons = ({ color, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: color, borderColor: isSelected ? '#000' : 'transparent' }]}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
    },
});

export default ColorButtons;
