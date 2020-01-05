import React from 'react'
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
import DatesLeftBar from '../components/datesLeftBar'
export default class Foods extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { foodInFridge: [], refreshing: true }
    }
    componentDidMount() {
        console.log('hello world')
        // Get food
        this.fetchFood()
    }

    fetchFood = () => {
        axios({
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
            .then(res => {
                this.setState({
                    foodInFridge: res.data.data.allFoods,
                    refreshing: false,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handlePress = item => {
        this.props.navigation.navigate('FoodDetail', {
            item: item,
        })
    }
    render() {
        const FoodCard = ({ item }) => {
            let entryDate = new Date(item.entryDate)
            // let expireDate = new Date(item.entryDate)
            let expireDate = new Date(
                entryDate.getTime() + 86400000 * item.duration
            )
            // Food Card item
            return (
                <View style={{ flex: 1 }}>
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
                            <View style={{ marginBottom: 10 }}>
                                <DatesLeftBar
                                    entryDate={entryDate.toString()}
                                    expireDate={expireDate.toString()}
                                    duration={item.duration}
                                />
                            </View>
                        </Card>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.foodInFridge}
                    renderItem={({ item }) => <FoodCard item={item} />}
                    keyExtractor={(item, index) => {
                        return item.id
                    }}
                    onRefresh={() => {
                        this.setState(
                            {
                                refreshing: true,
                            },
                            () => this.fetchFood()
                        )
                    }}
                    refreshing={this.state.refreshing}
                    horizontal={false}
                    numColumns={2}
                />
            </View>
        )
    }
}
