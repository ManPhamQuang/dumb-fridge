import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
import DatesLeftBar from '../components/datesLeftBar'

export default class FoodScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount(){
    //   console.log(this.props.navigation.getParam("item"))
    // }
    // return (
    //   <View style={styles.container}>
    //       <ScrollView
    //           style={styles.container}
    //           contentContainerStyle={styles.contentContainer}
    //       >
    //           <View style={styles.welcomeContainer}>
    //               <Foods/>
    //           </View>
    //       </ScrollView>
    //   </View>
    // );
    render() {
        const { navigation } = this.props
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        const item = navigation.getParam('item', 'not found')
        let entryDate = new Date(item.entryDate)
        // let expireDate = new Date(item.entryDate)
        let expireDate = new Date(
            entryDate.getTime() + 86400000 * item.duration
        )
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ListItem
                    leftAvatar={{
                        source: { uri: item.image.publicUrlTransformed },
                    }}
                    title={item.name}
                    subtitle={item.duration.toString()}
                    bottomDivider
                />
                <ListItem
                    title={`Entry date: ${entryDate.toLocaleDateString(
                        'en-US',
                        options
                    )}`}
                    bottomDivider
                />
                <ListItem
                    title={`Estimated duration: ${item.duration.toString()}`}
                    bottomDivider
                />
                <ListItem
                    title={`Estimated expiration date: ${expireDate.toLocaleDateString(
                        'en-US',
                        options
                    )}`}
                    bottomDivider
                />
                <DatesLeftBar
                    entryDate={entryDate.toString()}
                    expireDate={expireDate.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
})
