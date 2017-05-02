import React, { PropTypes } from 'react';
import Map from '../containers/Map/index';
import MarkupTool from '../containers/MarkupTool/index';


class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{width:"70%"}}>
          <Map />
        </div>
        <div style={{width:"30%", float:"right"}}>
          <MarkupTool />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
