import React, { useState  } from 'react';
import ClipTile from './ClipTile'
import LoadMore from './LoadMore'

const ClipsList = (props) => {
    
    let itemCountIncrement = 18;
    if(window.innerWidth <= 800) {
        itemCountIncrement = 9;
    }
    const [itemCountMax, setItemCountMax] = useState(itemCountIncrement);

    const onLoadMore = () => {
        setItemCountMax(itemCountMax+itemCountIncrement);
    };

    const getViewer = (obj) => {
       return obj['view_count'];
    };
    
    const sorterMoreToLess = (a,b) => {
        let va = getViewer(a);
        let vb = getViewer(b);
        return (vb-va);
    }
    
    let tileGrid = '';
    let loadMore = '';
    
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

        if(itemCountMax < tiles.length) {
            loadMore = <LoadMore onLoadMore={onLoadMore} />
        }

        tiles = tiles.slice(0, itemCountMax);
        tileGrid = <div className="CompaniesGrid"> {tiles} </div>
    }
    
    return (
        <div className="ClipsList">
            {tileGrid}
            {loadMore}
        </div>
    );
};

export default ClipsList;