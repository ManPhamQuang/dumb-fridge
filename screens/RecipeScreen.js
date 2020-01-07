import React, { useState } from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'

export default function RecipeScreen({ navigation }) {
    const item = navigation.getParam('item')
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ListItem
                leftAvatar={{
                    source: { uri: item.image.publicUrlTransformed },
                }}
                title={item.name}
                bottomDivider
            />
            <ListItem title="Ingredients needed for this recipe:" />
            <Divider style={{ height: 15, backgroundColor: 'white' }} />
            {item.ingredients.map(ingredient => {
                return (
                    <ListItem
                        key={ingredient.id}
                        leftAvatar={{
                            source: {
                                uri: ingredient.image.publicUrlTransformed,
                            },
                        }}
                        title={ingredient.name}
                        topDivider
                        bottomDivider
                    />
                )
            })}
        </View>
    )
}
