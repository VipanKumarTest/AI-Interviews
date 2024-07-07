import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const { width } = Dimensions.get('window');

const PremiumScreen = () => {
    return (
        <View style={styles.superContainer}>
            <Image source={require('../assets/bg.png')} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.title}>Upgrade to Premium</Text>
                <View style={styles.features}>
                    <Text style={styles.featureText}><Icon name="check" size={20} color="#4CAF50" /> Unlimited AI Generations</Text>
                    <Text style={styles.featureText}><Icon name="check" size={20} color="#4CAF50" /> Unlimited Pro Sketches</Text>
                    <Text style={styles.featureText}><Icon name="check" size={20} color="#4CAF50" /> Ads Free!</Text>
                </View>
                <View style={styles.pricing}>
                    <TouchableOpacity style={styles.priceOption}>
                        <Text style={styles.priceText}>Monthly</Text>
                        <Text style={styles.priceAmount}>$32/Month</Text>
                        <Text style={styles.popularTag}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.priceOption}>
                        <Text style={styles.priceText}>Yearly</Text>
                        <Text style={styles.priceAmount}>$90/Month</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
                <View style={styles.bottomPolicy}>
                    <TouchableOpacity style={styles.restoreButton}>
                        <Text style={styles.restoreButtonText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>|</Text>
                    <TouchableOpacity style={styles.restoreButton}>
                        <Text style={styles.restoreButtonText}>Restore Purchase</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    superContainer: {
        flex: 1,
        position: 'relative',
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: "flex-end",
        position: 'relative',
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: '100%',
        marginBottom: 20,
        position: 'absolute'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    features: {
        width: '100%',
        marginBottom: 20,
    },
    featureText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    pricing: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    priceOption: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        width: width * 0.4,
        borderColor: '#ff3a00b3',
        borderWidth: 1
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceAmount: {
        fontSize: 16,
        color: '#888',
    },
    popularTag: {
        fontSize: 14,
        color: '#ffcc00',
    },
    continueButton: {
        backgroundColor: '#4287f5',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    continueButtonText: {
        fontSize: 18,
        color: '#ffffff',
    },
    bottomPolicy: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    restoreButton: {
        padding: 10,
        alignItems: 'center',
    },
    restoreButtonText: {
        fontSize: 16,
        color: '#4287f5',
    },
});

export default PremiumScreen;
