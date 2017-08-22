import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class RatesAutoComplete extends Component {

    handleNewRequest = (value) =>{
      this.props.onSelect(value);
    };

    render() {
        return (
            <AutoComplete
                onNewRequest={this.handleNewRequest}
                hintText="Choose currency to exchange"
                dataSource={this.props.data}
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                openOnFocus={true}
                menuStyle={{maxHeight: 300, overflowY: 'auto'}}
            />
        );
    }
}