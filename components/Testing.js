import React, { useState, useEffect, useRef } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have react-native-vector-icons installed
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
    const subscriptionRef = useRef();

    useEffect(() => {
        return () => {
            stopSpeechRecognition();
            if (recording) {
                stopRecording();
            }
        };
    }, []);

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

            const subscription = Speech.recognize(
                {
                    language: 'en-US',
                    onRecordingStatus: ({ durationMillis, isFinal, transcription }) => {
                        if (isFinal) {
                            setRecognizedText(transcription);
                        } else {
                            setRecognizedText(transcription);
                        }
                    },
                },
                (result) => {
                    console.log(result);
                }
            );

            subscriptionRef.current = subscription;
        } catch (err) {
            console.error('Failed to start speech recognition', err);
        }
    }

    function stopSpeechRecognition() {
        if (subscriptionRef.current) {
            subscriptionRef.current.remove();
            setRecognizedText('');
        }
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
                <Button onPress={requestPermission} title="grant permission" />
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
        <ScrollView>
            <View style={styles.container}>
                <View style={[styles.cardCreate, { borderColor: intStart ? '#ff0200a8' : '#007bff' }]}>
                    {!intStart ? (
                        <Text style={styles.cardText}>Let's Start</Text>
                    ) : (
                        <CameraView style={styles.camera} type={facing}>
                            <Text style={styles.cameraText}>Interview is in progress...</Text>
                        </CameraView>
                    )}
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={intStart ? styles.redmicButton : styles.micButton} onPress={toggleMic}>
                        <Icon name={intStart ? 'microphone' : 'microphone-slash'} size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleCameraFacing} style={styles.cameraToggleButton}>
                        <Icon name="refresh" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={toggleMic} style={[styles.startButton, { backgroundColor: intStart ? '#ff0200a8' : '#007bff' }]}>
                    <Text style={[styles.startButtonText]}>{intStart ? 'Stop Interview' : 'Start Interview'}</Text>
                </TouchableOpacity>
                <Text style={styles.recognizedText}>{recognizedText}</Text>
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
    noteContainer: {
        width: '100%',
        padding: 10,
        paddingTop: 15,
        paddingBottom: 25,
        backgroundColor: '#FEF9C2',
        borderWidth: 1,
        borderColor: '#F1AF03',
        borderRadius: 10
    },
    note: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 6
    },
    noteText: {
        color: "#F1AF03",
    },
    iconNote: {
        flexDirection: 'row',
        marginBottom: 6
    },
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
    },
    cameraText: {
        fontSize: 20,
        color: '#fff',
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center',
        textAlign: 'center',
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        marginBottom: 20,
    },
    micButton: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redmicButton: {
        backgroundColor: '#ff0200a8',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraToggleButton: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
    recognizedText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default InterviewScreen;
