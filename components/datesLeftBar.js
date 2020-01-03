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
        let entryDate = new Date(this.props.entryDate)
        let date = new Date()
        let daysPassed = Math.round((date - entryDate) / 86400000)
        let daysPercent = 100 - (daysPassed / this.props.duration) * 100
        let parentContainer
        let childContainer
        if (daysPercent > 80) {
            parentContainer = '#CFE5C5'
            childContainer = '#93C47D'
        } else if (daysPercent > 40) {
            parentContainer = '#FFEEBA'
            childContainer = '#FFD966'
        } else {
            parentContainer = '#E99F9E'
            childContainer = '#CF2A27'
        }
        this.state = {
            daysPercent: daysPercent,
            parentContainer: parentContainer,
            childContainer: childContainer,
        }
    }
    calculateDaysPassed = () => {
        let entryDate = new Date(this.props.entryDate)
        let date = new Date()
        let daysPassed = Math.round((date - entryDate) / 86400000)
        let daysPercent = 100 - (daysPassed / this.props.duration) * 100
        return daysPercent
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>{this.state.entryDate}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: this.state.parentContainer,
                        height: 5,
                        marginHorizontal: '10%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: this.state.childContainer,
                            height: 5,
                            width: `${this.state.daysPercent}%`,
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default DatesLeftBar
