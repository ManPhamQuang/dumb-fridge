import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ExpoLinksView } from '@expo/samples'
import Recipes from '../components/Recipes'
export default function RecipesScreen() {
    return (
        <View style={styles.container}>
            {/**
             * Go ahead and delete ExpoLinksView and replace it with your content;
             * we just wanted to provide you with some helpful links.
             */}
            <Recipes />
        </View>
    )
}

RecipesScreen.navigationOptions = {
    title: 'Recipes',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        paddingBottom: 15,
    },
})
