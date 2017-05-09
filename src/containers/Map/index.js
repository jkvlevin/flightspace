import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Map, TileLayer } from 'react-leaflet';
import { FormGroup, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
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
    // const cords = this.props.boundary.features[0].geometry.coordinates[0][0][0];
    const cords = this.props.center.features[0].geometry.coordinates;
    return (
      <div id="map" style={{position:"relative"}}>
        <div style={{zIndex:10, height:"25px", width:"160px", position:"absolute", marginLeft:"70%", marginTop:"10px", textAlign:"center", backgroundColor:"#282228"}}>
          <h5 style={{color:"#f8f8f8"}}> Max Fly Height: {this.props.maxFlyHeight}ft </h5>
        </div>
        <Map center={[cords[1], cords[0]]} zoom={14} style={{height:"92vh", width:"100%", zIndex:0, position:"absolute", borderRadius:"1px", borderRight:"thick double #878787"}}>
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
            data={{type: "FeatureCollection", features: [this.props.selectedFeature]}}
            color="#FFFFB6"
            weight="4"
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
        {this.props.showForm ?
        <form style={{marginTop:"20px", zIndex:10, position:"absolute", width:"200px", marginLeft:"70px"}} onSubmit={this.handleSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" onChange={this.handleAreaChange}/>
              <InputGroup.Button><Button onClick={this.handleSubmit}>
                {this.props.isQueryingData ? <Spinner spinnerName="circle" /> :  <SearchIcon />}
              </Button></InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form> : "" }


        <Modal show={this.props.showSaveMessage} onHide={this.props.actions.close} animation={false}>
         <Modal.Header closeButton>
           <Modal.Title>Your map has been saved!</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p> To access your map, use the following URL: https://flightspace.herokuapp.com/#/map/{this.props.saveMapId}.</p>
            <p style={{marginTop:"35px"}}>
              Note: WRITE DOWN THIS URL. This URL is unique to your current map.
              If you lose track of it you will have to re save your map and a
              new URL will be generated.
            </p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.props.actions.close}>Close</Button>
         </Modal.Footer>
       </Modal>
      </div>
    );
  }
}

OrdinanceMap.propTypes = {
  center: PropTypes.object,
  boundary: PropTypes.object.isRequired,
  noFlyBuildings: PropTypes.array,
  flyAboveBuildings: PropTypes.array,
  noFlyFeatures: PropTypes.array,
  flyAboveFeatures: PropTypes.array,
  isQueryingData: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  nonameFeatures: PropTypes.array,
  selectedFeature: PropTypes.object,
  baseColor: PropTypes.string,
  showForm: PropTypes.bool,
  maxFlyHeight: PropTypes.number,
  showSaveMessage: PropTypes.bool,
  saveMapId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    center: state.mapReducer.center,
    boundary: state.mapReducer.boundary,
    noFlyBuildings: state.mapReducer.noFlyBuildings,
    flyAboveBuildings: state.mapReducer.flyAboveBuildings,
    flyAboveFeatures: state.mapReducer.flyAboveFeatures,
    noFlyFeatures: state.mapReducer.noFlyFeatures,
    isQueryingData: state.mapReducer.isQueryingData,
    nonameFeatures: state.mapReducer.nonameFeatures,
    selectedFeature: state.mapReducer.selectedFeature,
    baseColor: state.mapReducer.baseColor,
    maxFlyHeight: state.mapReducer.maxFlyHeight,
    showSaveMessage: state.mapReducer.showSaveMessage,
    saveMapId: state.mapReducer.saveMapId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(OrdinanceMap);
