import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceTest = () => {
    const [result, setResult] = useState(""); // Corrected useState instead of useEffect
    const [error, setError] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const onSpeechStart = () => setIsRecording(true);
        const onSpeechEnd = () => setIsRecording(false);
        const onSpeechError = (err) => setError(err.error);
        const onSpeechResults = (result) => setResult(result.value[0]);

        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startRecording = async () => {
        try {
            await Voice.start('en-US');
            setError(""); // Clear previous errors
        } catch (err) {
            setError(err.message); // Use err.message to get error string
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
        } catch (err) {
            setError(err.message); // Use err.message to get error string
        }
    };

    return (
        <View style={{ alignItems: 'center', margin: 20 }}>
            <Text style={{ fontSize: 20, color: 'green', marginBottom: 20 }}>
                Voice Test
            </Text>
            <Text>{result}</Text>
            <Text>{error}</Text>
            <TouchableOpacity style={{ marginTop: 30 }} onPress={isRecording ? stopRecording : startRecording}>
                <Text style={{ fontSize: 20, color: 'red' }}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VoiceTest;
