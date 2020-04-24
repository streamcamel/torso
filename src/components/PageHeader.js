import React from 'react';


// Function component
const PageHeader = ({ title, onGoHome }) => {
    return (
        <div className="PageHeader" onClick={onGoHome} > 
            <img src={require("../images/pagelogo.png")} alt="logo" className="PageHeaderLogo" />
            <span>{ title }</span> 
        </div>
    );
};

export default PageHeader;