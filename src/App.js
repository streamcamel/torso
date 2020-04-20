import React , { useState, createContext } from 'react';
import './App.css';
import Companies from './components/Companies'
import MainToolbar from './components/MainToolbar'
import CommandContext from './CommandContex'

// Function component
const PageHeader = ({ title, onGoHome }) => {
    return <div className="PageHeader" onClick={onGoHome} > { title } </div>    
};

const PageFooter = () => {
    return (
        <div className="PageFooter">
            <a href="/privacy" className="FooterLink FooterLeft">Privacy</a>
            <span className="FooterCenter">Stream Camel © 2020</span>
            <a href="mailto://robin@guibec.com" className="FooterLink FooterRight">Contact</a>
        </div>
    );
}

const App = () => {
    // This is to force update on ourself when we get an action
    const [appCommand, setAppCommand] = useState({commandID:0, command:'', commandData:null});

    const onGoHome = () => {
        setAppCommand({commandID:appCommand.commandID+1, command:'reset', commandData:null})
    }
    
    const onSearch = (keyword) => {
        console.log('APPs on search: ' + keyword)
        setAppCommand({commandID:appCommand.commandID+1, command:'search', commandData:keyword})
    };

    // <Companies command={appCommand} />

    return (
        <div className="App">
            <PageHeader title="Stream Camel" onGoHome={onGoHome}/>
            <MainToolbar parentOnSearch={onSearch} />
            <div className="MainBodyWrapper">
                <div className="MainBody">
                    <CommandContext.Provider value={appCommand}>
                        <Companies />
                    </CommandContext.Provider>
                </div>
            </div>
            <PageFooter />
        </div>
    );
};

export default App;
