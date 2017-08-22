import React, {Component} from 'react';
import CurrencyAPI from '../../services/currency'
import RatesAutoComplete from "../../components/RatesAutoComplete/index";
import AppBarExampleComposition from "../../components/Header/index";

export default class Main extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                name: 'John',
                money: { USD: 100 }
            },
            rates: [],
            selectedCurrency: ''
        }
    }

    componentDidMount() {
        CurrencyAPI.getLatestRates('EUR').then((res) => this.setState({
            rates: res.rates
        }));
    }

    handleSelectFrom = (value) => {
        CurrencyAPI.getLatestRates(value).then((res) => this.setState({
            rates: res.rates
        }))
    };

    handleSelectTo = (value) => {
        this.setState({
            selectedCurrency: value
        })
    };

    render() {
        return (
            <div>
                <AppBarExampleComposition user={this.state.user}/>
                <div className="container">
                    <RatesAutoComplete data={Object.keys(this.state.user.money)} onSelect={this.handleSelectFrom}/>
                    <RatesAutoComplete data={Object.keys(this.state.rates)} onSelect={this.handleSelectTo}/>
                </div>
            </div>
        );
    }
}