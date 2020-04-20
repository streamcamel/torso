import React from 'react';


const GameTile = (props) => {

    const onClick = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
        props.onClick(props.game);
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