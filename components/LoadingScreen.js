import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoadingScreen = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        spinAnimation.start();

        return () => spinAnimation.stop();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.content}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <MaterialCommunityIcons name="loading" size={80} color="#fff" />
                </Animated.View>
                <Text style={styles.loadingText}>Loading</Text>
                <View style={styles.dotsContainer}>
                    {[0, 1, 2].map((i) => (
                        <AnimatedDot key={i} delay={i * 300} />
                    ))}
                </View>
            </View>
        </LinearGradient>
    );
};

const AnimatedDot = ({ delay }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const scaleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.ease,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ])
        );
        scaleAnimation.start();

        return () => scaleAnimation.stop();
    }, []);

    return (
        <Animated.View
            style={[
                styles.dot,
                {
                    transform: [{ scale: scaleValue }],
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});

export default LoadingScreen;