import React, {Component, PropTypes} from 'react';
import {Popover} from "material-ui/Popover";
import {List, ListItem} from "material-ui/List";

export default class Wallet extends Component {

    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            money: PropTypes.objectOf(PropTypes.number)
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpened: false
        };
    }

    handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({
            isOpened: true
        });
    };

    handleRequestClose = () => {
        this.setState({
            isOpened: false
        });
    };

    render() {
        const user = this.props.user;
        return (
            <div className="wallet">
                <strong>{user.name}</strong>
                <i
                    className="material-icons"
                    ref={(i) => {this.i = i}}
                    onClick={this.handleTouchTap}
                >
                    &#xE850;
                </i>
                <Popover
                    open={this.state.isOpened}
                    anchorEl={this.i}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <List>
                        {Object.keys(user.money)
                            .map((currency, index) => <ListItem
                                primaryText={user.money[currency]}
                                key={index}
                                secondaryText={currency}
                            />)}
                    </List>
                </Popover>
            </div>
        );
    }
}