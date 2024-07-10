import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function About({ navigation }) {
    return (

        <View>
            <TouchableOpacity onPress={() => navigation.navigate('contact')}>
                <Text>go to contact</Text>
            </TouchableOpacity>
        </View>

    );
}


