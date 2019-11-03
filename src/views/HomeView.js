import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApartmentTileView from './ApartmentTileView';
import fetchApartmentsList from '../actions/apartmentsListActions';

class HomeView extends React.Component {
  componentDidMount() {
    this.props.fetchApartmentsList();
  }

  render() {
    const { apartmentsList, isLoading } = this.props;
    const { items: apartments } = apartmentsList;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container-list container-lg clearfix">
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            {apartments.length > 0 &&
              apartments.map((item, index) => <ApartmentTileView key={index} apartment={item} />)}
          </div>
        </div>
      </div>
    );
  }
}

HomeView.propTypes = {
  fetchApartmentsList: PropTypes.func,
  apartmentsList: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  apartmentsList: state.apartmentsList.apartments,
  isLoading: state.apartmentsList.isLoading
});

export default connect(
  mapStateToProps,
  { fetchApartmentsList }
)(HomeView);
