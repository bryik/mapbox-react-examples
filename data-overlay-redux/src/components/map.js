import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

let Map = props => {
  const { active, data } = props;
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // Initialization.
  // prop.data may change, but we only want initialization to happen once.
  // useRef() creates an object that will persist between renders (and avoid
  // warnings about undeclared dependencies of useEffect)
  const initialData = useRef(data);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [5, 34],
      zoom: 1.5
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data: initialData.current
      });

      map.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries"
        },
        "country-label-lg"
      ); // ID metches `mapbox/streets-v9`

      setMap(map);
    });

    return function cleanup() {
      map.remove();
    };
  }, []);

  // setFill hook
  const { property, stops } = active;
  useEffect(() => {
    if (!map) {
      return;
    }

    map.setPaintProperty("countries", "fill-color", {
      property,
      stops
    });
  }, [map, property, stops]);

  return <div ref={mapContainer} className="absolute top right left bottom" />;
};

Map.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    data: state.data,
    active: state.active
  };
}
Map = connect(mapStateToProps)(Map);
export default Map;
