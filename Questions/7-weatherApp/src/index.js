import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import HomePage from './Pages/Home.page';
import WeatherPage from './Pages/Weather.page';
import NotFound from './Components/NotFound';
import store from './Reducers';
import { createPage } from './Helpers/page.helper';
import WeatherActions from './Actions/Weather.actions';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';

/**
 * App Route setup.
 * 
 * @description
 * Router dispatcher and main component of the app.
 * 
 * @returns {React.Component} The component.
 */
const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" exact component={ createPage(HomePage) } />
                <Route path="/weather/:country/:city" exact component={ createPage(WeatherPage, 'weather', WeatherActions) } />
                <Route path="*" component={ NotFound }/>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;