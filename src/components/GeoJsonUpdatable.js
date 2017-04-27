// The component below was found and taken from a ticket on GitHub as a solution to non-updating
// react-leaflet geojson components. Found at: https://github.com/PaulLeCam/react-leaflet/issues/39
import React from 'react';
import { GeoJSON } from 'react-leaflet';

export default class GeoJsonUpdatable extends GeoJSON {
  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletElement.clearLayers();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletElement.addData(this.props.data);
    }
  }
}

GeoJsonUpdatable.propTypes = {
  data: React.PropTypes.object.isRequired,
};
