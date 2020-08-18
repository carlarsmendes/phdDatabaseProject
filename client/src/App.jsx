import React, { Component } from 'react';
//import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
//import Toolkit from './views/Toolkit';
import axios from "axios";
import Competency from './views/Competency/Competency';
import "./index.scss";
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

    /*componentDidMount() {
        axios.get("/users.json").then((response) => {
            this.setState({ users: response.data });
        });
    }*/

    render() {
        
        return (
            <div className="App"> 
                <h1>Competencies here</h1>  
                    <Competency />    
            </div>
        );
    }
}
export default App;