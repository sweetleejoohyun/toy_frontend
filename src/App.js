import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.css';
import Theme from "./component/theme/Theme";
import Layout from "./component/layout/Layout";

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
