import React, {useState } from 'react';
import ReactTooltip from "react-tooltip";
import ModalClip from './ModalClip';

const ClipTile = (props) => {

    const [show, showClip] = useState(false); 

    const onClick = (e) => {
        e.preventDefault();
        showClip(true);
    }

    let iconurl = ""         
    if(props.clip.thumbnail_url != null) {
        // box size ration is 3:4
        iconurl = props.clip.thumbnail_url.replace('-{width}x{height}', '-480x272')

        // Temp while waiting for database
    } else {
        iconurl = 'https://clips-media-assets2.twitch.tv/AT-cm%7C766607977-preview-480x272.jpg'
    }
    
    //let viewers = numberWithCommas(props.clip.view_count);
    
    let wrapperClass = "ClipTileIconWrapper";
    if(!props.clip.id) {
        console.log('wtf')
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
            {
                show ? <ModalClip isOpen={show} clip={props.clip}/> : null
            }
            
        </div>
    );
};

export default ClipTile