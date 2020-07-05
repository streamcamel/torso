import React, {useState } from 'react';
import ReactTooltip from "react-tooltip";
import ModalClip from './ModalClip';
import { numberWithCommas } from '../utils';

const ClipTile = (props) => {

    const [show, showClip] = useState(false); 

    const onClick = (e) => {
        e.preventDefault();
        showClip(true);
    }
    
    const onCloseClip = () => {
        showClip(false);
    }

    let iconurl = ""         
    if(props.clip.thumbnail_url != null) {
        // box size ration is 3:4
        iconurl = props.clip.thumbnail_url.replace('-{width}x{height}', '-480x272')
    }

    let viewers = '';
    if (props.clip.view_count) {
        viewers = numberWithCommas(props.clip.view_count);
    }

    let wrapperClass = "ClipTileIconWrapper";
    if(!props.clip.id) {
        console.log('wtf')
        wrapperClass += " NoPointerCursor";
    }
    
    let title = props.clip.title;
    if(title.length > 21) {
        title = title.substr(0, 21) + '...';
    }

    return (
        <div className="ClipTile" onClick={onClick} title={props.clip.title}>
            <div className={wrapperClass}>
                <img src={iconurl} alt={'boximg-'+props.clip.id} className="ClipTileIcon" />
            </div>
            <div className="ClipTileName">{title}</div>
            <img src={require("../images/viewer.svg")} alt="viewers" className="TileViewerImage" />
            <div className="ClipTileViewsCount" data-tip="Life Time Viewers">{ viewers }</div>
            <ReactTooltip textColor='#000' backgroundColor='#999' effect='solid'/>
            {
                show ? <ModalClip isOpen={show} clip={props.clip} onCloseClip={onCloseClip}/> : null
            }
            
        </div>
    );
};

export default ClipTile
