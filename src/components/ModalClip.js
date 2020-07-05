import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { isLocalNetwork } from '../utils';

const ModalClip = (props) => {
    const [isOpen, setOpen] = useState(true);

    const onHideClip = () => {
        setOpen(false);
        
        if(props.onCloseClip) {
            props.onCloseClip();
        }
    }
    
    useEffect(() => {
    }, [isOpen]);

    let embedUrl = 'https://clips.twitch.tv/embed?clip=' + props.clip.id + '&parent=www.streamcamel.com';
    if (isLocalNetwork()) {
        embedUrl += '&parent=localhost';
    }
    let title = 'Playing Clip ' + props.clip.title;


    const customStyles = {
      overlay: {zIndex: 1000}
    };

    return (<Modal style={customStyles} className="ModalClipDialog" isOpen={isOpen} onRequestClose={onHideClip}>
                <iframe title={title}
                        src={embedUrl} 
                        className="ModalClipIFrame"
                        frameBorder="0" 
                        scrolling="no"
                        allowFullScreen={true}>
                </iframe>
                <span title="X" className="ModalClipCloseButton" onClick={onHideClip}>X</span>
            </Modal>);
  }

  export default ModalClip;
