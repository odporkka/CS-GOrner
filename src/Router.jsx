import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from "./components/views/HomePage"
import AboutPage from "./components/views/AboutPage"
import ForumPage from "./components/views/ForumPage"
import TacticsBrowsePage from "./components/views/TacticsBrowsePage"
import TacticPage from "./components/views/TacticPage"
import ErrorPage404 from "./components/views/ErrorPage404"
import PostEditorPage from "./components/views/PostEditorPage"
import AdminLoginPage from "./components/views/AdminLoginPage"

/*
 * A <Switch> looks through its children <Route>s and
 * renders the first one that matches the current URL.
 */
const Router = () => {

    return (
        <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/tactics"  exact={true} component={TacticsBrowsePage} />
            <Route path="/tactics/:title" component={TacticPage} />
            <Route path="/forum" component={ForumPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/post-editor" component={PostEditorPage} />
            <Route path="/admin" component={AdminLoginPage} />
            {/* Fallthrough if no route matches */}
            <Route path="*" component={ErrorPage404}/>
        </Switch>
    )
};

export default Router;