import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Map, TileLayer } from 'react-leaflet';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import SearchIcon from 'react-icons/lib/md/location-searching';
import Spinner from 'react-spinkit';
import GeoJsonUpdatable from '../../components/GeoJsonUpdatable';
import MarkupTool from '../MarkupTool';

import * as actions from './actions';


class OrdinanceMap extends React.Component {
  constructor(props) {
   super(props);
   this.state = { areaInput: ''};
   this.handleAreaChange = this.handleAreaChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleAreaChange(event) {
    this.setState({ areaInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.queryArea(this.state.areaInput);
  }

  handleMapClick(event) {
    console.log(event);
  }

  render() {
    const cords = this.props.boundary.features[0].geometry.coordinates[0][0][0];
    // const cords = this.props.center.features[0].geometry.coordinates;
    return (
      <div id="map" style={{position:"relative"}}>
        <Map center={[cords[1], cords[0]]} zoom={13} style={{height:"92vh", width:"100%", zIndex:0, position:"absolute", borderRadius:"1px", borderRight:"thick double #878787"}}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamxldiIsImEiOiJjajBzc3BqenIwNDYxMzFqdzYwbWRtcGx5In0.pUNjlDw_oaas-HxBGdrI1Q"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJsonUpdatable
            data={this.props.boundary}
            color="#FFFFB6"
            weight="2"
            fillColor="#2FD566"
          />
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

        <form style={{marginTop:"20px", zIndex:10, position:"absolute", width:"200px", marginLeft:"70px"}} onSubmit={this.handleSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" onChange={this.handleAreaChange}/>
              <InputGroup.Button><Button onClick={this.handleSubmit}>
                {this.props.isQueryingData ? <Spinner spinnerName="circle" /> :  <SearchIcon />}
              </Button></InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    );
  }
}

OrdinanceMap.propTypes = {
  // center: PropTypes.object,
  boundary: PropTypes.object.isRequired,
  noFlyBuildings: PropTypes.array,
  flyAboveBuildings: PropTypes.array,
  noFlyFeatures: PropTypes.array,
  flyAboveFeatures: PropTypes.array,
  isQueryingData: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  buildingsSimplified: PropTypes.array,
  featuresSimplified: PropTypes.array,
  nonameFeatures: PropTypes.array
};

function mapStateToProps(state) {
  return {
    // center: state.mapReducer.center,
    boundary: state.mapReducer.boundary,
    noFlyBuildings: state.mapReducer.noFlyBuildings,
    flyAboveBuildings: state.mapReducer.flyAboveBuildings,
    buildingsSimplified: state.mapReducer.buildingsSimplified,
    flyAboveFeatures: state.mapReducer.flyAboveFeatures,
    noFlyFeatures: state.mapReducer.noFlyFeatures,
    featuresSimplified: state.mapReducer.featuresSimplified,
    isQueryingData: state.mapReducer.isQueryingData,
    nonameFeatures: state.mapReducer.nonameFeatures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(OrdinanceMap);
