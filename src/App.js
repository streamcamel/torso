import React , { useState, useEffect } from 'react';

import './App.css';

import Companies from './components/Companies';
import MainToolbar from './components/MainToolbar';
import { PageHeader, PageFooter } from './components/StaticCompnents';

import CommandContext from './Contexts/CommandContext';


import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useHistory, 
  } from "react-router-dom";
  
//   function usePageViews() {
//     let location = useLocation();
//     React.useEffect(() => {
//       // ga.send(["pageview", location.pathname]);
//       console.log("locationlocationlocationlocation")
//       console.log(location)
//     }, [location]);
//   }
  


const App = () => {

    // usePageViews();
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        console.log("locationlocationlocationlocation")
    }, [location]);

    console.log(location)


    // This is to force update on ourself when we get an action
    const [appCommand, setAppCommand] = useState({commandID:0, command:'', commandData:null});

    const onGoHome = () => {
        setAppCommand({commandID:appCommand.commandID+1, command:'reset', commandData:null})
    }
    
    const onSearch = (keyword) => {
        console.log('APPs on search: ' + keyword)
        //setAppCommand({commandID:appCommand.commandID+1, command:'search', commandData:keyword})
        history.push('/search?' + keyword);
    };

    // <Companies command={appCommand} />

    return (
        <div className="App">
            <PageHeader title="Stream Camel" onGoHome={onGoHome}/>
            <MainToolbar parentOnSearch={onSearch} />
            <div className="MainBodyWrapper">
                <div className="MainBody">
                    <CommandContext.Provider value={appCommand}>
                        <Companies className="Companies" />
                    </CommandContext.Provider>
                </div>
            </div>
            <PageFooter />
        </div>
    );
};

export default App;
