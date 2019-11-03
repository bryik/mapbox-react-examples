import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

function Application() {
  const [latLngZoom, setLatLngZoom] = useState({ lng: 5, lat: 34, zoom: 1.5 });
  const mapContainer = useRef(null);

  // Initialization.
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [5, 34],
      zoom: 1.5
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      setLatLngZoom({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    return function cleanup() {
      map.remove();
    };
  }, []);

  const { lng, lat, zoom } = latLngZoom;
  return (
    <>
      <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
      </div>
      <div ref={mapContainer} className="absolute top right left bottom" />
    </>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
