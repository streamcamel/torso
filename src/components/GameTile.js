import React from 'react';
import { useHistory } from "react-router-dom";


const GameTile = (props) => {
    let history = useHistory();

    const onClick = (e) => {
        e.preventDefault();
        history.push('/game/'+props.game.slug)
    }

    let iconurl = ""         
    if(props.game.box_art_url != null) {
        iconurl = props.game.box_art_url.replace('-{width}x{height}', '')
    }

    return (
        <div className="GameTile" onClick={onClick}>
            <div className="GameTileIconWrapper">
                <img src={iconurl} alt={props.game.name} className="GameTileIcon" />
            </div>
            <div className="GameTileName">{props.game.name}</div>
            <div className="GameTileViewsCount">{props.game.viewers} viewers</div>
        </div>
    );
};


export default GameTile