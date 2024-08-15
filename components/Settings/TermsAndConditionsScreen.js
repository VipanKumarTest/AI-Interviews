import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';

const TermsAndConditionsScreen = () => {
    return (
        <ScrollView style={styles.scrollView}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Terms and Conditions</Text>
                </View>
            </LinearGradient>

            <View style={styles.container}>
                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.content}>
                    By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
                </Text>

                <Text style={styles.sectionTitle}>2. Use of the Application</Text>
                <Text style={styles.content}>
                    You agree to use this application only for purposes that are permitted by these Terms and any applicable law, regulation or generally accepted practices or guidelines in the relevant jurisdictions.
                </Text>

                <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
                <Text style={styles.content}>
                    Your use of the application is also subject to our Privacy Policy, which is incorporated into these Terms by reference.
                </Text>

                {/* Add more sections as needed */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    headerGradient: {
        height: 150,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4c669f',
        marginTop: 20,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        lineHeight: 24,
    },
});

export default TermsAndConditionsScreen;