import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PremiumScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState('monthly');
    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const renderFeature = (icon, text) => (
        <Animated.View style={[styles.featureItem, { opacity: fadeAnim }]}>
            <Icon name={icon} size={24} color="#ffcc00" />
            <Text style={styles.featureText}>{text}</Text>
        </Animated.View>
    );

    return (
        // <LinearGradient colors={['#1a2a6c', '#b21f1f', '#fdbb2d']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Animated.Image
                source={require('../assets/bg.png')}
                style={[styles.image, { opacity: fadeAnim }]}
            />
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                Unlock Premium Features
            </Animated.Text>
            <View style={styles.features}>
                {renderFeature('magic', 'Unlimited AI Generations')}
                {renderFeature('pencil-alt', 'Unlimited Pro Sketches')}
                {renderFeature('ad', 'Ad-Free Experience')}
            </View>
            <View style={styles.pricing}>
                <TouchableOpacity
                    style={[styles.priceOption, selectedPlan === 'monthly' && styles.selectedPlan]}
                    onPress={() => setSelectedPlan('monthly')}
                >
                    <Text style={styles.priceText}>Monthly</Text>
                    <Text style={styles.priceAmount}>$32/month</Text>
                    {selectedPlan === 'monthly' && (
                        <View style={styles.popularTag}>
                            <Text style={styles.popularTagText}>Popular</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.priceOption, selectedPlan === 'yearly' && styles.selectedPlan]}
                    onPress={() => setSelectedPlan('yearly')}
                >
                    <Text style={styles.priceText}>Yearly</Text>
                    <Text style={styles.priceAmount}>$90/year</Text>
                    <Text style={styles.savings}>Save 50%</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.continueButton}>
                <LinearGradient
                    colors={['#4287f5', '#3b5998']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <Text style={styles.continueButtonText}>Upgrade Now</Text>
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.bottomPolicy}>
                <TouchableOpacity style={styles.policyButton}>
                    <Text style={styles.policyButtonText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.policyButton}>
                    <Text style={styles.policyButtonText}>Restore Purchase</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        // </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 20,
        position: 'absolute'

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white',
        textAlign: 'center',
    },
    features: {
        width: '100%',
        marginBottom: 30,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 15,
    },
    featureText: {
        fontSize: 18,
        marginLeft: 15,
        color: 'white',
    },
    pricing: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    priceOption: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: width * 0.4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
    },
    selectedPlan: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: '#4287f5',
        borderWidth: 2,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    priceAmount: {
        fontSize: 16,
        color: '#ddd',
    },
    popularTag: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#ffcc00',
        borderRadius: 10,
        padding: 5,
    },
    popularTagText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    savings: {
        fontSize: 14,
        color: '#10B981',
        marginTop: 5,
    },
    continueButton: {
        width: '100%',
        marginBottom: 20,
    },
    gradient: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    continueButtonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    bottomPolicy: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    policyButton: {
        padding: 10,
    },
    policyButtonText: {
        fontSize: 14,
        color: '#ddd',
        textDecorationLine: 'underline',
    },
});

export default PremiumScreen;