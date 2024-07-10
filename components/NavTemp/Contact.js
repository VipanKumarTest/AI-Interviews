import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Contact({ navigation }) {
    return (

        <View>
            <TouchableOpacity onPress={() => navigation.navigate('herooo')}>
                <Text>go to home</Text>
            </TouchableOpacity>
        </View>

    );
}


