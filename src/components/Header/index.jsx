import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import Wallet from "./Wallet/index";

class AppBarExampleComposition extends Component {

    static propTypes = {
    	user: PropTypes.shape({
            name: PropTypes.string,
            money: PropTypes.objectOf(PropTypes.number)
        })
    };

    render() {
        return (
            <AppBar
                title="Money Exchange"
                iconElementRight={<Wallet user={this.props.user}/>}
                iconStyleRight={{display: 'flex', marginTop: 0, marginRight: 0, alignItems: 'center', color: '#fff'}}
                showMenuIconButton={false}
                titleStyle={{fontSize: 22}}
            />
        );
    }
}

export default AppBarExampleComposition;