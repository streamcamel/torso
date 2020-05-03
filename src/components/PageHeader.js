import React from 'react';
import { useHistory } from "react-router-dom";


// Function component
const PageHeader = () => {
    let history = useHistory();

    const onGoHome = () => {
        history.push('/push');
    };

    return (
        <div title="PageHeader" className="PageHeader" onClick={onGoHome} > 
            <img src={require("../images/pagelogo.png")} alt="logo" className="PageHeaderLogo" />
            <span>Stream Camel</span> 
        </div>
    );
};

export default PageHeader;