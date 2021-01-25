import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Own classes/components
import AboutPage from './components/views/AboutPage'
import AdminLoginPage from './components/views/AdminLoginPage'
import AuthorPage from './components/views/AuthorPage'
import ErrorPage404 from './components/views/ErrorPage404'
import ForumPage from './components/views/ForumPage'
import HomePage from './components/views/HomePage'
import PostEditorPage from './components/views/PostEditorPage'
import SteamLoginPage from "./components/views/SteamLoginPage"
import TacticsBrowsePage from './components/views/TacticsBrowsePage'
import TacticPage from './components/views/TacticPage'



/**
 * Router component that handles different paths.
 * Renders views in components/views.
 */
const Router = () => {

    // A <Switch> looks through its children <Route>s and
    // renders the first one that matches the current URL.
    return (
        <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/tactics"  exact={true} component={TacticsBrowsePage} />
            <Route path="/tactics/:title" component={TacticPage} />
            <Route path="/authors" component={AuthorPage} />
            <Route path="/forum" component={ForumPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/post-editor" component={PostEditorPage} />
            <Route path="/admin" component={AdminLoginPage} />
            <Route path="/login" component={SteamLoginPage} />
            {/* Fallthrough if no route matches */}
            <Route path="*" component={ErrorPage404}/>
        </Switch>
    )
};

export default Router;