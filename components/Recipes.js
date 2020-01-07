import React, { useState, useEffect } from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useNavigation } from 'react-navigation-hooks'
import axios from 'axios'

export default function Recipes() {
    const [recipes, setRecipes] = useState([])
    const { navigate } = useNavigation()
    useEffect(() => {
        async function fetchRecipes() {
            const data = await axios({
                url: 'https://dumb-fridge.herokuapp.com/admin/api',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    query: `
                    query foodInFridge{
                        allRecipes(where: {ingredients_every: {quantity_gt: 0}} ) {
                            name,
                            id,
                            ingredients{
                                name,
                                image{
                                    publicUrlTransformed
                                    filename
                                },
                                quantity,
                                entryDate,
                                duration
                            },
                            image{
                                publicUrlTransformed
                                filename
                            }
                        }
                    }
                    `,
                },
            })
            setRecipes(data.data.data.allRecipes)
        }
        fetchRecipes()
    }, [])

    const RecipeCard = ({ item }) => {
        return (
            <View style={{ flex: 1 }} key={item.id}>
                <Card
                    containerStyle={{
                        padding: 0,
                        elevation: 5,
                    }}
                >
                    <ListItem
                        disabled={false}
                        disabledStyle={{ opacity: 0.5 }}
                        roundAvatar
                        title={item.name}
                        onPress={() => navigate('RecipeScreen')}
                        leftAvatar={{
                            source: {
                                uri: item.image.publicUrlTransformed,
                            },
                        }}
                    />
                </Card>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={recipes}
                renderItem={({ item }) => <RecipeCard item={item} />}
                keyExtractor={(item, index) => {
                    return item.id
                }}
                horizontal={false}
                numColumns={2}
            />
        </View>
    )
}
