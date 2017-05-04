import React from 'react';
import Map from '../containers/Map/index';

class IMap extends React.Component {
  render() {
    return (
      <div style={{width:"100%", height:"100%", paddingTop:"4vh"}}>
        <Map />
      </div>
    );
  }
}

export default IMap;
