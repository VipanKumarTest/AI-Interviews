import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import image from '../assets/subscription-banner.jpg'

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.banner}
        source={image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop: 20,

  },
});

export default Banner;
