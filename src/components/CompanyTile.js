import React from 'react';
import ReactTooltip from "react-tooltip";
import { useLocation, useHistory } from "react-router-dom";

import { numberWithCommas } from '../utils';

const CompanyTile = (props) => {
    let history = useHistory();
    let location = useLocation();

    const onClick = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        if(props.company.slug) {
            history.push({pathname:('/company/'+props.company.slug), search:location.search});
        }
    }

    let icon = null         
    if(props.company.url) {
        if(props.company.url !== ".jpg") {
            let iconurl = props.company.url.replace('t_thumb', 't_logo_med')

            if(props.company.alpha_channel === 1) {
                iconurl = iconurl.replace('.jpg', '.png')
            }

            iconurl = iconurl.replace(/^\/\// , 'https://')

            icon = <img src={iconurl} alt={props.company.name} className="CompanyTileIcon" />
        } else {
            console.log("Missing company icon : " + props.company.name);
            icon = <div className="MissingIcon">?</div>;
        }
    }

    let wrapperClass = "CompanyTileIconWrapper";
    if(!props.company.slug) {
        wrapperClass += " NoPointerCursor";
    }

    return (
        <div className="CompanyTile" onClick={onClick}>
            <div className={wrapperClass}>
                {icon}
            </div>
            <div className="CompanyTileName">{props.company.name}</div>
            <img src={require("../images/viewer.svg")} alt="viewers" className="TileViewerImage" />
            <div className="CompanyTileViewsCount" data-tip="Average number of viewers in the last 7 days">{numberWithCommas(props.company.viewer_count_average)}</div>
            <ReactTooltip textColor='#000' backgroundColor='#999' effect='solid'/>
        </div>
    );
};

export default CompanyTile