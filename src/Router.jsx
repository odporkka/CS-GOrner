import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from "./components/views/HomePage"
import AboutPage from "./components/views/AboutPage"
import ForumPage from "./components/views/ForumPage"
import MapPage from "./components/views/MapPage"
import ErrorPage404 from "./components/views/ErrorPage404"

/*
 * A <Switch> looks through its children <Route>s and
 * renders the first one that matches the current URL.
 */
const Router = () => (
    <Switch>
        <Route path="/forum" component={ForumPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/maps" component={MapPage} />
        <Route path="/map/:mapId" component={MapPage} />
        <Route path="/" exact={true} component={HomePage} />
        {/* Fallthrough if no route matches */}
        <Route path="*" component={ErrorPage404} />
    </Switch>
);

export default Router;