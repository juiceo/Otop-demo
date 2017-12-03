import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { Tile, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'


const investorScreenAction = NavigationActions.navigate({
  routeName: 'InvestorScreen',
  params: {}
});

const loanScreenAction = NavigationActions.navigate({
  routeName: 'LoanScreen',
  params: {}
});

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.blockBlue} onPress={() => this.props.navigation.dispatch(investorScreenAction)}>
          <Text style={styles.text}>{'INVESTOR DEMO'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blockRed} onPress={() => this.props.navigation.dispatch(loanScreenAction)}>
          <Text style={styles.text}>{'LENDER DEMO'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  blockRed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  blockBlue: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  }
})
