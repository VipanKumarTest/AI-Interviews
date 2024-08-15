import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';


const InterviewScreen = () => {
    const [intStart, setIntStart] = useState(false);
    const [facing, setFacing] = useState('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = useState();
    const [audioPermission, requestAudioPermission] = Audio.usePermissions();
    const [recognizedText, setRecognizedText] = useState('');
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        return () => {
            stopSpeechRecognition();
            if (recording) {
                stopRecording();
            }
        };
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: intStart ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [intStart]);

    const cardScale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95],
    });

    async function startRecording() {
        try {
            if (audioPermission.status !== 'granted') {
                console.log('Requesting permission..');
                await requestAudioPermission();
            }

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }

    async function startSpeechRecognition() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Start listening for speech
            await Speech.start('en-US', {
                onSpeechResults: (result) => {
                    if (result.value && result.value.length > 0) {
                        setRecognizedText(result.value[0]);
                    }
                },
                onSpeechError: (error) => {
                    console.error('Speech recognition error:', error);
                }
            });
        } catch (err) {
            console.error('Failed to start speech recognition', err);
        }
    }

    function stopSpeechRecognition() {
        Speech.stop();
        setRecognizedText('');
    }

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const toggleMic = async () => {
        setIntStart(!intStart);
        if (intStart) {
            stopSpeechRecognition();
        } else {
            startSpeechRecognition();
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Animated.View style={[styles.cardCreate, { transform: [{ scale: cardScale }] }]}>
                    <LinearGradient
                        colors={intStart ? ['#ff0200a8', '#ff5733'] : ['#007bff', '#00c6ff']}
                        style={styles.gradientBackground}
                    >
                        {!intStart ? (
                            <Text style={styles.cardText}>Let's Start</Text>
                        ) : (
                            <CameraView style={styles.camera} type={facing}>
                                <Text style={styles.cameraText}>Interview is in progress...</Text>
                            </CameraView>
                        )}
                    </LinearGradient>
                </Animated.View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={toggleMic} style={styles.iconButton}>
                        <LinearGradient
                            colors={intStart ? ['#ff0200a8', '#ff5733'] : ['#007bff', '#00c6ff']}
                            style={styles.gradientButton}
                        >
                            <FontAwesome6 name={intStart ? 'microphone' : 'microphone-slash'} size={30} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleCameraFacing} style={styles.iconButton}>
                        <LinearGradient
                            colors={['#007bff', '#00c6ff']}
                            style={styles.gradientButton}
                        >
                            <FontAwesome6 name="camera-rotate" size={30} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={toggleMic} style={styles.startButton}>
                    <LinearGradient
                        colors={intStart ? ['#ff0200a8', '#ff5733'] : ['#007bff', '#00c6ff']}
                        style={styles.gradientBackground}
                    >
                        <Text style={styles.startButtonText}>{intStart ? 'Stop Interview' : 'Start Interview'}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.recognizedTextContainer}>
                    <Text style={styles.recognizedText}>{recognizedText}</Text>
                </View>

                <View style={styles.noteContainer}>
                    <View style={styles.iconNote}>
                        <FontAwesome6 name="lightbulb" size={20} color="#F1AF03" />
                        <Text style={[styles.noteText, styles.note]}>Note:</Text>
                    </View>
                    <Text style={styles.noteText}>Your video is not recorded. This feature is solely for your confidence, allowing you to view yourself.</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    cardCreate: {
        width: '90%',
        aspectRatio: 1,
        marginVertical: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    cameraText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 20,
    },
    iconButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        elevation: 5,
    },
    gradientButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        width: '90%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 5,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    recognizedTextContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        marginVertical: 20,
        width: '90%',
        elevation: 3,
    },
    recognizedText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    noteContainer: {
        width: '90%',
        padding: 15,
        backgroundColor: '#FEF9C2',
        borderWidth: 1,
        borderColor: '#F1AF03',
        borderRadius: 15,
        marginBottom: 20,
    },
    note: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    noteText: {
        color: "#F1AF03",
        fontSize: 14,
    },
    iconNote: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    permissionButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    permissionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default InterviewScreen;