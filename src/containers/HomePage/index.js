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


class HomePage extends React.Component {
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
    const cords = this.props.center.features[0].geometry.coordinates;
    return (
      <div>
        <div id="map" style={{position:"relative"}}>
          <Map center={[cords[1], cords[0]]} zoom={15} style={{height:"92vh", width:"70%", zIndex:0, position:"absolute", borderRadius:"1px", borderRight:"thick double #878787"}}>
            <TileLayer
              url="https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamxldiIsImEiOiJjajBzc3BqenIwNDYxMzFqdzYwbWRtcGx5In0.pUNjlDw_oaas-HxBGdrI1Q"
            />
            <GeoJsonUpdatable
              data={this.props.boundary}
              color="#FFFFB6"
              weight="2"
              fillColor="#2FD566"
            />
            <GeoJsonUpdatable
              data={this.props.noFlyBuildings}
              color="#dc592f"
              weight="1"
              onClick={this.handleMapClick}
            />
            <GeoJsonUpdatable
              data={this.props.flyAboveFeatures}
              color="#65cdf9"
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
        <div style={{width:"30%", float:"right"}}>
          <MarkupTool
            buildings={this.props.buildingsSimplified}
            features={this.props.featuresSimplified}
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  center: PropTypes.object.isRequired,
  boundary: PropTypes.object.isRequired,
  noFlyBuildings: PropTypes.object,
  flyAboveBuildings: PropTypes.object,
  noFlyFeatures: PropTypes.object,
  flyAboveFeatures: PropTypes.object,
  isQueryingData: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  namedBuildings: PropTypes.array,
  namedFeatures: PropTypes.array,
  buildingsSimplified: PropTypes.array,
  featuresSimplified: PropTypes.array
};

function mapStateToProps(state) {
  return {
    center: state.homeReducer.center,
    boundary: state.homeReducer.boundary,
    noFlyBuildings: state.homeReducer.noFlyBuildings,
    flyAboveBuildings: state.homeReducer.flyAboveBuildings,
    namedBuildings: state.homeReducer.namedBuildings,
    buildingsSimplified: state.homeReducer.buildingsSimplified,
    flyAboveFeatures: state.homeReducer.flyAboveFeatures,
    noFlyFeatures: state.homeReducer.noFlyFeatures,
    namedFeatures: state.homeReducer.namedFeatures,
    featuresSimplified: state.homeReducer.featuresSimplified,
    isQueryingData: state.homeReducer.isQueryingData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
