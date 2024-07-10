import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Hero({ navigation }) {
    return (

        <View>
            <TouchableOpacity onPress={() => navigation.navigate('about')}>
                <Text>go to about</Text>
            </TouchableOpacity>
        </View>

    );
}


