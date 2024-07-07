import React, { useState, useEffect, useRef } from 'react';
import { Animated, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const InterviewScreen = () => {
    const [intStart, setIntStart] = useState(false);
    const [facing, setFacing] = useState('front');
    const [permission, requestPermission] = useCameraPermissions();
    const blinkAnim = useRef(new Animated.Value(0)).current;


    if (!permission) {
        // Camera permissions are still loading.
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Loading...</Text>
        </View>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const toggleMic = () => {
        setIntStart(!intStart);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={[styles.cardCreate, { borderColor: intStart ? '#ff0200a8' : '#007bff' }]}>
                    {(!intStart) ? (<Text style={styles.cardText}>Let's Start</Text>) : (
                        <CameraView style={styles.camera} facing={facing}>
                            <Text style={[styles.cameraText]}>
                                Interview is in progress...
                            </Text>
                        </CameraView>
                    )}
                </View>
                <TouchableOpacity style={intStart ? styles.redmicButton : styles.micButton}>
                    <Icon name={intStart ? 'microphone' : 'microphone-slash'} size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMic} style={[styles.startButton, { backgroundColor: intStart ? '#ff0200a8' : '#007bff' }]}>
                    <Text style={[styles.startButtonText]}>{intStart ? 'Stop Interview' : 'Start Interview'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );



};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    cardCreate: {
        width: '85%',
        height: 400,
        margin: 8,
        backgroundColor: '#d1e7fd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#007bff',
    },
    camera: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        overflow: 'hidden'
    },
    cameraText: {
        fontSize: 20,
        color: '#fff',
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center', // Center the text horizontally
        textAlign: 'center', // Ensure the text is centered
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    createText: {
        fontSize: 48,
        color: '#007bff',
    },
    cardText: {
        fontSize: 18,
        color: '#007bff',
    },
    micButton: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    redmicButton: {
        backgroundColor: '#ff0200a8',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    startButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default InterviewScreen;
