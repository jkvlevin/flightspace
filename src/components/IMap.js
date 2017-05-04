import React from 'react';
import Map from '../containers/Map/index';

class IMap extends React.Component {
  render() {
    return (
      <div style={{width:"100%", height:"100vh", padding:"4vh", backgroundColor:"#282228"}}>
        <Map showForm={false}/>
      </div>
    );
  }
}

export default IMap;
