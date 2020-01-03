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
const styles = StyleSheet.create({
    good: {
        color: 'green',
    },
    warning: {
        color: 'yellow',
    },
    bad: {
        color: 'red',
    },
})
class DatesLeftBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entryDate: this.props.entryDate,
            expireDate: this.props.expireDate,
            date: new Date(),
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>{this.state.entryDate}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(0,0,255, 0.5)',
                        height: 9,
                        marginHorizontal: '10%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgba(0,0,255, 1)',
                            height: 9,
                            width: '80%',
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default DatesLeftBar
