import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox, Radio, ListGroup, ListGroupItem } from 'react-bootstrap';
import SelectedFeature from '../../components/SelectedFeature';
import Collapsible from 'react-collapsible';
import collapsiblecss from '../../static/collapsiblecss.css';
import * as actions from './actions';

class MarkupTool extends React.Component {
  constructor(props) {
   super(props);
   this.state = { type: 'b', nameType: 'fab' }

   this.handleSetNoFlyBuilding = this.handleSetNoFlyBuilding.bind(this);
   this.handleSetNoFlyFeature = this.handleSetNoFlyFeature.bind(this);
   this.handleSetFlyAboveBuilding = this.handleSetFlyAboveBuilding.bind(this);
   this.handleSetFlyAboveFeature = this.handleSetFlyAboveFeature.bind(this);
   this.handleSelected = this.handleSelected.bind(this);
   this.handleHeightChange = this.handleHeightChange.bind(this);
   this.handleFlyAboveChange = this.handleFlyAboveChange.bind(this);
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
    console.log(event.target.id);
    if (event.target.name == 'fab' || event.target.name == 'nfb') {
      this.setState({ type: 'b' });
    } else {
      this.setState({ type: 'f' });
    }
    this.setState({ nameType: event.target.name });
    this.props.actions.changeSelected(event.target.id, event.target.name);
  }
  handleHeightChange(event) {
    // this.props.actions.changeHeight(event.target.id, event.target.name);
  }
  handleFlyAboveChange(event) {
    // this.props.actions.handleFlyAboveChange(event.target.id, event.target.name);
  }


  render() {
    return (
      <div id="markup-tool" style={{height:"92vh", width:"100%"}}>
      { this.state.type == 'b' ?
        <SelectedFeature
          selectedSimplified={this.props.selectedSimplified}
          handleSetNoFly={this.handleSetNoFlyBuilding}
          handleSetFlyAbove={this.handleSetFlyAboveBuilding}
        /> :
        <SelectedFeature
          selectedSimplified={this.props.selectedSimplified}
          handleSetNoFly={this.handleSetNoFlyFeature}
          handleSetFlyAbove={this.handleSetFlyAboveFeature}
          type={this.state.nameType}
        />
      }

        <div id="features-bar" style={{backgroundColor:"#f8f8f8", maxHeight:"calc(92vh - 180px)", overflow:"scroll"}}>
          <Tabs>
            <TabList>
              <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Buildings </Tab>
              <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Ways </Tab>
              <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Other </Tab>
              <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Settings </Tab>
            </TabList>

            <TabPanel style={{marginTop:"-8px"}}>
              <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
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
              <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
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
              <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
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
              <form style={{marginLeft:"20px", marginTop:"20px"}}>
                <FormGroup style={{width:"90%", borderBottom:"thin solid #878787"}}>
                  <Checkbox>
                    Set default base layer ordinance as No-Fly
                  </Checkbox>
                </FormGroup>
                <FormGroup style={{width:"90%", borderBottom:"thin solid #878787"}}>
                  <Radio name="radioGroup">
                    No default building height
                  </Radio>
                  {' '}
                  <Radio name="radioGroup">
                    <FormControl
                      type="number"
                      value={10}
                      style={{width:"80px"}}
                    />
                  </Radio>
                </FormGroup>
                <FormGroup style={{width:"90%", borderBottom:"thin solid #878787"}}>
                  <Radio name="radioGroup">
                    No default relative fly above height
                  </Radio>
                  {' '}
                  <Radio name="radioGroup">
                    <FormControl
                      type="number"
                      value={10}
                      style={{width:"80px"}}
                    />
                  </Radio>
                </FormGroup>
                <Button type="submit">Save Changes</Button>
              </form>
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
    selectedSimplified: state.markuptoolReducer.selectedSimplified
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkupTool);
