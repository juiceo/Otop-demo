import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import { Images, Metrics, Fonts, Colors } from '../Themes'
import { Header, Icon, Divider, Button, PricingCard, Badge } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash';

import MockService from '../Services/MockService'

const backAction = NavigationActions.navigate({
    routeName: 'LoanScreen',
    params: {}
});

export default class LoanSettingsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bankBalance: MockService.bankAccountBalance(),
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => this.props.navigation.dispatch(backAction)
                    }}
                    centerComponent={{ text: 'Your settings', style: { color: '#fff' } }}
                    backgroundColor={Colors.facebook}
                />
                <ScrollView style={{ flex: 1, padding: Metrics.baseMargin }}>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        height: 50,
        backgroundColor: 'white'
    },
    footerInner: {
        flex: 1,
        paddingHorizontal: Metrics.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
