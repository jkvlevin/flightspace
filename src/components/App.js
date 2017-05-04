import React, { PropTypes } from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{margin:0, padding:0, minWidth:"768px"}}>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
