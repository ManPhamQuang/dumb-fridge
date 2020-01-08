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
    const [ingredients, setIngredients] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const { navigate } = useNavigation()
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
                        allRecipes{
                            name,
                            id,
                            ingredients{
                                id
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
        setRefreshing(false)
    }

    async function fetchIngredients() {
        const data = await axios({
            url: 'https://dumb-fridge.herokuapp.com/admin/api',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                query: `
                query foodInFridge{
                    allFoods(where: { quantity_gt: 0 } ){
                        name,
                        duration,
                        quantity,
                        entryDate,
                        id,
                        image{
                          publicUrlTransformed
                          filename
                        }
                    }
                }
            `,
            },
        })
        setIngredients(data.data.data.allFoods)
        setRefreshing(false)
    }

    useEffect(() => {
        fetchRecipes()
        fetchIngredients()
    }, [])

    const RecipeCard = ({ item }) => {
        let ingredients_needed = item.ingredients.map(
            ingredients => ingredients.name
        )
        let ingredients_available = ingredients.map(
            ingredient => ingredient.name
        )
        let checker = (arr, target) => target.every(v => arr.includes(v))
        if (checker(ingredients_available, ingredients_needed)) {
            console.log(`${item.name} have enough ingredients`)
        }
        const found = item.ingredients.some(r => ingredients.includes(r))
        // console.log(found)
        return (
            <View style={{ flex: 1 }} key={item.id}>
                <Card
                    containerStyle={{
                        padding: 0,
                        elevation: 5,
                    }}
                >
                    <ListItem
                        disabled={
                            !checker(ingredients_available, ingredients_needed)
                        }
                        disabledStyle={{ opacity: 0.5 }}
                        roundAvatar
                        title={item.name}
                        onPress={() =>
                            navigate('RecipeScreen', {
                                item: item,
                            })
                        }
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
                onRefresh={() => {
                    fetchRecipes()
                    fetchIngredients()
                    setRefreshing(true)
                }}
                refreshing={refreshing}
            />
        </View>
    )
}
