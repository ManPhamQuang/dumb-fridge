import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import axios from 'axios';
const GET_TODOS = `
    query GetTodos {
      allTodos {
        name
        id
      }
    }
  `;

export default class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state = { foodInFridge: [] };
      }
    componentDidMount(){
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
            console.log(res.data.data.allFoods[0].name)
            this.setState({
              foodInFridge: res.data.data.allFoods
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        return(
            <View>
                {this.state.foodInFridge.map((food, index) => {
                    return(
                        <View key={index}>
                            <Text key={index}>{food.name}</Text>
                            <Image
                                style={{width: 50, height: 50}} 
                                source={{uri: food.image.publicUrlTransformed}}
                            />

                        </View>

                    )
                })}
            </View>
        )
    }
}

