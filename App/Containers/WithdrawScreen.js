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

export default class DepositScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            withdrawAmounts: {
                high: 0,
                med: 0,
                low: 0
            },
            loading: false,
        };
    }


    confirmWithdraw(amount) {
        MockService.withdrawMoney(amount);

        this.setState({
            loadingText: 'Withdrawing $' + amount + ' from your investment account'
        });

        setTimeout(function () {
            this.props.navigation.dispatch(backAction);
        }.bind(this), 2000);
    }

    renderBlocks() {
        const blocks = [];

        _.forOwn(MockService.investAccount(), (value, key) => {
            if (value > 0) {

            }
        });
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
                    centerComponent={{ text: 'Withdraw Money', style: { color: '#fff' } }}
                    backgroundColor={Colors.facebook}
                />
                <ScrollView style={{ flex: 1 }}>
                    <Text style={styles.sectionTitle}>{'High-risk investments'}</Text>
                    <View style={{ flex: 1 }}>
                        <View style={styles.blockTitleContainer}>
                            <Text style={styles.blockTitle}>{'Withdraw Money: '}</Text>
                            <Text style={styles.blockValue}>{'$' + this.state.withdrawAmount.high}</Text>
                        </View>
                        <Slider
                            value={this.state.withdrawAmount.high}
                            onValueChange={(amount) => {
                                const withdrawAmounts = JSON.parse(JSON.stringify(this.state.withdrawAmounts))
                                withdrawAmounts.high = amount;

                                this.setState({ withdrawAmounts });
                            }}
                            minimumValue={0}
                            maximumValue={this.state.withdrawAmounts.high}
                            thumbTintColor={Colors.facebook}
                            step={1}
                        />
                    </View>
                    <Text style={styles.sectionTitle}>{'Mid-risk investments'}</Text>
                    <View style={{ flex: 1 }}>
                        <View style={styles.blockTitleContainer}>
                            <Text style={styles.blockTitle}>{'Withdraw Money: '}</Text>
                            <Text style={styles.blockValue}>{'$' + this.state.withdrawAmount.med}</Text>
                        </View>
                        <Slider
                            value={this.state.withdrawAmount.high}
                            onValueChange={(amount) => {
                                const withdrawAmounts = JSON.parse(JSON.stringify(this.state.withdrawAmounts))
                                withdrawAmounts.med = amount;

                                this.setState({ withdrawAmounts });
                            }}
                            minimumValue={0}
                            maximumValue={this.state.investAccount.med}
                            thumbTintColor={Colors.facebook}
                            step={1}
                        />
                    </View>
                    <Text style={styles.sectionTitle}>{'Low-risk investments'}</Text>
                    <View style={{ flex: 1 }}>
                        <View style={styles.blockTitleContainer}>
                            <Text style={styles.blockTitle}>{'Withdraw Money: '}</Text>
                            <Text style={styles.blockValue}>{'$' + this.state.withdrawAmount.low}</Text>
                        </View>
                        <Slider
                            value={this.state.withdrawAmount.low}
                            onValueChange={(amount) => {
                                const withdrawAmounts = JSON.parse(JSON.stringify(this.state.withdrawAmounts))
                                withdrawAmounts.low = amount;

                                this.setState({ withdrawAmounts });
                            }}
                            minimumValue={0}
                            maximumValue={this.state.investAccount.low}
                            thumbTintColor={Colors.facebook}
                            step={1}
                        />
                    </View>
                </ScrollView>
                {/* <View style={styles.bottomContainer}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.blockTitleContainer}>
                            <Text style={styles.blockTitle}>{'Withdraw Money: '}</Text>
                            <Text style={styles.blockValue}>{'$' + this.state.withdrawAmount}</Text>
                        </View>
                        <Slider
                            value={this.state.withdrawAmount}
                            onValueChange={(withdrawAmount) => this.setState({ withdrawAmount })}
                            minimumValue={0}
                            maximumValue={this.state.investBalance}
                            thumbTintColor={Colors.facebook}
                            step={1}
                        />
                    </View>
                    <Button
                        borderRadius={3}
                        disabled={this.state.withdrawAmount === 0}
                        backgroundColor={Colors.ember}
                        icon={{ name: 'check', type: 'font-awesome' }}
                        title={'Confirm withdraw: $' + this.state.withdrawAmount}
                        onPress={() => this.confirmWithdraw(this.state.withdrawAmount)}
                    />
                </View> */}
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
    bottomContainer: {
        padding: Metrics.baseMargin,
        flex: 1
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
    }
})
