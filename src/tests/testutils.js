import { Provider } from 'react-redux';
import store from '../store'
import {  render as rtlRender} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export const render = component => rtlRender(
    //Browser router has to be added, JEST will throw an error regarding Navlinks
    <BrowserRouter>
        <Provider store={store}>
            {component}
        </Provider>
    </BrowserRouter>
)