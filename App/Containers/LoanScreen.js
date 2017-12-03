import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import { Images, Metrics, Fonts, Colors } from '../Themes'
import { Header, Icon, Divider, Button, PricingCard, Badge } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash';

import MockService from '../Services/MockService'

const backAction = NavigationActions.navigate({
    routeName: 'LaunchScreen',
    params: {}
});

const loanSettingsAction = NavigationActions.navigate({
    routeName: 'LoanSettingsScreen',
    params: {}
});

const LOAN_TYPES = [
    {
        color: '#4f9deb',
        title: 'Micro-loan',
        priceMin: 10,
        priceMax: 99,
        interestMin: 25,
        interestMax: 40,
        paybackMin: 7,
        paybackMax: 30,
        info: ['Under 30 day payback', 'Basic Support', '25-40% interest']
    },
    {
        color: Colors.facebook,
        title: 'Flex-loan',
        priceMin: 100,
        priceMax: 499,
        interestMin: 10,
        interestMax: 15,
        paybackMin: 30,
        paybackMax: 90,
        info: ['30-90 day payback', 'Basic Support', '10-15% interest']
    },
    {
        color: Colors.ember,
        title: 'Custom loan',
        priceMin: 499,
        priceMax: 3000,
        interestMin: 6,
        interestMax: 9,
        paybackMin: 30,
        paybackMax: 365,
        info: ['Flexible payback', 'Full Support', 'Lowest interest']
    }
];


export default class InvestorScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bankBalance: MockService.bankAccountBalance(),
        };
    }

    openLoanDetail(type) {

        MockService.setActiveLoanType(type);

        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'LoanDetailScreen',
                params: {}
            })
        );
    }

    renderCards() {
        return _.map(LOAN_TYPES, (type) => {
            return (
                <PricingCard
                    key={type.title}
                    color={type.color}
                    title={type.title}
                    price={'$' + type.priceMin + '-' + type.priceMax}
                    info={type.info}
                    button={{ title: 'SEE DETAILS' }}
                    onButtonPress={() => this.openLoanDetail(type)}
                />
            );
        });
    }

    renderFooter() {

        const loans = MockService.getLoans();

        if (loans.length === 0) {
            return null;
        }

        return (
            <View style={styles.footer}>
                <Divider />
                <View style={styles.footerInner}>
                    <Text style={{ fontWeight: 'bold' }}>{'Your outstanding loans'}</Text>
                    <Badge
                        value={loans.length}
                    />
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <Header
                        leftComponent={{
                            icon: 'arrow-back',
                            color: '#fff',
                            onPress: () => this.props.navigation.dispatch(backAction)
                        }}
                        centerComponent={{ text: 'Loans', style: { color: '#fff' } }}
                        rightComponent={{
                            icon: 'settings',
                            color: '#fff',
                            onPress: () => this.props.navigation.dispatch(loanSettingsAction)
                        }}
                        backgroundColor={Colors.facebook}
                    />
                    {this.renderCards()}
                </ScrollView>
                {this.renderFooter()}
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
