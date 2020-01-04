import React, { useState, useEffect } from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
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

    return (
        <View>
            {recipes.map((recipe, index) => (
                <Text key={index}>{recipe.name}</Text>
            ))}
        </View>
    )
}
