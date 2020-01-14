import React, { Component } from 'react';
import ToolkitList from './ToolkitList';
import ToolkitForm from './ToolkitForm';
import DATA from './data';
import './ToolkitBox.css';

class ToolkitBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      name: '',version:'',  category: '',
      link:''

    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch('/api/comments/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }





  render() {
    return (
      <div className="container">
        <div className="toolkits">
          <h2>Toolkits:</h2>
          <ToolkitList data={this.state.data} />
        </div>
        <div className="form">
          <ToolkitForm author={this.state.author} name={this.state.name} version={this.state.version} category={this.state.category} link={this.state.link}/>
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default ToolkitBox;