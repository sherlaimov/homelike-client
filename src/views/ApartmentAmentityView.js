import React from 'react';
import PropTypes from 'prop-types';

const ApartmentAmenityView = ({ amenities, limit = 4 }) => {
  return amenities.map((item, idx) => {
    if (idx < limit) {
      return (
        <span key={idx} className="_1h9l4w0vvX6d56ZnJ3NLod">
          <i></i>
          <span>{item}</span>
        </span>
      );
    }
    return null;
  });
};

ApartmentAmenityView.propTypes = {
  amenities: PropTypes.array,
  limit: PropTypes.number,
};
export default ApartmentAmenityView;
