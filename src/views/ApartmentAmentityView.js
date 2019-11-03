import React from 'react';

 const ApartmentAmenityView = ({amenities, limit = 4}) =>  {
    return amenities.map((item, idx) => {
      if (idx < limit) {
        return (
          <span key={idx} className="_1h9l4w0vvX6d56ZnJ3NLod">
              <i></i>
              <span>{item}</span>
            </span>
          )
      }
      return null;
    });
}

export default ApartmentAmenityView;