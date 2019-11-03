import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Tooltip from "./components/tooltip";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

function Application() {
  const mapContainer = useRef(null);
  // Container to put React generated content in.
  const tooltipContainer = useRef(document.createElement("div"));

  const setTooltip = features => {
    if (features.length) {
      ReactDOM.render(
        React.createElement(Tooltip, {
          features
        }),
        tooltipContainer.current
      );
    } else {
      ReactDOM.unmountComponentAtNode(tooltipContainer.current);
    }
  };

  // Initialization.
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-79.38, 43.65],
      zoom: 12.5
    });

    map.on("load", () => {
      const tooltip = new mapboxgl.Marker(tooltipContainer.current, {
        offset: [-120, 0]
      })
        .setLngLat([0, 0])
        .addTo(map);

      map.on("mousemove", e => {
        const features = map.queryRenderedFeatures(e.point);
        tooltip.setLngLat(e.lngLat);
        map.getCanvas().style.cursor = features.length ? "pointer" : "";
        setTooltip(features);
      });
    });

    return function cleanup() {
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} className="absolute top right left bottom" />;
}

ReactDOM.render(<Application />, document.getElementById("app"));
