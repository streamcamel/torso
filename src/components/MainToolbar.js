import React from 'react';

// class MainToolbar extends React.Component {
const MainToolbar = (props) => {

    const onSearch = event => {
        if(event.key === 'Enter') {
            event.preventDefault();
            props.parentOnSearch(event.target.value)
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