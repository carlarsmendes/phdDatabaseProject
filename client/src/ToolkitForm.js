import React from 'react';
import PropTypes from 'prop-types';

const ToolkitForm = props => (
  <form onSubmit={props.submitToolkit}>
    <input
      type="text"
      name="author"
      placeholder="Your name…"
      value={props.author}
      onChange={props.handleChangeText}
    />
    <input
      type="text"
      name="text"
      placeholder="Say something..."
      value={props.text}
      onChange={props.handleTextChange}
    />
    <button type="submit">Submit</button>
  </form>
);

ToolkitForm.propTypes = {
  submitToolkit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  author: PropTypes.string,
};

ToolkitForm.defaultProps = {
  text: '',
  author: '',
};

export default ToolkitForm;