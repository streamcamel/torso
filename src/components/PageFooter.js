import React from 'react';
import { useLocation, useHistory, } from "react-router-dom";

const PageFooter = () => {
    let location = useLocation();
    let history = useHistory();

    const onShowPrivacy = () => {
        console.log(location)
        if(location.pathname.search("privacy=1")==-1) {
            if(location.pathname.search('\\?')==-1){
                history.push(location.pathname+'?privacy=1');
            } else {
                history.push(location.pathname+'&privacy=1');
            }
        }
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