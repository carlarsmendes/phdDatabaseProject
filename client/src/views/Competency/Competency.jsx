import React, { Component } from "react";
import axios from "axios";
export default class Competency extends Component {

    constructor() {
        super();
        this.state = {
            competencies: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5010/api/competencies")
            .then(response => {
                console.log("response from api-->",response);
                this.setState({ competencies: response.data.competencies });
            });
    }

    render() {
        return(
        <div className="competenciesContainer">
            {this.state.competencies.map(competency => 
            <div className="competencies" key={competency._id}>
                <h2>{competency.name}</h2>
                <p>Summary: {competency.summary}</p>
            </div>    )
            }
        </div>)
        }
}
