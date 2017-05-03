import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, Form, FormControl, Button } from 'react-bootstrap';

class SelectedFeature extends React.Component {
  render() {
    return (
      <div id="selected" style={{backgroundColor:"#343332", height:"180px", overflow:"scroll"}}>
        <p style={{color:"#f8f8f8", marginLeft:"10px", paddingTop:"5px"}}> Selected Feature: {this.props.selectedSimplified.name} </p>
        <Form inline style={{borderBottom:"thin solid #f8f8f8"}}>
          <FormGroup>
            <ControlLabel style={{marginRight:"35px", marginLeft:"10px", color:"#f8f8f8", fontWeight:"300"}}>Height:</ControlLabel>
            <FormControl
              type="number"
              value={this.props.selectedSimplified.height}
              style={{maxWidth:"90px"}}
              // onChange={this.handleHeightChange}
            />
          </FormGroup>
          <FormGroup style={{marginTop:"10px", paddingBottom:"10px"}}>
            <ControlLabel style={{marginRight:"15px", marginLeft:"10px", color:"#f8f8f8", fontWeight:"300"}}>Fly Above:</ControlLabel>
            <FormControl
              type="number"
              value={this.props.selectedSimplified.flyAbove}
              style={{maxWidth:"90px"}}
            />
          </FormGroup>
        </Form>
        <div style={{textAlign:"center", marginTop:"10px"}}>
          { this.props.selectedSimplified.noFly ? <Button onClick={this.props.handleSetFlyAbove} id={this.props.selectedSimplified.id} name={this.props.type} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as Fly Above </Button>
            : <Button id={this.props.selectedSimplified.id} onClick={this.props.handleSetNoFly} name={this.props.type} style={{backgroundColor:"#dc592f", color:"#f8f8f8"}} > Mark as No-Fly </Button> }
        </div>
      </div>
    );
  }
}

SelectedFeature.propTypes = {
  selectedSimplified: PropTypes.object,
  handleSetFlyAbove: PropTypes.func,
  handleSetNoFly: PropTypes.func,
  type: PropTypes.string
};

export default SelectedFeature;
