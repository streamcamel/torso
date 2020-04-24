import React from 'react';
import { useLocation, useHistory, } from "react-router-dom";

// class MainToolbar extends React.Component {
const MainToolbar = () => {
    let history = useHistory();

    const onSearch = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            history.push('/search/' + event.target.value);
            event.target.value = "";
        }
    }

    return (
        <div className="MainToolbar">
            <div className="MainToolbarSectionSearch">
                <span className="MainToolbarSectionTitle">Search </span>
                <input type="text" onKeyDown={onSearch} />
            </div>
        </div>
    );
};
  
export default MainToolbar