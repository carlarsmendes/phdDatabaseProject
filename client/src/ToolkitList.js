import React from 'react';
import PropTypes from 'prop-types';
import Toolkit from './Toolkit';

const ToolkitList = (props) => {
  const toolkitNodes = props.data.map(toolkit => (
    <Toolkit author={toolkit.author} key={toolkit._id} id={toolkit._id}>
      { toolkit.text}
    </Toolkit>
  ));
  return (
    <div>
      { toolkitNodes }
    </div>
  );
};

ToolkitList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
  })),
};

ToolkitList.defaultProps = {
  data: [],
};

export default ToolkitList;