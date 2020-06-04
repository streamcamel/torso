import React, { useRef } from 'react';

const SectionHeader = (props) => {
    const refInput = useRef(null);

    const onFilter = (event) => {
        if(props.onFilter) {
            props.onFilter(event.target.value.toLocaleLowerCase());
        }
    }
    
    let headerkey = 0;
    let headers = [];
    
    if(props.headers) {
        let started = false;
        
        for(var h of props.headers) {
            if(started) {
                headers.push(
                        <span key={'headerkey_'+(headerkey++)} className="SectionTitleSplit">|</span>
                    );
            }
            
            started = true;
            
            if(h.selected){
                headers.push(
                    <span key={'headerkey_'+(headerkey++)} className="SectionTitleSelected">{h.title}</span>    
                );
            } else {
                headers.push(
                    <a key={'headerkey_'+(headerkey++)} href={h.path} className="SectionTitleClickable">{h.title}</a>    
                );
            }
        }
    }
    
    let filter = '';
    if(props.onFilter) {
        filter =    <div className="SectionHeaderFilter">
                        <span key={'headerkey_'+(headerkey++)}>Filter </span>
                        <input ref={refInput} type="text" onChange={onFilter} />
                    </div>
    }
    
    return (
        <div className="SectionHeader">
            <h2 className="SectionTitle">{headers}</h2>
            <br />
            {filter}
        </div>
    );
};
  
export default SectionHeader