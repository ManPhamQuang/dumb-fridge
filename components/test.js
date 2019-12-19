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
        const query = `query foodInFridge{
                    allFridges{
                        name,
                        entryDate
                    }
                }`
        axios({
          url: 'http://171.244.38.17:3000/admin/api',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            query: `
                query foodInFridge{
                    allFridges{
                        name,
                        entryDate
                    }
                }
            `
          }
        })
        .then(res => {
            console.log(res.data.data.allFridges[0].name)
            this.setState({
              foodInFridge: res.data.data.allFridges
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
                      <Text key={index}>{food.name}</Text>
                    )
                })}
            </View>
        )
    }
}

