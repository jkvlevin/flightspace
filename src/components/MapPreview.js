import React from 'react';
import Map from '../containers/Map/index';

class IMap extends React.Component {
  render() {
    return (
      <div style={{width:"100%", height:"100vh", padding:"4vh", backgroundColor:"#343332"}}>
        <Map showForm={false} style={{border:"thin solid #f8f8f8"}}/>
      </div>
    );
  }
}

export default IMap;
