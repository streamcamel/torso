import React, { useRef, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import * as utils from '../utils'

// class MainToolbar extends React.Component {
const MainToolbar = () => {
    let history = useHistory();
    let location = useLocation();

    const refInput = useRef(null);

    const onSearch = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            if(event.target.value === ''){
                history.push('/');
            } else {
                history.push('/search/' + event.target.value);
            }
        }
    }

    useEffect(() => {
        let command = utils.pathToCommand(location.pathname);
        if(command !== 'search') {
            if(refInput.current !== undefined  &&  refInput.current !== null){
                refInput.current.value = '';
            }
        }
    }, [location]);

    return (
        <div className="MainToolbar">
            <div className="MainToolbarSectionSearch">
                <span className="MainToolbarSectionTitle">Search </span>
                <input ref={refInput} type="text" onKeyDown={onSearch} />
            </div>
        </div>
    );
};
  
export default MainToolbar