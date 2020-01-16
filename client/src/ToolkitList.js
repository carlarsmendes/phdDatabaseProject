import React from 'react';
import PropTypes from 'prop-types';
import Toolkit from './Toolkit';

const ToolkitList = (props) => {
  const toolkitNodes = props.data.map(toolkit => (
    <Toolkit author={toolkit.author} name={toolkit.name}  category={toolkit.category} version={toolkit.version} 
    link={toolkit.link} 
    key={toolkit._id} id={toolkit._id} 
    timestamp={toolkit.updatedAt}
    handleUpdateToolkit={props.handleUpdateToolkit}
      handleDeleteToolkit={props.handleDeleteToolkit}>
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
    name: PropTypes.string,
  })),
  handleDeleteToolkit: PropTypes.func.isRequired,
  handleUpdateToolkit: PropTypes.func.isRequired,
};

ToolkitList.defaultProps = {
  data: [],
};

export default ToolkitList;