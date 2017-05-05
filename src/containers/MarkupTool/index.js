import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, FormGroup, FormControl, Form, ControlLabel, Input, Checkbox, Radio, ListGroup, ListGroupItem } from 'react-bootstrap';
import SelectedFeature from '../../components/SelectedFeature';
import Collapsible from 'react-collapsible';
import collapsiblecss from '../../static/collapsiblecss.css';
import DownloadLink from 'react-download-link';
import FileReaderInput from 'react-file-reader-input';
import LoadIcon from 'react-icons/lib/md/cloud-download';
import SettingsIcon from 'react-icons/lib/md/settings';
import BuildingsIcon from 'react-icons/lib/go/home';
import FeaturesIcon from 'react-icons/lib/md/landscape';
import WaysIcon from 'react-icons/lib/go/milestone';
import * as actions from './actions';

class MarkupTool extends React.Component {
  constructor(props) {
   super(props);
   this.state = { type: 'b', nameType: 'fab', baseFly: true, dBH: 40, rFH: 50, file: ''}

   this.handleSetNoFlyBuilding = this.handleSetNoFlyBuilding.bind(this);
   this.handleSetNoFlyFeature = this.handleSetNoFlyFeature.bind(this);
   this.handleSetFlyAboveBuilding = this.handleSetFlyAboveBuilding.bind(this);
   this.handleSetFlyAboveFeature = this.handleSetFlyAboveFeature.bind(this);
   this.handleSelected = this.handleSelected.bind(this);
   this.handleHeightChange = this.handleHeightChange.bind(this);
   this.handleFlyAboveChange = this.handleFlyAboveChange.bind(this);
   this.handleBaseChange = this.handleBaseChange.bind(this);
   this.saveSettings = this.saveSettings.bind(this);
   this.handleDBHChange = this.handleDBHChange.bind(this);
   this.setNoDBH = this.setNoDBH.bind(this);
   this.handleRFHChange = this.handleRFHChange.bind(this);
   this.setNoRFH = this.setNoRFH.bind(this);
   this.assembleMapFile = this.assembleMapFile.bind(this);
   this.handleFileUpload = this.handleFileUpload.bind(this);
   this.handleMapData = this.handleMapData.bind(this);
  }

  handleFileUpload(event, results) {
    const reader = new FileReader();
    let text = '';

    reader.addEventListener("load", function(event) {
      const file = reader.result;
      this.handleMapData(file);
    }.bind(this), false);
    reader.readAsText(results[0][1]);
  }
  handleMapData(data) {
    this.props.actions.loadMapFileData(data);
  }
  assembleMapFile() {
    let file = {};
    file['waysSimplified'] = this.props.waysSimplified;
    file['otherSimplified'] = this.props.otherSimplified;
    file['buildingsSimplified'] = this.props.buildingsSimplified;
    file['center'] = this.props.center;
    file['boundary'] = this.props.boundary;
    file['noFlyBuildings'] = this.props.noFlyBuildings;
    file['flyAboveBuildings'] = this.props.flyAboveBuildings;
    file['buildingsSimplified'] = this.props.buildingsSimplified;
    file['flyAboveFeatures'] = this.props.flyAboveFeatures;
    file['noFlyFeatures'] = this.props.noFlyFeatures;
    file['isQueryingData'] = this.props.isQueryingData;
    file['nonameFeatures'] = this.props.nonameFeatures;
    file['baseColor'] = this.props.baseColor;
    return(JSON.stringify(file));
  }
  handleSetNoFlyBuilding(event) {
    if (event.target.id) {
      this.props.actions.setNoFlyBuilding(event.target.id);
    } else {
      console.log('no building selected');
    }
  }
  handleSetNoFlyFeature(event) {
    if (event.target.id) {
      this.props.actions.setNoFlyFeature(event.target.id, event.target.name);
    }
  }
  handleSetFlyAboveBuilding(event) {
    if (event.target.id) {
      this.props.actions.setFlyAboveBuilding(event.target.id);
    }
  }
  handleSetFlyAboveFeature(event) {
    if (event.target.id) {
      this.props.actions.setFlyAboveFeature(event.target.id, event.target.name);
    }
  }
  handleSelected(event) {
    if (event.target.name == 'fab' || event.target.name == 'nfb') {
      this.setState({ type: 'b' });
    } else {
      this.setState({ type: 'f' });
    }
    this.setState({ nameType: event.target.name });
    this.props.actions.changeSelected(event.target.id, event.target.name);
  }
  handleHeightChange(event) {
    this.props.actions.changeHeight(event.target.value, event.target.id);
  }
  handleFlyAboveChange(event) {
    this.props.actions.changeFlyAbove(event.target.value, event.target.id);
  }
  handleBaseChange(event) {
    this.setState({ baseFly: !this.state.baseFly });
  }
  handleDBHChange(event) {
    this.setState({ dBH: event.target.value });
  }
  setNoDBH(event) {
    this.setState({dBH: 0});
  }
  handleRFHChange(event) {
    this.setState({ rFH: event.target.value });
  }
  setNoRFH(event) {
    this.setState({rFH: 0});
  }
  saveSettings(event) {
    this.props.actions.updateSettings(this.state.baseFly, this.state.dBH, this.state.rFH);
  }

  render() {
    return (
      <div id="markup-tool" style={{height:"92vh", width:"100%", backgroundColor:"#f8f8f8"}}>
      { this.state.type == 'b' ?
        <SelectedFeature
          selectedSimplified={this.props.selectedSimplified}
          handleSetNoFly={this.handleSetNoFlyBuilding}
          handleSetFlyAbove={this.handleSetFlyAboveBuilding}
          changeHeight={this.handleHeightChange}
          changeFlyAbove={this.handleFlyAboveChange}
          type={this.state.nameType}
        /> :
        <SelectedFeature
          selectedSimplified={this.props.selectedSimplified}
          handleSetNoFly={this.handleSetNoFlyFeature}
          handleSetFlyAbove={this.handleSetFlyAboveFeature}
          changeHeight={this.handleHeightChange}
          changeFlyAbove={this.handleFlyAboveChange}
          type={this.state.nameType}
        />
      }

      <div id="features-bar" style={{maxHeight:"calc(92vh - 190px)", overflow:"scroll"}}>
        <Tabs>
          <TabList style={{textAlign:"center"}}>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"20px"}}> <BuildingsIcon /> </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"20px"}}> <WaysIcon /> </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"20px"}}> <FeaturesIcon /> </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"20px"}}> <SettingsIcon /> </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"20px"}}> <LoadIcon /> </Tab>
          </TabList>

          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" transitionTime={100} classParentString="Collapsible-t">
              <ListGroup>
                  {this.props.buildingsSimplified.map(building => !building.noFly ?
                    <ListGroupItem key={building.id} id={building.id} name={"fab"} onClick={this.handleSelected}>
                      {building.name}
                    </ListGroupItem>
                    : ""
                  )}
              </ListGroup>
            </Collapsible>
            <Collapsible trigger="No Fly" transitionTime={100} classParentString="Collapsible-t">
              <ListGroup>
                  {this.props.buildingsSimplified.map(building => building.noFly ?
                    <ListGroupItem key={building.id} id={building.id} name={"nfb"} onClick={this.handleSelected}>
                      {building.name}
                    </ListGroupItem>
                    : ""
                  )}
              </ListGroup>
            </Collapsible>
          </TabPanel>
        {/*  *****************************  WAYS *****************************/}
          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" transitionTime={100} classParentString="Collapsible-t">
              <ListGroup>
                  {this.props.waysSimplified.map(way => !way.noFly ?
                    <ListGroupItem key={way.id} id={way.id} name={"faw"} onClick={this.handleSelected}>
                      {way.name}
                    </ListGroupItem>
                    : ""
                  )}
              </ListGroup>
            </Collapsible>
            <Collapsible trigger="No Fly" transitionTime={100} classParentString="Collapsible-t">
              <ListGroup>
                  {this.props.waysSimplified.map(way => way.noFly ?
                    <ListGroupItem key={way.id} id={way.id} name={"nfw"} onClick={this.handleSelected}>
                      {way.name}
                    </ListGroupItem>
                    : ""
                  )}
              </ListGroup>
            </Collapsible>
          </TabPanel>
  {/*  *****************************  Other *****************************/}
          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" transitionTime={100} classParentString="Collapsible-t">
              <ListGroup>
                  {this.props.otherSimplified.map(other => !other.noFly ?
                    <ListGroupItem key={other.id} id={other.id} name={"fao"} onClick={this.handleSelected}>
                      {other.name}
                    </ListGroupItem>
                    : ""
                  )}
              </ListGroup>
            </Collapsible>
            <Collapsible trigger="No Fly" transitionTime={100} classParentString="Collapsible-t">
              <ListGroup>
                  {this.props.otherSimplified.map(other => other.noFly ?
                    <ListGroupItem key={other.id} id={other.id} name={"nfo"} onClick={this.handleSelected}>
                      {other.name}
                    </ListGroupItem>
                    : ""
                  )}
              </ListGroup>
            </Collapsible>
          </TabPanel>
{/*  *****************************  Settings *****************************/}

          <TabPanel style={{marginTop:"-8px"}}>
            <form style={{marginLeft:"20px", marginTop:"30px"}}>
              <FormGroup style={{width:"90%", borderBottom:"thin solid #878787"}}>
                <Checkbox checked={this.state.baseFly} onChange={this.handleBaseChange}>
                  Set default base layer ordinance as "Fly Above"
                </Checkbox>
              </FormGroup>
              <FormGroup style={{width:"90%", borderBottom:"thin solid #878787"}}>
                <Radio name="radioGroup1" checked={this.state.dBH == 0} onClick={this.setNoDBH} readOnly>
                  No default building height
                </Radio>
                {' '}
                <Radio name="radioGroup1" checked={this.state.dBH > 0} readOnly>
                  <FormControl
                    type="number"
                    value={this.state.dBH}
                    onChange={this.handleDBHChange}
                    style={{width:"80px"}}
                  />
                </Radio>
              </FormGroup>
              <FormGroup style={{width:"90%", borderBottom:"thin solid #878787"}}>
                <Radio name="radioGroup2" checked={this.state.rFH == 0} onClick={this.setNoRFH} readOnly>
                  No default relative fly above height
                </Radio>
                {' '}
                <Radio name="radioGroup2" checked={this.state.rFH > 0} readOnly>
                  <FormControl
                    type="number"
                    value={this.state.rFH}
                    onChange={this.handleRFHChange}
                    style={{width:"80px"}}
                  />
                </Radio>
              </FormGroup>
              <div style={{textAlign:"center", marginTop:"25px"}}>
                <Button onClick={this.saveSettings} style={{backgroundColor:"#1db954", color:"#f8f8f8", borderRadius:"15px"}}>Save Changes</Button>
              </div>
            </form>
          </TabPanel>

          <TabPanel style={{textAlign:"center", paddingTop:"15px"}}>
            <h5>Save your map for later use!</h5>
            <DownloadLink
	           filename="flight_ordinance_map.json"
	           label="Download Current Map"
	           exportFile={this.assembleMapFile}
            />
            <h5 style={{marginTop:"30px"}}>Upload existing map</h5>
            <FileReaderInput
              as="text"
              onChange={this.handleFileUpload}>
              <Button style={{borderRadius:"10px"}}>Upload Map</Button>
            </FileReaderInput>
          </TabPanel>

        </Tabs>
        </div>
      </div>
    );
  }
}

MarkupTool.propTypes = {
  waysSimplified: PropTypes.array.isRequired,
  otherSimplified: PropTypes.array,
  buildingsSimplified: PropTypes.array,
  selectedSimplified: PropTypes.object
};

function mapStateToProps(state) {
  return {
    waysSimplified: state.markuptoolReducer.waysSimplified,
    otherSimplified: state.markuptoolReducer.otherSimplified,
    buildingsSimplified: state.markuptoolReducer.buildingsSimplified,
    selectedSimplified: state.markuptoolReducer.selectedSimplified,
    center: state.mapReducer.center,
    boundary: state.mapReducer.boundary,
    noFlyBuildings: state.mapReducer.noFlyBuildings,
    flyAboveBuildings: state.mapReducer.flyAboveBuildings,
    flyAboveFeatures: state.mapReducer.flyAboveFeatures,
    noFlyFeatures: state.mapReducer.noFlyFeatures,
    isQueryingData: state.mapReducer.isQueryingData,
    nonameFeatures: state.mapReducer.nonameFeatures,
    selectedFeature: state.mapReducer.selectedFeature,
    baseColor: state.mapReducer.baseColor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkupTool);
