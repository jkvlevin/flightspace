import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Map from '../containers/Map/index';
import MapPreview from './MapPreview.js';
import MarkupTool from '../containers/MarkupTool/index';
import styles from '../static/mapmodal.css';


class Main extends React.Component {
  constructor(props) {
   super(props);
   this.state = { show: false};
   this.displayMap = this.displayMap.bind(this);
   this.close = this.close.bind(this);
  }
  displayMap() {
    this.setState({ show: true });
  }
  close() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={this.close}
          animation={false}
          className="mapmodal"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <MapPreview />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Header
          displayMap={this.displayMap}
        />
        <div style={{width:"74%"}}>
          <Map showForm />
        </div>
        <div style={{width:"26%", float:"right"}}>
          <MarkupTool />
        </div>
      </div>
    );
  }
}

export default Main;
