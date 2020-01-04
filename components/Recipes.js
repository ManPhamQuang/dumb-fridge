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
import axios from 'axios'

export default function Recipes() {
    const [recipes, setRecipes] = useState([])

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
                        allRecipes {
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
                <TouchableOpacity onPress={() => this.handlePress(item)}>
                    <Card
                        containerStyle={{
                            padding: 0,
                            elevation: 5,
                        }}
                    >
                        <ListItem
                            roundAvatar
                            title={item.name}
                            leftAvatar={{
                                source: {
                                    uri: item.image.publicUrlTransformed,
                                },
                            }}
                        />
                    </Card>
                </TouchableOpacity>
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
