import React, {Component, PropTypes} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class RatesAutoComplete extends Component {

    static propTypes = {
    	data: PropTypes.arrayOf(PropTypes.string),
        hintText: PropTypes.string,
        value: PropTypes.string,
        onSelect: PropTypes.func,
        onChange: PropTypes.func
    };

    handleNewRequest = (value) =>{
      this.props.onSelect(value);
    };

    handleChange = (value) => {
        this.props.onChange(value);
    };

    render() {
        const {hintText, data, value} = this.props;
        return (
            <AutoComplete
                hintText={hintText}
                dataSource={data}
                filter={(searchText, key) => key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1}
                openOnFocus={true}
                menuStyle={{maxHeight: 300, overflowY: 'auto'}}
                searchText={value}
                textFieldStyle={{width: 290}}
                onNewRequest={this.handleNewRequest}
                onUpdateInput={this.handleChange}
            />
        );
    }
}