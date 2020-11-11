import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from '../Search/SearchForm';
import { connect } from 'react-redux';
import './profileList.scss';
import ProfileCard from './ProfileCard';
import { Tooltip } from 'antd';

function RenderProfileListPage(props) {
  const [searched, setSearched] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filteredChars = props.data.filter(char =>
      char.name.toLowerCase().includes(searched)
    );
    console.log(props.profiles);

    setFiltered(filteredChars);
  }, [searched, props.data]);

  function handleChange(e) {
    e.preventDefault();
    setSearched(e.target.value);
  }

  return (
    <div className="profile-container">
      <Link to="/">
        <i className="fas fa-house-user home-icon"></i>
      </Link>

      <div className="middle-content">
        <div className="sandbox sandbox-hello-people">
          <h1 className="profile-list-header">Meet Our Groomers</h1>
        </div>
        <SearchForm value={searched} handleChange={handleChange} />
        <Tooltip title="Map-View">
          <span>
            <Link to="/map-view">
              <i className="fas fa-globe-americas"></i>
            </Link>
          </span>
        </Tooltip>
      </div>

      <div className="profile-list">
        {filtered.map(item => (
          <ProfileCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    profiles: state.profiles,
  };
};

export default connect(mapStateToProps, {})(RenderProfileListPage);

// Don't forget your prop types! It will save you a lot of debugging headache as you add more features.
RenderProfileListPage.propTypes = {
  data: PropTypes.arrayOf(
    // Here is an example of enforcing an object structure that we expect to receive in our props:
    PropTypes.shape({
      // Here we require an id of type number or string to prevent a "unique key prop" warning
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      avatarUrl: PropTypes.string,
      created_at: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      updated_at: PropTypes.string,
    })
  ).isRequired,
};
