import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ApartmentAmenityView from './ApartmentAmentityView';

import constants from '../constants';

const APARTMENT = gql`
  query Apartment($id: String!) {
    apartment(_id: $id) {
      _id
      owner {
        _id
        email
        # Fixed a backend bug to stitch profile data with the owner context in a single query
        profile {
          firstName
          lastName
          role
        }
      }
      title
      location {
        title
      }
      size
      price
      images
      amenities
      details {
        rooms
        bedrooms
        floor
        bathrooms
      }
      services
    }
  }
`;

const ApartmentView = props => {
  const {
    match: { params },
  } = props;
  const { apartmentId } = params;

  const { loading, error, data } = useQuery(APARTMENT, {
    variables: { id: apartmentId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  const { apartment } = data;
  const {
    owner: {
      email,
      profile: { firstName, lastName, role },
    },
  } = apartment;

  const image = `${constants.baseUrl}images/apartments/${apartment.images[0]}`;
  return (
    <div className="container-fl clearfix">
      <div className="col-12">
        <div className="view-apartment">
          <div className="view-apartment-item">
            <div className="view-apartment-item-content">
              <div className="_3im4pDXrDfzNRT2AlvLfD6">
                <div className="listing-image">
                  <div
                    className="media-cover"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                    }}
                  ></div>
                  <div className="_3Ts2_4uirKsrlm2Qb57Avw"></div>
                  <div className="Ok22VaqPDW9x1uaR46cRO _3ORDzmMDnpzTXIIXjJsRw7">
                    <span>{apartment.price} €</span>
                    <span className="_17Hci6D5EewOTY42eIXhPy">
                      <span className="_2GcdOjvYR400SpIsNOxzGK">/</span>
                      <span>Monat</span>
                    </span>
                  </div>
                </div>
                <div className="listing-details-container">
                  <div className="listing-details">
                    <div className="_3-hUUH6d0vGND3vUzaybD0 Lsdn2hC-tehVod76x4HzK">
                      <span className="text-truncate text-first-capitalize _1NES5HH5UNUjUVK5_-d-AG">
                        {apartment.title}
                      </span>
                    </div>
                    <div className="_17om8IEGFeu2W2TBOJ6xQs Lsdn2hC-tehVod76x4HzK text-truncate">
                      <span>{apartment.size} m²</span>
                    </div>
                    <div className="f9YmKwMaSOdtYnk_Qz-iT">
                      <div className="dVjtBg_ihJ63cZB8GwE0g text-truncate">
                        <ApartmentAmenityView amenities={apartment.amenities} limit="20" />
                      </div>
                    </div>
                    <div className="owner-info">
                      <h4>Owner&apos;s Info</h4>
                      <p>{firstName} {lastName}</p>
                      <p>{role}</p>
                      <p>{email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ApartmentView.propTypes = {
  match: PropTypes.object,
  apartment: PropTypes.object,
};

export default ApartmentView;
