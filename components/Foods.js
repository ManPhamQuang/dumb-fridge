import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import axios from 'axios';

export default class Foods extends React.Component{
    constructor(props) {
        super(props);
        this.state = { foodInFridge: [] };
      }
    componentDidMount(){
        console.log("hello world")
        // Get food
        axios({
          url: 'https://dumb-fridge.herokuapp.com/admin/api',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            query: `
                query foodInFridge{
                    allFoods{
                        name,
                        duration,
                        quantity,
                        id,
                        image{
                          publicUrlTransformed
                          filename
                        }
                    }
                }
            `
          }
        })
        .then(res => {
            this.setState({
              foodInFridge: res.data.data.allFoods
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handlePress = (item) => {
        this.props.navigation.navigate('FoodDetail', {
            item: item
        })
    }
    render(){

        const FoodCard = ({item}) => {
            // Food Card item
            return(
                   <View style={{flex: 1}}>
                       <TouchableOpacity onPress={() => this.handlePress(item)}>
                            <Card containerStyle={{padding: 0}} >
                                <ListItem
                                    roundAvatar
                                    title={item.name}
                                    leftAvatar={{
                                        source: {uri: item.image.publicUrlTransformed}
                                    }}
                                />
                            </Card>
                        </TouchableOpacity>
                   </View> 
                )
        }

        return(
            <View style={{flex: 1}}>
                <FlatList 
                    data={this.state.foodInFridge} 
                    renderItem={({ item }) => <FoodCard item={item}/>}
                    keyExtractor={(item, index) => {
                        return item.id
                    }}
                    horizontal={false}
                    numColumns={2}
                />
            </View>
        )
    }
}

