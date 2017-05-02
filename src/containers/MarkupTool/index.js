import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox, Radio } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import collapsiblecss from '../../static/collapsiblecss.css';
import * as actions from './actions';

class MarkupTool extends React.Component {
  constructor(props) {
   super(props);
   this.handleSetNoFlyBuilding = this.handleSetNoFlyBuilding.bind(this);
   this.handleSetNoFlyFeature = this.handleSetNoFlyFeature.bind(this);
   this.handleSetFlyAboveBuilding = this.handleSetFlyAboveBuilding.bind(this);
   this.handleSetFlyAboveFeature = this.handleSetFlyAboveFeature.bind(this);
  }

  handleSetNoFlyBuilding(event) {
    this.props.actions.setNoFlyBuilding(event.target.id);
  }
  handleSetNoFlyFeature(event) {
    this.props.actions.setNoFlyFeature(event.target.id, event.target.name);
  }
  handleSetFlyAboveBuilding(event) {
    this.props.actions.setFlyAboveBuilding(event.target.id);
  }
  handleSetFlyAboveFeature(event) {
    this.props.actions.setFlyAboveFeature(event.target.id, event.target.name);
  }


  render() {
    return (
      <div id="features-bar" style={{position:"relative", backgroundColor:"#f8f8f8", height:"92vh", width:"100%", overflow:"scroll"}}>
        <Tabs>
          <TabList>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Buildings </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Ways </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Other </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Settings </Tab>
          </TabList>

          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
            {this.props.buildingsSimplified.map(building => !building.noFly ?
              <Collapsible key={building.id} trigger={building.name} transitionTime={50}>
                <Form inline>
                  <FormGroup>
                    <ControlLabel style={{marginRight:"38px"}}>Height:</ControlLabel>
                    <FormControl
                      type="number"
                      value={building.height}
                    />
                  </FormGroup>
                  <FormGroup style={{marginTop:"10px"}}>
                    <ControlLabel style={{marginRight:"20px"}}>Fly Above:</ControlLabel>
                    <FormControl
                      type="number"
                      value={building.height + 50}
                    />
                  </FormGroup>
                </Form>
                <div style={{textAlign:"center", marginTop:"15px"}}>
                  <Button id={building.id} onClick={this.handleSetNoFlyBuilding} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as No-Fly </Button>
                </div>
              </Collapsible> : ""
            )}
            </Collapsible>

            <Collapsible trigger="No-Fly" transitionTime={100} classParentString="Collapsible-t">
              {this.props.buildingsSimplified.map(building => building.noFly ?
                <Collapsible key={building.id} trigger={building.name} transitionTime={50}>
                  <Form inline>
                    <FormGroup>
                      <ControlLabel style={{marginRight:"42px"}}>Height:</ControlLabel>
                      <FormControl
                        type="number"
                        value={building.height}
                      />
                    </FormGroup>
                    <FormGroup style={{marginTop:"10px"}}>
                      <ControlLabel style={{marginRight:"20px"}}>Fly Above:</ControlLabel>
                      <FormControl
                        type="number"
                        value={building.height + 50}
                      />
                    </FormGroup>
                  </Form>
                  <div style={{textAlign:"center", marginTop:"15px"}}>
                    <Button id={building.id} onClick={this.handleSetFlyAboveBuilding} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as Fly-Above </Button>
                  </div>
                </Collapsible> : ""
              )}
              </Collapsible>
          </TabPanel>

{/*  WAYS **************************************************************    */}

          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
            {this.props.waysSimplified.map(way => !way.noFly ?
              <Collapsible key={way.id} trigger={way.name} transitionTime={50}>
                <Form inline>
                  <FormGroup style={{marginTop:"10px"}}>
                    <ControlLabel style={{marginRight:"20px"}}>Fly Above:</ControlLabel>
                    <FormControl
                      type="number"
                      value={50}
                    />
                  </FormGroup>
                </Form>
                <div style={{textAlign:"center", marginTop:"15px"}}>
                  <Button id={way.id} name={"way"} onClick={this.handleSetNoFlyFeature} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as No-Fly </Button>
                </div>
              </Collapsible> : ""
            )}
            </Collapsible>

            <Collapsible trigger="No-Fly" transitionTime={100} classParentString="Collapsible-t">
              {this.props.waysSimplified.map(way => way.noFly ?
                <Collapsible key={way.id} trigger={way.name} transitionTime={50}>
                  <Form inline>
                    <FormGroup style={{marginTop:"10px"}}>
                      <ControlLabel style={{marginRight:"20px"}}>Fly Above:</ControlLabel>
                      <FormControl
                        type="number"
                        value={50}
                      />
                    </FormGroup>
                  </Form>
                  <div style={{textAlign:"center", marginTop:"15px"}}>
                    <Button id={way.id} onClick={this.handleSetFlyAboveFeature} name={"way"} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as Fly-Above </Button>
                  </div>
                </Collapsible> : ""
              )}
              </Collapsible>
          </TabPanel>

{/*  OTHER **************************************************************    */}
          <TabPanel style={{marginTop:"-8px"}}>
          <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
          {this.props.otherSimplified.map(feature => !feature.noFly ?
            <Collapsible key={feature.id} trigger={feature.name} transitionTime={50}>
              <Form inline>
                <FormGroup>
                  <ControlLabel style={{marginRight:"38px"}}>Height:</ControlLabel>
                  <FormControl
                    type="number"
                    value={feature.height}
                  />
                </FormGroup>
                <FormGroup style={{marginTop:"10px"}}>
                  <ControlLabel style={{marginRight:"20px"}}>Fly Above:</ControlLabel>
                  <FormControl
                    type="number"
                    value={feature.height + 50}
                  />
                </FormGroup>
              </Form>
              <div style={{textAlign:"center", marginTop:"15px"}}>
                <Button id={feature.id} name={"other"} onClick={this.handleSetNoFlyFeature} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as No-Fly </Button>
              </div>
            </Collapsible> : ""
          )}
          </Collapsible>

          <Collapsible trigger="No-Fly" transitionTime={100} classParentString="Collapsible-t">
            {this.props.otherSimplified.map(feature => feature.noFly ?
              <Collapsible key={feature.id} trigger={feature.name} transitionTime={50}>
                <Form inline>
                  <FormGroup>
                    <ControlLabel style={{marginRight:"42px"}}>Height:</ControlLabel>
                    <FormControl
                      type="number"
                      value={feature.height}
                    />
                  </FormGroup>
                  <FormGroup style={{marginTop:"10px"}}>
                    <ControlLabel style={{marginRight:"20px"}}>Fly Above:</ControlLabel>
                    <FormControl
                      type="number"
                      value={feature.height + 50}
                    />
                  </FormGroup>
                </Form>
                <div style={{textAlign:"center", marginTop:"15px"}}>
                  <Button onClick={this.handleSetFlyAboveFeature} name={"other"} id={feature.id} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as Fly-Above </Button>
                </div>
              </Collapsible> : ""
            )}
            </Collapsible>
          </TabPanel>

{/*  SETTINGS ***********************************************************    */}
          <TabPanel>
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
    );
  }
}

MarkupTool.propTypes = {
  waysSimplified: PropTypes.array.isRequired,
  otherSimplified: PropTypes.array,
  buildingsSimplified: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    waysSimplified: state.markuptoolReducer.waysSimplified,
    otherSimplified: state.markuptoolReducer.otherSimplified,
    buildingsSimplified: state.markuptoolReducer.buildingsSimplified
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkupTool);
