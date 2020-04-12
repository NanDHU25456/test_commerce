import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (localStorage.loggedIn && localStorage.loggedIn == "true") {
                return <Component {...props} />
            }
            return <Redirect to="/" />
        }
        }
    />
);

export default PrivateRoute