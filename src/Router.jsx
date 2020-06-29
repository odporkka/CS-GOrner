import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from "./components/views/HomePage"
import AboutPage from "./components/views/AboutPage"
import ForumPage from "./components/views/ForumPage"
import TacticsPage from "./components/views/TacticsPage"
import ErrorPage404 from "./components/views/ErrorPage404"
import PostEditorPage from "./components/views/PostEditorPage"

/*
 * A <Switch> looks through its children <Route>s and
 * renders the first one that matches the current URL.
 */
const Router = () => (
    <Switch>
        <Route path="/forum" component={ForumPage} />
        <Route path="/post-editor" component={PostEditorPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/tactics" component={TacticsPage} />
        <Route path="/tactics/:mapId" component={TacticsPage} />
        <Route path="/" exact={true} component={HomePage} />
        {/* Fallthrough if no route matches */}
        <Route path="*" component={ErrorPage404} />
    </Switch>
);

export default Router;