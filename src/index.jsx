import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import firebase from 'firebase';

import reducers from './reducers';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers)

class App extends Component {

    componentWillMount() {
		var config = {
			apiKey: "AIzaSyBKTpHeLx-TryHpjM9pAAaNmsnVP_NpZG8",
			authDomain: "ebuilders-71832.firebaseapp.com",
			databaseURL: "https://ebuilders-71832.firebaseio.com",
			projectId: "ebuilders-71832",
			storageBucket: "ebuilders-71832.appspot.com",
			messagingSenderId: "581523529639"
		};
        firebase.initializeApp(config);
    }

    render() {

        return(
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route path='/home' component={ HomePage } />
                            <Route path='/' component={ LoginPage } />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )

    } 

}

ReactDOM.render(<App />, document.getElementById('root'));
