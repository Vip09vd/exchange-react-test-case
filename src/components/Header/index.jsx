import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

class AppBarExampleComposition extends Component {
    render() {
        return (
                <AppBar
                    title="Money Exchange"
                    iconElementRight={<div><span>${this.props.user.money.USD}</span> <span>{this.props.user.name}</span></div>}
                    iconStyleRight={{display : 'flex', marginTop: 0, marginRight: 0, alignItems: 'center', color: '#fff'}}
                />
        );
    }
}

export default AppBarExampleComposition;