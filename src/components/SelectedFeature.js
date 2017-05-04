import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, Form, FormControl, Button } from 'react-bootstrap';

class SelectedFeature extends React.Component {
  render() {
    return (
      <div id="selected" style={{backgroundColor:"#343332", height:"190px", overflow:"scroll", border:"thin solid #FFFFB6"}}>
        <p style={{color:"#f8f8f8", marginLeft:"10px", paddingTop:"5px"}}> Selected Feature: {this.props.selectedSimplified.name} </p>
        <Form inline style={{borderBottom:"thin solid #f8f8f8"}}>
          <FormGroup>
            <ControlLabel style={{color:"#f8f8f8", fontWeight:"300", marginLeft:"15px"}}>Height:</ControlLabel>
            <input
              type="number"
              value={this.props.selectedSimplified.height}
              style={{marginLeft:"10px", marginRight:"10px", borderRadius:"5px", padding:"8px"}}
              onChange={this.props.changeHeight}
              id={this.props.type}
            />
          </FormGroup>
          <FormGroup style={{marginTop:"10px", paddingBottom:"10px"}}>
            <ControlLabel style={{color:"#f8f8f8", fontWeight:"300", marginLeft:"15px", marginRight:"5px"}}>Fly Above:</ControlLabel>
            <input
              type="number"
              value={this.props.selectedSimplified.flyAbove}
              style={{marginLeft:"10px", borderRadius:"5px", padding:"8px", maxWidth:"140px"}}
              onChange={this.props.changeFlyAbove}
              id={this.props.type}
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
  changeHeight: PropTypes.func,
  changeFlyAbove: PropTypes.func,
  type: PropTypes.string
};

export default SelectedFeature;
