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
    
    const onPush = (path) => {
        history.push({pathname:path, search:location.search});
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
            
            let actionable = 'SectionTitleClickable';
            if(h.selected){
                actionable = 'SectionTitleSelected';
            }

            headers.push(
                <span className={actionable} onClick={() => {onPush(h.path)}}>{h.title}</span>    
            );
        }
    }
    
    let filter = '';
    if(props.onFilter) {
        filter =    <div className="SectionHeaderFilter">
                        <span>Filter </span>
                        <input ref={refInput} type="text" onKeyDown={onFilter} />
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