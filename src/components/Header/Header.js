import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export const Header = (props) => {
  const {
    surveyId,
    authenticated
  } = props;

  return (
    <header className="app__header">
      <nav>
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link--active"
              to="/builder"
            >
              Survey Builder
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link--active"
              to={{
                pathname: '/survey',
                search: surveyId && `id=${surveyId}`
              }}
            >
              Survey
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link--active"
              to="/responses"
            >
              Responses
            </NavLink>
          </li>

          {renderAuthLinks(authenticated)}

        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool,
  routing: PropTypes.object,
  surveyId: PropTypes.string
};

const renderAuthLinks = (authenticated) => {
  return authenticated ? (
      <li className="navigation__list-item">
        <NavLink
          className="navigation__link"
          activeClassName="navigation__link--active"
          to="/sign-out"
        >
          Sign out
        </NavLink>
      </li>
    )
    : [
      <li key={1} className="navigation__list-item">
        <NavLink
          className="navigation__link"
          activeClassName="navigation__link--active"
          to="/sign-in"
        >
          Sign in
        </NavLink>
      </li>,
      <li key={2} className="navigation__list-item">
        <NavLink
          className="navigation__link"
          activeClassName="navigation__link--active"
          to="/sign-up"
        >
          Sign up
        </NavLink>
      </li>
    ];
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  surveyId: Object.keys(state.surveys)[0], //Current implementation supports only one survey
  routing: state.routing //Otherwise active links are not updated, even though router setState happens
});

export default connect(mapStateToProps, null)(Header);