import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import banner from '../assets/subscription-banner.jpg'

const HeroImage = () => {
    return (

        <Image source={banner} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: 150,
    }
})

export default HeroImage