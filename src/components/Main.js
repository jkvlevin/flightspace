import React from 'react';
import Header from './Header';
import Map from '../containers/Map/index';
import MarkupTool from '../containers/MarkupTool/index';


class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{width:"74%"}}>
          <Map showForm />
        </div>
        <div style={{width:"26%", float:"right"}}>
          <MarkupTool />
        </div>
      </div>
    );
  }
}

export default Main;
