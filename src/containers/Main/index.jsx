import React, {Component} from 'react';
import CurrencyAPI from '../../services/currency'
import RatesAutoComplete from "../../components/RatesAutoComplete/index";
import AppBarExampleComposition from "../../components/Header/index";
import ButtonSimple from "../../components/Button/index";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

export default class Main extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                name: 'John',
                money: {USD: 100}
            },
            rates: [],
            selectedCurrencyTo: '',
            selectedCurrencyFrom: '',
            moneyToExchange: '0.00',
            isError: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        CurrencyAPI.getLatestRates().then((res) => this.setState({
            rates: res.rates
        }));
    }

    handleSelectFrom = (value) => {
        CurrencyAPI.getLatestRates(value).then((res) => this.setState({
            rates: res.rates,
            selectedCurrencyFrom: value
        }));
    };

    handleSelectTo = (value) => {
        this.setState({
            selectedCurrencyTo: value
        })
    };

    handleMoneyValueChange = ({target}) => {
        this.setState({
            moneyToExchange: target.value
        })
    };

    handleErrorClose = () => {
        this.setState({isError: false, errorMessage: ''});
    };

    handleChangeFrom = (value) => {
        if (!value) {
            this.setState({selectedCurrencyFrom: ''})
        }
    };

    handleChangeTo = (value) => {
        if (!value) {
            this.setState({selectedCurrencyTo: ''})
        }
    };

    handleExchange = () => {
        const {user, selectedCurrencyTo, selectedCurrencyFrom, rates} = this.state;
        const moneyToExchange = parseFloat(this.state.moneyToExchange);
        // Validate input values
        if (moneyToExchange > 0 && moneyToExchange <= user.money[selectedCurrencyFrom] && !isNaN(moneyToExchange) && selectedCurrencyTo) {
            const leftMoney = user.money[selectedCurrencyFrom] - moneyToExchange;
            const money = {
                ...user.money,
                [selectedCurrencyFrom]: leftMoney,
                [selectedCurrencyTo]: (user.money[selectedCurrencyFrom] * rates[selectedCurrencyTo]).toFixed(2)
            };
            if (!leftMoney) {
                delete money[selectedCurrencyFrom]; // clear empty currency field
            }
            this.setState({
                user: {
                    ...user,
                    money
                },
                selectedCurrencyFrom: '',
                selectedCurrencyTo: '',
                moneyToExchange: ''
            });
        } else if (moneyToExchange > user.money[selectedCurrencyFrom]) {
            this.setState({
                isError: true,
                errorMessage: 'You do not have that much money'
            })
        } else if (!selectedCurrencyTo || !selectedCurrencyFrom) {
            this.setState({
                isError: true,
                errorMessage: 'Please choose currency to exchange'
            })
        } else {
            this.setState({
                isError: true,
                errorMessage: 'Incorrect value'
            })
        }
    };

    render() {
        const {
            user, selectedCurrencyTo, selectedCurrencyFrom,
            rates, moneyToExchange, isError, errorMessage
        } = this.state;
        return (
            <div>
                <AppBarExampleComposition user={user}/>
                <div className="container">
                    <div className="exchange-field">
                        <RatesAutoComplete
                            hintText="Choose your currency"
                            data={Object.keys(user.money)}
                            value={selectedCurrencyFrom}
                            onChange={this.handleChangeFrom}
                            onSelect={this.handleSelectFrom}
                        />
                        <TextField
                            id="text-field-controlled"
                            value={moneyToExchange}
                            onChange={this.handleMoneyValueChange}
                            style={{width: 290}}
                        />
                    </div>
                    <div className="exchange-field">
                        <RatesAutoComplete
                            hintText="Choose currency to exchange"
                            data={Object.keys(rates)}
                            value={selectedCurrencyTo}
                            onChange={this.handleChangeTo}
                            onSelect={this.handleSelectTo}
                        />
                        <TextField
                            id="text-field-controlled"
                            value={(moneyToExchange * rates[selectedCurrencyTo] || 0).toFixed(2)}
                            style={{width: 290}}
                        />
                    </div>
                    <ButtonSimple onExchange={this.handleExchange}/>
                </div>
                <Snackbar
                    open={isError}
                    message={errorMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleErrorClose}
                />
            </div>
        );
    }
}