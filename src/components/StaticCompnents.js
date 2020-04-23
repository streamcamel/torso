import React from 'react';

// Function component
const PageHeader = ({ title, onGoHome }) => {
    return <div className="PageHeader" onClick={onGoHome} > { title } </div>    
};



const PageFooter = (props) => {

    const onShowPrivacy = () => {
        props.onShowPrivacy(true);
    }

    return (
        <div className="PageFooter">
            <span className="FooterLink FooterLeft" onClick={onShowPrivacy}>Privacy</span>
            <span className="FooterCenter">Stream Camel © 2020</span>
            <a href="mailto://contact@streamcamel.com" className="FooterLink FooterRight">Contact</a>
        </div>
    );
}

export {
    PageHeader,
    PageFooter
}