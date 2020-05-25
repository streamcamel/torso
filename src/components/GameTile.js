import React from 'react';
import { useHistory } from "react-router-dom";

import { numberWithCommas } from '../utils';



const GameTile = (props) => {
    let history = useHistory();

    const onClick = (e) => {
        e.preventDefault();

        const selection = window.getSelection();
        if (selection.toString()) {
            return;
        }
        
        console.log(props.game);

        history.push('/game/'+props.game.slug)
    }

    let iconurl = ""         
    if(props.game.box_art_url != null) {
        // box size ration is 3:4
        iconurl = props.game.box_art_url.replace('-{width}x{height}', '-90x120')
    }

    return (
        <div className="GameTile" onClick={onClick}>
            <div className="GameTileIconWrapper">
                <img src={iconurl} alt={props.game.name} className="GameTileIcon" />
            </div>
            <div className="GameTileName">{props.game.name}</div>
            <div className="GameTileViewsCount">{ numberWithCommas(props.game.viewers) } viewers</div>
        </div>
    );
};


export default GameTile