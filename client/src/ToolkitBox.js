import React, { Component } from 'react';
import ToolkitList from './ToolkitList';
import ToolkitForm from './ToolkitForm';
// import DATA from './data';
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
    fetch('/api/toolkits/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  

  onUpdateToolkit = (id) => {
    const oldToolkit = this.state.data.find(c => c._id === id);
    if (!oldToolkit) return;
    this.setState({
        author: oldToolkit.author,
        text: oldToolkit.text,
        updateId: id
    });
  }

  onDeleteToolkit = (id) => {
    const i = this.state.data.findIndex(c => c._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1),
    ];
    this.setState({ data });
    fetch(`api/toolkits/${id}`, { method: 'DELETE' })
      .then(res => res.json()).then((res) => {
        if (!res.success) this.setState({ error: res.error });
      });
  }

  submitToolkit = (e) => {
    e.preventDefault();
    console.log("here----> submitToolkit")
    const { author, name ,link,version,category} = this.state;
    console.log("author",author)
    if (!author || !name) return;
    fetch('/api/toolkits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, name,link,version,category }),
    }).then(res => res.json()).then((res) => {
      console.log("res after stringify and post",res);
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', name: '', error: null });
    });
  }

  submitNewToolkit = () => {
    const { author, name ,link,version,category } = this.state;
    const data = [
      ...this.state.data,
      {
        author, name ,link,version,category,
          _id: Date.now().toString(),
          updatedAt: new Date(),
          createdAt: new Date()
      },
    ];
    this.setState({ data });
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, name ,link,version,category }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', text: '', error: null });
    });
  }

  submitUpdatedToolkit = () => {
    const { author, name ,link,version,category, updateId } = this.state;
    fetch(`/api/comments/${updateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, name ,link,version,category }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ author: '', text: '', updateId: null });
    });
  }



  render() {
    return (
      <div className="container">

        <div className="form">
          <ToolkitForm author={this.state.author} name={this.state.name} version={this.state.version} category={this.state.category} link={this.state.link} handleChangeText={this.onChangeText} submitToolkit={this.submitToolkit}/>
        </div>
        {this.state.error && <p>{this.state.error}</p>}
        <div className="toolkits">
          <h2>Toolkits:</h2>
          <ToolkitList data={this.state.data} handleDeleteToolkit={this.onDeleteToolkit}
      handleUpdateToolkit={this.onUpdateToolkit}/>
        </div>
      </div>
    );
  }
}

export default ToolkitBox;