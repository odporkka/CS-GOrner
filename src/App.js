import React, { useEffect } from 'react';
import './App.css';

import ContentContextProvider from "./context/ContentContext"
import NavBar from "./components/navigation/NavBar"

function App() {
    return (
    <ContentContextProvider>
        <div className="App">
            <header className="App-header">
                <NavBar />
            </header>
        </div>
    </ContentContextProvider>
    );
}

export default App;
