import React from 'react';
import ClipTile from './ClipTile'

const ClipsList = (props) => {
    const getViewer = (obj) => {
       return obj['view_count'];
    };
    
    const sorterMoreToLess = (a,b) => {
        let va = getViewer(a);
        let vb = getViewer(b);
        return (vb-va);
    }
    
    let tileGrid = '';
    
    if(props.data && props.data.length > 0) {
        props.data.sort(sorterMoreToLess);        

        let tiles = props.data;
        if(props.filter) {
            tiles = props.data.filter( (value, index) => { 
                //Either we dont have a filer set, or the name of the tile contains the filter.
                return (value.name.toLocaleLowerCase().indexOf(props.filter) !== -1) ;
            });
        }

        tiles = tiles.map( (value) => {
            return <ClipTile key={value.id} clip={value}/>
        });

        tileGrid = <div className="ClipsGrid"> {tiles} </div>
    }
    
    return (
        <div className="ClipsList">
            {tileGrid}
        </div>
    );
};

export default ClipsList;
