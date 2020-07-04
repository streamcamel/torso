import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

const ModalClip = (props) => {

    //const [dataGames, setDataGames] = useState([]); // Data state for the companies/games
    const [isOpen, setOpen] = useState(true);

    const onHideClip = () => {
        setOpen(false);
    }

    useEffect(() => {
    }, [isOpen]);

    let embedUrl = 'https://clips.twitch.tv/embed?clip=' + props.clip.id + '&parent=www.streamcamel.com&parent=localhost';
    return (
            <Modal
            className="ModalClipDialog" 
            isOpen={isOpen}
            >
                <div className="ModalClip">
                <span title="X" className="ModalClipCloseButton" onClick={onHideClip}>X</span>
                    <iframe title="Clip for TODO"
                            src={embedUrl} 
                            height="360" 
                            width="640" 
                            frameBorder="0" 
                            scrolling="no"
                            allowFullScreen={true}>
                    </iframe>
                </div>
            </Modal> 
    )
  }

  export default ModalClip;

  
  // var win = window.open();
  // win.document.write('<iframe src=' + embedUrl + 'height="360" width="640" frameborder="0" scrolling="no" allowfullscreen="true"> </iframe>');