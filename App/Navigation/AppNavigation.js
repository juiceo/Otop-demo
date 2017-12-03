import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import InvestorScreen from '../Containers/InvestorScreen'
import DepositScreen from '../Containers/DepositScreen';
import WithdrawScreen from '../Containers/WithdrawScreen';
import LoanScreen from '../Containers/LoanScreen';
import LoanDetailScreen from '../Containers/LoanDetailScreen';
import LoanSettingsScreen from '../Containers/LoanSettingsScreen';

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  InvestorScreen: { screen: InvestorScreen },
  DepositScreen: { screen: DepositScreen },
  WithdrawScreen: { screen: WithdrawScreen },
  LoanScreen: { screen: LoanScreen },
  LoanDetailScreen: { screen: LoanDetailScreen },
  LoanSettingsScreen: { screen: LoanSettingsScreen }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  })

export default PrimaryNav
