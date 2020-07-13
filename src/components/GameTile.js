import React from 'react';
import ReactTooltip from "react-tooltip";
import { useLocation, useHistory } from "react-router-dom";

import { numberWithCommas } from '../utils';

const GameTile = (props) => {
    let history = useHistory();
    let location = useLocation();

    const onClick = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        if(props.game.slug) {
            history.push({pathname:('/game/'+props.game.slug), search:location.search});
        }
    }

    let iconurl = ""         
    if(props.game.box_art_url != null) {
        // box size ration is 3:4
        iconurl = props.game.box_art_url.replace('-{width}x{height}', '-90x120')
    }

    let viewers = ""
    if (props.game.viewers != null) {
        viewers = numberWithCommas(props.game.viewers)
    }
    
    let wrapperClass = "GameTileIconWrapper";
    if(!props.game.slug) {
        wrapperClass += " NoPointerCursor";
    }

    return (
        <div className="GameTile" onClick={onClick}>
            <div className={wrapperClass}>
                <img src={iconurl} alt={'boximg-'+props.game.slug} className="GameTileIcon" />
            </div>
            <div className="GameTileName">{props.game.name}</div>
            <img src={require("../images/viewer.svg")} alt="viewers" className="TileViewerImage" />
            <div className="GameTileViewsCount" data-tip="Average number of viewers in the last 7 days">{ viewers }</div>
            <ReactTooltip textColor='#000' backgroundColor='#999' effect='solid'/>
        </div>
    );
};


export default GameTile