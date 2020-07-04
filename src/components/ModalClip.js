import React, { useEffect } from 'react'
import Modal from 'react-modal';

const ModalClip = (props) => {

    //const [dataGames, setDataGames] = useState([]); // Data state for the companies/games

    useEffect(() => {
        // This crap does not work
        // console.log("set!!!");
        // console.log(document.getElementById('app'));
        // Modal.setAppElement(document.getElementById('app'));
    }, []);

    let embedUrl = '"https://clips.twitch.tv/embed?clip=' + props.clip.id + '&parent=www.streamcamel.com&parent=localhost"';
    console.log(embedUrl);
    return (
        <Modal
          isOpen={props.isOpen}
          //ariaHideApp={false}
          contentLabel="Example Modal"
        >
            <iframe title="Clip for TODO"
                    src={embedUrl} 
                    height="360" 
                    width="640" 
                    frameBorder="0" 
                    scrolling="no"
                    allowFullScreen={true}>
            </iframe>
            
        </Modal>
    )
  }

  export default ModalClip;

  
  // var win = window.open();
  // win.document.write('<iframe src=' + embedUrl + 'height="360" width="640" frameborder="0" scrolling="no" allowfullscreen="true"> </iframe>');