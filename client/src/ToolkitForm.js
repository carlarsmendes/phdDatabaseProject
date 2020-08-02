/*import React from 'react';
import PropTypes from 'prop-types';

const ToolkitForm = props => (
  <form onSubmit={props.submitToolkit}>
    <input
      type="text"
      name="name"
      placeholder="Name of the Toolkit"
      value={props.text}
      onChange={props.handleChangeText}
    />
    <input 
    type="text"
      name="author"
      placeholder="Author"
      value={props.author}
      onChange={props.handleChangeText}
    />
        <input
      type="text"
      name="category"
      placeholder="Category"
      value={props.text}
      onChange={props.handleChangeText}
    />
            <input
      type="text"
      name="version"
      placeholder="Version"
      value={props.text}
      onChange={props.handleChangeText}
    />
                <input
      type="text"
      name="link"
      placeholder="Link"
      value={props.text}
      onChange={props.handleChangeText}
    />
    <button type="submit">Submit</button>
  </form>
);

ToolkitForm.propTypes = {
  submitToolkit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  name: PropTypes.string,
  author: PropTypes.string,
  version: PropTypes.string,
  category: PropTypes.string,
  link: PropTypes.string
};

ToolkitForm.defaultProps = {
  name: '',
  author: '',
  version: '',
  category: '',
  link: ''
};

export default ToolkitForm;*/