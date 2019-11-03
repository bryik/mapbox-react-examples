import React from "react";
import PropTypes from "prop-types";

export default function Tooltip(props) {
  const { features } = props;

  const renderFeature = (feature, i) => {
    return (
      <div key={i}>
        <strong className="mr3">{feature.layer["source-layer"]}:</strong>
        <span className="color-gray-light">{feature.layer.id}</span>
      </div>
    );
  };

  return (
    <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom">
      <div className="flex-child px12 py12 bg-gray-dark color-white shadow-darken10 round txt-s w240 clip txt-truncate">
        {features.map(renderFeature)}
      </div>
      <span className="flex-child color-gray-dark triangle triangle--d"></span>
    </div>
  );
}

Tooltip.propTypes = {
  features: PropTypes.array.isRequired
};
