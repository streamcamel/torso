import React from 'react';
import ReactTooltip from "react-tooltip";

const ClipTile = (props) => {
    const onClick = (e) => {
        e.preventDefault();
    }

    let iconurl = ""         
    if(props.clip.thumbnail_url != null) {
        // box size ration is 3:4
        iconurl = props.clip.thumbnail_url.replace('-{width}x{height}', '-480x272')
    }
    
    //let viewers = numberWithCommas(props.clip.view_count);
    
    let wrapperClass = "ClipTileIconWrapper";
    if(!props.clip.id) {
        wrapperClass += " NoPointerCursor";
    }

    return (
        <div className="ClipTile" onClick={onClick}>
            <div className={wrapperClass}>
                <img src={iconurl} alt={'boximg-'+props.clip.id} className="ClipTileIcon" />
            </div>
            <div className="ClipTileName">{props.clip.title}</div>
            <img src={require("../images/viewer.svg")} alt="viewers" className="TileViewerImage" />
            <ReactTooltip textColor='#000' backgroundColor='#999' effect='solid'/>
        </div>
    );
};


export default ClipTile