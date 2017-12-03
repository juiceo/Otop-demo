import _ from 'lodash';

const state = {
    investAccount: {
        high: 0,
        med: 0,
        low: 0
    },
    activeLoanType: null,
    loans: [],
    linkedAccount: null
};

const linkable_banks = [
    {
        id: 'nordea',
        name: 'Nordea'
    },
    {
        id: 'op',
        name: 'Osuuspankki'
    },
    {
        id: 'sampo',
        name: 'Sampo'
    }
];


export default MockService = {

    investAccountBalance: () => {
        return state.investAccount.high + state.investAccount.med + state.investAccount.low;
    },

    investAccount: () => {
        return state.investAccount;
    },

    getLinkableBanks: () => {
        return linkable_banks;
    },

    getLinkedBank: () => {
        return state.linkedAccount;
    },

    setLinkedBank: (bank) => {
        state.linkedAccount = bank
    },

    setActiveLoanType: (type) => {
        state.activeLoanType = type;
    },

    getActiveLoanType: (type) => {
        return state.activeLoanType;
    },

    getLoans: () => {
        return state.loans;
    },

    addLoan: (amount, paybackDate, paybackAmount, interest) => {
        const loan = {
            amount,
            paybackDate,
            paybackAmount,
            interest
        };
        state.loans = _.concat(state.loans, [loan]);
        state.bankAccount = state.bankAccount + paybackAmount;
    },

    payLoan: (loanId) => {
        // remove loan
    },

    investMoney: (amount, riskLevel) => {
        state.investAccount[riskLevel.id] += amount;
    },

    withdrawMoney: (amount, riskLevel) => {

    },


    RISK_HIGH: {
        id: 'high',
        name: 'High risk',
        profitRange: '8-15%',
        description: 'High risk loans will carry the highest long term profits, ranging from 8-15% p.a. Recommended investment horizon 1+ years.'
    },
    RISK_MED: {
        id: 'med',
        name: 'Medium risk',
        profitRange: '4-8%',
        description: 'Medium risk loans are a good medium between profit and risk aversion. Medium risk loans carry a decent long term profit of 4-8%'
    },
    RISK_LOW: {
        id: 'low',
        name: 'Low risk',
        profitRange: '2-4%',
        description: 'Low risk loans are only given out to users with A+ credit rating and a reliable payback history. Thus low risk loans carry a long term profit of under 4%.'
    }
};
