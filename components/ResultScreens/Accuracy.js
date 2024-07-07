import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Accuracy = ({ accuracy }) => {
    return (
        <View>
            <Text style={styles.container}>Accuracy : {accuracy}/10⭐</Text>
        </View>
    )
}

export default Accuracy;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 25,
        fontSize: 25,
        marginBottom: 15,
    }
})