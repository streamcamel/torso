import React from 'react';
import ReactTooltip from "react-tooltip";
import { useLocation, useHistory } from "react-router-dom";

import { numberWithCommas } from '../utils';

const UserTile = (props) => {
    let history = useHistory();
    let location = useLocation();

    const onClick = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        if(props.user.login) {
            history.push({pathname:('/user/'+props.user.login), search:location.search});
        }
    }

    let iconurl = ""         
    if(props.user.profile_image_url != null) {
        // box size ration is 3:4
        iconurl = props.user.profile_image_url.replace('-{width}x{height}', '-90x120')
    }
    
    let viewers = "0";
    if (props.user.viewers != null) {
        viewers = numberWithCommas(props.user.viewers);
    }
    
    let wrapperClass = "UserTileIconWrapper";
    if(!props.user.login) {
        wrapperClass += " NoPointerCursor";
    }

    return (
        <div className="UserTile" onClick={onClick}>
            <div className={wrapperClass}>
                <img src={iconurl} alt={'boximg-'+props.user.login} className="UserTileIcon" />
            </div>
            <div className="UserTileName">{props.user.display_name}</div>
            <img src={require("../images/viewer.svg")} alt="viewers" className="TileViewerImage" />
            <div className="UserTileViewsCount" data-tip="Average number of viewers in the last 7 days">{ viewers }</div>
            <ReactTooltip textColor='#000' backgroundColor='#999' effect='solid'/>
        </div>
    );
};


export default UserTile