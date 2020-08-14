import React, { Component } from 'react';
//import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
//import ProtectedRoute from './components/ProtectedRoute';

//import './App.css';

//import { loadUserInformation as loadUserInformationService } from './services/authentication';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loaded: false
        };
    }

    render() {
        
        return (
            <div className="App">   
            Text here                 
            </div>
        );
    }
}
export default App;