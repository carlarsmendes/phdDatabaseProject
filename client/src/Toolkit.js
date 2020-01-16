import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Toolkit = props => (
  <div className="singleToolkit">
    <div className="textContent">
      <div className="singleToolkitContent">
        <h3>Title: {props.name}</h3>
        <p>Author: {props.author}</p>
        <p>Category: {props.category}</p>
        <p>Version: {props.version}</p>
        <p>Link: {props.link}</p>
        <button><a onClick={() => { props.handleUpdateToolkit(props.id); }}>Edit Toolkit </a></button>
        <button><a onClick={() => { props.handleDeleteToolkit(props.id); }}>Delete Toolkit</a></button>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleToolkitButtons">
      </div>
    </div>
  </div>
);

Toolkit.propTypes = {
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleUpdateToolkit: PropTypes.func.isRequired,
  handleDeleteToolkit: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Toolkit;