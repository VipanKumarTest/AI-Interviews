import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Accuracy = ({ accuracy }) => {
    const animatedValue = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: accuracy,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);

    const width = animatedValue.interpolate({
        inputRange: [0, 10],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accuracy</Text>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.bar, { width }]} />
            </View>
            <View style={styles.scoreContainer}>
                <AntDesign name="star" size={24} color="#FFD700" />
                <Animated.Text style={styles.score}>
                    {animatedValue.interpolate({
                        inputRange: [0, 10],
                        outputRange: ['0.0', '10.0'],
                    })}
                    <Text style={styles.totalScore}> / 10</Text>
                </Animated.Text>
            </View>
        </View>
    );
};

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
        marginBottom: 10,
        color: '#333',
    },
    barContainer: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    totalScore: {
        fontSize: 18,
        color: '#666',
    },
});

export default Accuracy;