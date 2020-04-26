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
            <span className="FooterLink FooterLeft" onClick={onShowPrivacy}>Privacy</span>
            <span className="FooterCenter">Stream Camel © 2020</span>
            <a href="mailto://contact@streamcamel.com" className="FooterLink FooterRight">Contact</a>
        </div>
    );
}

export default PageFooter;