import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { isLocalNetwork } from '../utils';

const ModalClip = (props) => {

    //const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [isOpen, setOpen] = useState(true);

    const onHideClip = () => {
        setOpen(false);
    }

    useEffect(() => {
    }, [isOpen]);


    let embedUrl = 'https://clips.twitch.tv/embed?clip=' + props.clip.id + '&parent=www.streamcamel.com';
    if (isLocalNetwork()) {
        embedUrl += '&parent=localhost';
    }
    let title = 'Playing Clip ' + props.clip.title;

    return (
            <Modal
            className="ModalClipDialog" 
            isOpen={isOpen}
            >
                <div className="ModalClip">
                <span title="X" className="ModalClipCloseButton" onClick={onHideClip}>X</span>
                    <iframe title={title}
                            src={embedUrl} 
                            height="540" 
                            width="960" 
                            frameBorder="0" 
                            scrolling="no"
                            allowFullScreen={true}>
                    </iframe>
                </div>
            </Modal> 
    )
  }

  export default ModalClip;
