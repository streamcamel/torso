import React, { useRef, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";

const SectionHeader = (props) => {
    let location = useLocation();
    let history = useHistory();
    const refInput = useRef(null);

    const onFilter = (event) => {
        if(props.onFilter) {
            props.onFilter(event.target.value.toLocaleLowerCase());
        }
    }
    
    let headers = [];
    if(props.headers) {
        var started = false;
        
        for(var h of props.headers) {
            if(started) {
                headers.push(
                        <span className="SectionTitleSplit">|</span>
                    );
            }
            
            started = true;
            
            if(h.selected){
                headers.push(
                    <span className="SectionTitleSelected">{h.title}</span>    
                );
            } else {
                headers.push(
                    <a href={h.path} className="SectionTitleClickable">{h.title}</a>    
                );
            }
        }
    }
    
    let filter = '';
    if(props.onFilter) {
        filter =    <div className="SectionHeaderFilter">
                        <span>Filter </span>
                        <input ref={refInput} type="text" onChange={onFilter} />
                    </div>
    }
    
    return (
        <div className="SectionHeader">
            <h2 className="SectionTitle">{headers}</h2>
            {filter}
        </div>
    );
};
  
export default SectionHeader