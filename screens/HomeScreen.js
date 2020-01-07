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

import { MonoText } from '../components/StyledText'
import Foods from '../components/Foods'
import sendExpo from '../components/sendExpo'
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        sendExpo()
    }
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
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                    backgroundColor: '#fff',
                }}
            >
                <Foods navigation={this.props.navigation} />
            </View>
        )
    }
}

HomeScreen.navigationOptions = {
    title: 'Home',
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
