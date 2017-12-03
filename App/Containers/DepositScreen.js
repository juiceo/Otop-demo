import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet, ActivityIndicator } from 'react-native'
import { Images, Metrics, Fonts, Colors } from '../Themes'
import { Header, Icon, Divider, Button, Slider, ButtonGroup } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash';

import MockService from '../Services/MockService'

const backAction = NavigationActions.navigate({
    routeName: 'InvestorScreen',
    params: {}
});

const MONTHLY_BUTTONS = ['$20', '$50', '$100'];
const MONTHLY_AMOUNTS = [20, 50, 100];

const RISK_PROFILES = [
    MockService.RISK_LOW,
    MockService.RISK_MED,
    MockService.RISK_HIGH
];

export default class DepositScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            investAmount: 100,
            riskProfile: MockService.RISK_LOW,
            loading: false
        };

        this.changeRisk = this.changeRisk.bind(this);
    }


    changeRisk(index) {
        this.setState({
            riskProfile: RISK_PROFILES[index]
        });
    }

    confirm() {
        MockService.investMoney(this.state.investAmount, this.state.riskProfile);

        this.setState({
            loading: true
        });

        setTimeout(function () {
            this.props.navigation.dispatch(backAction);
        }.bind(this), 2000);
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: () => this.props.navigation.dispatch(backAction)
                    }}
                    centerComponent={{ text: 'Invest Money', style: { color: '#fff' } }}
                    backgroundColor={Colors.facebook}
                />
                <ScrollView style={styles.halfContainer}>
                    <Text style={styles.sectionTitle}>{'Amount to invest: $' + this.state.investAmount}</Text>
                    <Slider
                        value={this.state.oneTimeAmount}
                        onValueChange={(investAmount) => this.setState({ investAmount })}
                        minimumValue={0}
                        maximumValue={1000}
                        thumbTintColor={Colors.facebook}
                        step={1}
                    />
                    <Text style={styles.sectionTitle}>{'Risk profile: ' + this.state.riskProfile.name}</Text>
                    <ButtonGroup
                        onPress={this.changeRisk}
                        selectedIndex={RISK_PROFILES.indexOf(this.state.riskProfile)}
                        buttons={_.map(RISK_PROFILES, 'name')}
                    />
                    <Text style={styles.sectionDescription}>{this.state.riskProfile.description}</Text>
                </ScrollView>
                <Button
                    disabled={this.state.oneTimeAmount === 0}
                    backgroundColor={Colors.facebook}
                    containerViewStyle={{ padding: Metrics.baseMargin }}
                    buttonStyle={{ height: 60 }}
                    large
                    icon={this.state.loading ? null : { name: 'check', type: 'font-awesome' }}
                    title={this.state.loading ? 'Confirming investment' : 'Confirm investment: $' + this.state.investAmount}
                    loading={this.state.loading}
                    onPress={() => this.confirm()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    halfContainer: {
        padding: Metrics.baseMargin
    },
    blockTitleContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blockTitle: {
        ...Fonts.style.normal,
        color: 'grey'
    },
    blockValue: {
        ...Fonts.style.normal,
        color: Colors.facebook
    },
    blockDescription: {
        paddingVertical: Metrics.baseMargin
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Metrics.baseMargin,
        paddingVertical: Metrics.baseMargin,
    },
    rowInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        marginLeft: Metrics.baseMargin
    },
    rowTitle: {
        ...Fonts.style.h6,
        color: 'black',
    },
    cashBalance: {
        ...Fonts.style.h6,
        color: 'green',
    },
    sectionTitle: {
        padding: Metrics.baseMargin,
        fontSize: Fonts.size.normal,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#eee'
    },
    sectionDescription: {
        ...Fonts.style.description,
        paddingTop: Metrics.baseMargin,
        textAlign: 'center'
    }
})
