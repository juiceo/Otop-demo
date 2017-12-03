import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet, ActivityIndicator } from 'react-native'
import { Images, Metrics, Fonts, Colors } from '../Themes'
import { Header, Icon, Divider, Button, Slider } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { PropTypes } from 'prop-types'
import _ from 'lodash';

import MockService from '../Services/MockService'

const backAction = NavigationActions.navigate({
    routeName: 'LoanScreen',
    params: {}
});

const LOAN_TYPES = [
    {
        color: '#4f9deb',
        title: 'Micro-loan',
        priceMin: 10,
        priceMax: 99,
        interestMin: 25,
        interestMax: 30,
        paybackMin: 7,
        paybackMax: 30,
        info: ['Under 30 day payback', 'Basic Support', '25-30% interest']
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


export default class LoanDetailScreen extends Component {

    constructor(props) {
        super(props);

        const type = MockService.getActiveLoanType();
        const loanAmount = Math.round((type.priceMax + type.priceMin) / 2);
        const loanPeriod = Math.round((type.paybackMax + type.paybackMin) / 2);

        this.state = {
            type,
            loanAmount,
            loanPeriod,
            interestRate: this.calculateInterest(type, loanAmount, loanPeriod)
        };

        this.onBackPress = this.onBackPress.bind(this);
        this.updateLoanAmount = this.updateLoanAmount.bind(this)
        this.updateLoanPeriod = this.updateLoanPeriod.bind(this)
        this.calculatePaybackAmount = this.calculatePaybackAmount.bind(this)
    }

    confirmLoan() {
        MockService.addLoan(
            this.state.loanAmount,
            this.getDueDate(),
            this.calculatePaybackAmount(),
            this.state.interestRate
        );

        this.setState({
            loadingText: 'Confirming loan...'
        });

        setTimeout(function () {
            this.props.navigation.dispatch(backAction);
        }.bind(this), 2000);
    }

    updateLoanAmount(loanAmount) {
        this.setState({
            loanAmount,
            interestRate: this.calculateInterest(this.state.type, loanAmount, this.state.loanPeriod)
        })
    }

    updateLoanPeriod(loanPeriod) {
        this.setState({
            loanPeriod,
            interestRate: this.calculateInterest(this.state.type, this.state.loanAmount, loanPeriod)
        })
    }

    onBackPress() {
        MockService.setActiveLoanType(null);
        this.props.navigation.dispatch(backAction);
    }

    calculatePaybackAmount() {
        const factor = 1 + (this.state.loanPeriod * this.state.interestRate / 365 / 100)

        return Math.round(100 * factor * this.state.loanAmount) / 100;
    }

    calculateInterest(type, amount, period) {
        const diff = type.interestMax - type.interestMin;

        const priceRange = type.priceMax - type.priceMin;
        const periodRange = type.paybackMax - type.paybackMin;

        const amountP = amount - type.priceMin;
        const periodP = period - type.paybackMin;

        const amountFactor = 1 - (amountP / priceRange)
        const periodFactor = 1 - (periodP / periodRange)

        const totalFactor = (amountFactor + periodFactor) / 2;

        return Math.round(100 * (type.interestMin + totalFactor * diff)) / 100;
    }

    getDueDate() {
        const now = new Date();

        let due = new Date(now.getTime() + (this.state.loanPeriod) * 1000 * 60 * 60 * 24);

        return due.getDate() + '.' + (due.getMonth() + 1) + '.' + due.getFullYear();
    }

    renderLoading() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: this.onBackPress
                    }}
                    centerComponent={{ text: this.state.type.title, style: { color: '#fff' } }}
                    backgroundColor={Colors.facebook}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                    <Text>{this.state.loadingText}</Text>
                </View>
            </View>
        );
    }

    render() {

        if (this.state.loadingText) {
            return this.renderLoading();
        }

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        color: '#fff',
                        onPress: this.onBackPress
                    }}
                    centerComponent={{ text: this.state.type.title, style: { color: '#fff' } }}
                    backgroundColor={Colors.facebook}
                />
                <Text style={styles.sectionLabel}>{'Loan amount: $' + this.state.loanAmount}</Text>
                <View style={{ padding: Metrics.baseMargin, paddingTop: Metrics.doubleBaseMargin, position: 'relative' }}>
                    <View style={styles.detailRow}>
                        <Text style={styles.value}>{this.state.type.priceMin}</Text>
                        <Text style={styles.value}>{this.state.type.priceMax}</Text>
                    </View>
                    <Slider
                        value={this.state.loanAmount}
                        onValueChange={this.updateLoanAmount}
                        minimumValue={this.state.type.priceMin}
                        maximumValue={this.state.type.priceMax}
                        thumbTintColor={Colors.facebook}
                        step={1}
                    />
                </View>
                <Divider />
                <Text style={styles.sectionLabel}>{'Loan period: ' + this.state.loanPeriod + ' days'}</Text>
                <View style={{ padding: Metrics.baseMargin, paddingTop: Metrics.doubleBaseMargin, position: 'relative' }}>
                    <View style={styles.detailRow}>
                        <Text style={styles.value}>{this.state.type.paybackMin + ' days'}</Text>
                        <Text style={styles.value}>{this.state.type.paybackMax + ' days'}</Text>
                    </View>
                    <Slider
                        value={this.state.loanPeriod}
                        onValueChange={this.updateLoanPeriod}
                        minimumValue={this.state.type.paybackMin}
                        maximumValue={this.state.type.paybackMax}
                        thumbTintColor={Colors.facebook}
                        step={1}
                    />
                </View>
                <Divider />

                <View style={styles.bottomWrapper}>
                    <Text style={styles.amountDue}>{'Amount due on ' + this.getDueDate()}</Text>
                    <Text style={styles.paybackText}>{'$' + this.calculatePaybackAmount()}</Text>
                    <Text style={styles.interestText}>{this.state.interestRate + ' % p.a.'}</Text>
                </View>
                <Button
                    large
                    backgroundColor={Colors.facebook}
                    containerViewStyle={{ marginBottom: Metrics.baseMargin }}
                    icon={{ name: 'check', type: 'font-awesome' }}
                    title={'Confirm loan'}
                    onPress={() => this.confirmLoan()}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    detailRow: {
        padding: Metrics.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
    sectionLabel: {
        ...Fonts.style.h6,
        textAlign: 'center',
        padding: Metrics.baseMargin,
        color: 'black',
        fontWeight: 'bold'
    },
    value: {
        ...Fonts.style.normal,
        color: 'grey'
    },
    bottomWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Metrics.baseMargin,
        flex: 1,
    },
    paybackText: {
        ...Fonts.style.h1,
        color: 'black',
        textAlign: 'center'
    },
    interestText: {
        ...Fonts.style.description,
        color: 'gray',
        textAlign: 'center'
    },
    amountDue: {

    }
})
