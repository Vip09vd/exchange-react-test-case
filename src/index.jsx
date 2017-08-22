import './assets/styles/style.scss'
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './containers/Main';
import {render} from 'react-dom';

render(
    <MuiThemeProvider>
        <Main/>
    </MuiThemeProvider>,
    document.getElementById('root')
);

