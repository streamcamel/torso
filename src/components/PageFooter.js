import React from 'react';
import { useLocation, useHistory, } from "react-router-dom";
import { URLSearchAddQuery } from '../utils'

const PageFooter = () => {
    let location = useLocation();
    let history = useHistory();

    const onShowPrivacy = () => {
        history.push({pathname:location.pathname, search:URLSearchAddQuery(location.search, 'privacy', 1)});
    }

    return (
        <div className="PageFooter">
            <div className="FooterLeft">
                <span className=".helperVerticalCenter">
                    <img src={require("../images/pagelogotiny.png")} alt="logo" className="PageFooterLogo" />
                </span>
                <span>Stream Camel © 2020</span>
            </div>

            <div className="FooterRight">
                <span className="FooterLink" onClick={onShowPrivacy}>Privacy</span>
                <a href="/press/index.php" className="FooterLink">About Us</a>
                <a href="mailto:contact@streamcamel.com" className="FooterLink">Contact</a>
            </div>
        </div>
    );
}

export default PageFooter;
