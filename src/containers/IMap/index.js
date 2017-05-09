import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Map, TileLayer } from 'react-leaflet';
import GeoJsonUpdatable from '../../components/GeoJsonUpdatable';
import * as actions from './actions';

class IMap extends React.Component {
  componentDidMount() {
    console.log('componentDidMount called..')
    this.props.actions.loadIMap(this.props.params.mapid);
  }
  render() {
    let returnComp;
    console.log(this.props.center)
    if (Object.keys(this.props.center).length === 0) {
      returnComp = <div style={{textAlign:"center"}}><h1 style={{marginTop:"20%"}}>Loading...</h1></div>
    } else {
      const cords = this.props.center.features[0].geometry.coordinates;
      returnComp = (
        <div id="map" style={{position:"relative"}}>
          <div style={{zIndex:10, height:"25px", width:"160px", position:"absolute", marginLeft:"70%", marginTop:"10px", textAlign:"center", backgroundColor:"#282228"}}>
            <h5 style={{color:"#f8f8f8"}}> Max Fly Height: {this.props.maxFlyHeight}ft </h5>
          </div>
          <Map center={[cords[1], cords[0]]} zoom={14} style={{height:"100vh", width:"100%", zIndex:0, position:"absolute", borderRadius:"1px", borderRight:"thick double #878787"}}>
            <TileLayer
              url="https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamxldiIsImEiOiJjajBzc3BqenIwNDYxMzFqdzYwbWRtcGx5In0.pUNjlDw_oaas-HxBGdrI1Q"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.props.baseColor == '#2FD566' ?
            <GeoJsonUpdatable
              data={this.props.boundary}
              color="#FFFFB6"
              weight="2"
              fillColor={this.props.baseColor}
              key="map1"
            /> :
            <GeoJsonUpdatable
              data={this.props.boundary}
              color="#FFFFB6"
              weight="2"
              fillColor='red'
              key="map2"
            /> }
            <GeoJsonUpdatable
              data={{type: "FeatureCollection", features: this.props.nonameFeatures}}
              color="#878787"
              weight="1"
              onClick={this.handleMapClick}
            />
            <GeoJsonUpdatable
              data={{type: "FeatureCollection", features: this.props.flyAboveBuildings}}
              color="#f89526"
              weight="1"
              onClick={this.handleMapClick}
            />
            <GeoJsonUpdatable
              data={{type: "FeatureCollection", features: this.props.flyAboveFeatures}}
              color="#65cdf9"
              weight="1"
              onClick={this.handleMapClick}
            />
            <GeoJsonUpdatable
              data={{type: "FeatureCollection", features: this.props.noFlyBuildings}}
              color="red"
              weight="1"
              onClick={this.handleMapClick}
            />
            <GeoJsonUpdatable
              data={{type: "FeatureCollection", features: this.props.noFlyFeatures}}
              color="red"
              weight="1"
              onClick={this.handleMapClick}
            />
          </Map>
        </div>
      );
    }
    return returnComp;
  }
}

IMap.propTypes = {
  center: PropTypes.object,
  boundary: PropTypes.object,
  noFlyBuildings: PropTypes.array,
  flyAboveBuildings: PropTypes.array,
  noFlyFeatures: PropTypes.array,
  flyAboveFeatures: PropTypes.array,
  nonameFeatures: PropTypes.array,
  baseColor: PropTypes.string,
  maxFlyHeight: PropTypes.number
};

function mapStateToProps(state) {
  return {
    center: state.imapReducer.center,
    boundary: state.imapReducer.boundary,
    noFlyBuildings: state.imapReducer.noFlyBuildings,
    flyAboveBuildings: state.imapReducer.flyAboveBuildings,
    flyAboveFeatures: state.imapReducer.flyAboveFeatures,
    noFlyFeatures: state.imapReducer.noFlyFeatures,
    nonameFeatures: state.imapReducer.nonameFeatures,
    baseColor: state.imapReducer.baseColor,
    maxFlyHeight: state.imapReducer.maxFlyHeight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(IMap);
