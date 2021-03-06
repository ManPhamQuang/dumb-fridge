import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import FoodScreen from '../screens/FoodScreen'
import RecipesScreen from '../screens/RecipesScreen'
import RecipeScreen from '../screens/RecipeScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
})

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        FoodDetail: FoodScreen,
    },
    config
)

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
}

HomeStack.path = ''

const RecipesStack = createStackNavigator(
    {
        Recipes: RecipesScreen,
        RecipeScreen: RecipeScreen,
    },
    config
)

RecipesStack.navigationOptions = {
    tabBarLabel: 'Recipes',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
}

RecipesStack.path = ''

// const SettingsStack = createStackNavigator(
//     {
//         Settings: SettingsScreen,
//     },
//     config
// )

// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Settings',
//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//         />
//     ),
// }

// SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    RecipesStack,
    // SettingsStack,
})

tabNavigator.path = ''

export default tabNavigator
