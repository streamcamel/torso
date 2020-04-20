import React from 'react';


const GamePage = (props) => {

    let iconurl = ""         
    if(props.game.box_art_url != null) {
        iconurl = props.game.box_art_url.replace('-{width}x{height}', '')
    }

    return (
        <div className="GamePage">
            <div className="GamePageIconWrapper">
                <img src={iconurl} alt={props.game.name} className="GamePageIcon" />
            </div>
        </div>
    );
};


export default GamePage