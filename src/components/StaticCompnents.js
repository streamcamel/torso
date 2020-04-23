import React from 'react';

// Function component
const PageHeader = ({ title, onGoHome }) => {
    return <div className="PageHeader" onClick={onGoHome} > { title } </div>    
};



const PageFooter = () => {
    return (
        <div className="PageFooter">
            <a href="/privacy" className="FooterLink FooterLeft">Privacy</a>
            <span className="FooterCenter">Stream Camel © 2020</span>
            <a href="mailto://contact@streamcamel.com" className="FooterLink FooterRight">Contact</a>
        </div>
    );
}

export {
    PageHeader,
    PageFooter
}