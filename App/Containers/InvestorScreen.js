import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import { Images, Metrics, Fonts, Colors } from '../Themes'
import { Header, Icon, Divider, Button, ListItem } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash';

import MockService from '../Services/MockService'

const backAction = NavigationActions.navigate({
    routeName: 'LaunchScreen',
    params: {}
});

const depositAction = NavigationActions.navigate({
    routeName: 'DepositScreen',
    params: {}
});

const withdrawAction = NavigationActions.navigate({
    routeName: 'WithdrawScreen',
    params: {}
});

export default class InvestorScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            investBalance: MockService.investAccountBalance(),
            linkedBank: MockService.getLinkedBank()
        };
    }

    linkBank(bank) {
        const accountNumber = 'FI39 3600 3433 1232 70'

        MockService.setLinkedBank({
            ...bank,
            accountNumber
        });

        this.setState({
            linkedBank: MockService.getLinkedBank()
        });
    }

    renderLinkableBanks() {
        if (this.state.linkedBank) {
            return null;
        }

        const banks = _.map(MockService.getLinkableBanks(), (bank) => {
            return (
                <ListItem
                    key={bank.id}
                    title={bank.name}
                    onPress={() => this.linkBank(bank)}
                />
            );
        });

        return (
            <View>
                <Text style={styles.sectionTitle}>{'Link a bank account to start investing:'}</Text>
                <Divider />
                {banks}
            </View>
        )
    }

    renderLinkedBank() {
        if (!this.state.linkedBank) {
            return null;
        }

        return (
            <View>
                <Text style={styles.sectionTitle}>{'Linked accounts'}</Text>
                <Divider />
                <ListItem
                    title={this.state.linkedBank.name}
                    subtitle={this.state.linkedBank.accountNumber}
                />
            </View>
        );
    }

    renderInvestmentAccount() {

        if (!this.state.linkedBank) {
            return null;
        }

        const account = MockService.investAccount();

        let total = 0;

        _.forOwn(account, (value, key) => {
            total += value;
        });

        const highPercent = total === 0 ? 0 : Math.round(account.high * 10000 / total) / 100;
        const midPercent = total === 0 ? 0 : Math.round(account.med * 10000 / total) / 100;
        const lowPercent = total === 0 ? 0 : Math.round(account.low * 10000 / total) / 100;


        return (
            <View>
                <Text style={styles.sectionTitle}>{'Your investment account'}</Text>
                <Divider />
                <ListItem
                    title={'Account Balance'}
                    subtitle={'$' + total}
                    hideChevron
                />
                <ListItem
                    title={'High Risk Investments'}
                    subtitle={'$' + account.high + ' (' + highPercent + '%)'}
                    rightIcon={{ name: 'trending-up', color: 'orange' }}

                />
                <ListItem
                    title={'Mid Risk Investments'}
                    subtitle={'$' + account.med + ' (' + midPercent + '%)'}
                    rightIcon={{ name: 'trending-up', color: 'green' }}

                />
                <ListItem
                    title={'Low Risk Investments'}
                    subtitle={'$' + account.low + ' (' + lowPercent + '%)'}
                    rightIcon={{ name: 'trending-up', color: 'lightblue' }}

                />
            </View>
        );
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
                    centerComponent={{ text: 'Investments', style: { color: '#fff' } }}
                    backgroundColor={Colors.facebook}
                />
                <ScrollView style={{ flex: 1 }}>
                    {this.renderLinkableBanks()}
                    {this.renderLinkedBank()}
                    {this.renderInvestmentAccount()}
                </ScrollView>
                <Divider />
                <View style={styles.bottom}>
                    <Button
                        borderRadius={3}
                        backgroundColor={Colors.facebook}
                        containerViewStyle={{ marginBottom: Metrics.baseMargin }}
                        icon={{ name: 'usd', type: 'font-awesome' }}
                        title='INVEST MONEY'
                        onPress={() => this.props.navigation.dispatch(depositAction)}
                    />

                    <Button
                        borderRadius={3}
                        disabled={this.state.investBalance === 0}
                        backgroundColor={Colors.ember}
                        containerViewStyle={{ marginBottom: Metrics.baseMargin }}
                        icon={{ name: 'sign-out', type: 'font-awesome' }}
                        title='WITHDRAW MONEY'
                        onPress={() => this.props.navigation.dispatch(withdrawAction)}
                    />

                </View>
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
    profitContainer: {
        padding: Metrics.baseMargin,
        flexDirection: 'column',
    },
    profitRow: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profitTitle: {
        ...Fonts.style.regular,
        color: 'black'
    },
    profitLabel: {
        ...Fonts.style.description,
        color: 'grey',
        marginLeft: Metrics.baseMargin,
    },
    profitValue: {
        ...Fonts.style.description,
        color: 'green',
    },
    bottom: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
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
