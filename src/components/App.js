import React, { PropTypes } from 'react';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{margin:0, padding:0}}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
