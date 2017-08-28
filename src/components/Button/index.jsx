import React, {PropTypes} from 'react';
import RaisedButton from "material-ui/RaisedButton";

export default class ButtonSimple extends React.Component {

    static propTypes = {
    	onExchange: PropTypes.func
    };

    render() {
        return (
            <div className="primary-btn">
                <RaisedButton label="Exchange" primary onClick={this.props.onExchange}/>
            </div>
        )
    }
};

