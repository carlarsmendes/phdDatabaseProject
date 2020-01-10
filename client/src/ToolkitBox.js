import React, { Component } from 'react';
import ToolkitList from './ToolkitList';
import ToolkitForm from './ToolkitForm';
import DATA from './data';
import './ToolkitBox.css';

class ToolkitBox extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">
        <div className="toolkits">
          <h2>Toolkits:</h2>
          <ToolkitList data={DATA} />
        </div>
        <div className="form">
          <ToolkitForm />
        </div>
      </div>
    );
  }
}

export default ToolkitBox;