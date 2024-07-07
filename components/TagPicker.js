import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorButtons from './ColorButtons';

const TagPicker = ({ selectedColor, onSelectColor }) => {
    const colors = [
        { label: 'Red', value: '#FF5733' },
        { label: 'Blue', value: '#337DFF' },
        { label: 'Green', value: '#33FF5D' },
        { label: 'Purple', value: '#8A33FF' },
    ];

    return (
        <View style={styles.tagPickerContainer}>
            <Text style={styles.label}>Tag Color:</Text>
            <View style={styles.colorButtonsContainer}>
                {colors.map((color, index) => (
                    <ColorButtons
                        key={index}
                        color={color.value}
                        isSelected={selectedColor === color.value}
                        onPress={() => onSelectColor(color.value)}
                    />
                ))}
            </View>
            {/* Display selected color */}
            <View style={[styles.colorPreview, { borderColor: selectedColor, backgroundColor: selectedColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    tagPickerContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    colorPreview: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        marginTop: 5,
    },
});

export default TagPicker;
