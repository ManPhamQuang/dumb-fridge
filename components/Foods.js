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
        // Get food
        axios({
          url: 'http://171.244.38.17:3000/admin/api',
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
    render(){

        const FoodCard = ({item}) => {
            // Food Card item
            return(
                    <Card containerStyle={{padding: 0}} >
                        <ListItem
                            roundAvatar
                            title={item.name}
                            leftAvatar={{
                                source: {uri: item.image.publicUrlTransformed}
                            }}
                        />
                    </Card>
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
                />
            </View>
        )
    }
}

