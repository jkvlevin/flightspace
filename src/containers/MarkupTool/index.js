import React, { PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, FormGroup, FormControl, Form, ControlLabel } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import collapsiblecss from '../../static/collapsiblecss.css';

class MarkupTool extends React.Component {
  constructor(props) {
   super(props);
   this.state = { streets: [], otherFeatures: []};
  }

  componentDidMount() {
    let st = [];
    let oF = [];
    for (let i = 0; i < this.props.features.length; i++) {
      if (this.props.features[i].highway) {
        st.push(this.props.features[i]);
      } else {
        oF.push(this.props.features[i]);
      }
    }
    this.setState({ streets: st, otherFeatures: oF });
  }
  render() {
    return (
      <div id="features-bar" style={{backgroundColor:"#f8f8f8", height:"92vh", width:"100%", overflow:"scroll"}}>
        <Tabs>
          <TabList>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Buildings </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Streets </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Other </Tab>
            <Tab style={{backgroundColor:"#F8F8F8", color:"#262228", fontSize:"13px"}}> Settings </Tab>
          </TabList>

          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
            {this.props.buildings.map(building =>
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
                  <Button style={{backgroundColor:"#dc592f", color:"#f8f8f8"}}> Mark as No-Fly </Button>
                </div>
              </Collapsible>
            )}
            </Collapsible>
            <Collapsible trigger="No Fly" transitionTime={100} classParentString="Collapsible-t">
              <p>test</p>
            </Collapsible>
          </TabPanel>

          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
            {this.state.streets.map(street =>
              <Collapsible key={street.id} trigger={street.name} transitionTime={50}>
                <p>Fly Above: </p>
                <p>Set as No Fly </p>
              </Collapsible>
            )}
            </Collapsible>
            <Collapsible trigger="No Fly" transitionTime={100} classParentString="Collapsible-t">
              <p>test</p>
            </Collapsible>
          </TabPanel>

          <TabPanel style={{marginTop:"-8px"}}>
            <Collapsible trigger="Fly Above" open transitionTime={100} classParentString="Collapsible-t">
            {this.state.otherFeatures.map(feature =>
              <Collapsible key={feature.id} trigger={feature.name} transitionTime={50}>
                <p>Fly Above: </p>
                <p>Set as No Fly </p>
              </Collapsible>
            )}
            </Collapsible>
            <Collapsible trigger="No Fly" transitionTime={100} classParentString="Collapsible-t">
              <p>test</p>
            </Collapsible>
          </TabPanel>

          <TabPanel>
            <p>settings</p>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

MarkupTool.propTypes = {
  buildings: PropTypes.array,
  features: PropTypes.array
};

export default MarkupTool;
