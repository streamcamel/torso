import React, { useState  } from 'react';
import CompanyTile from './CompanyTile'
import GameTile from './GameTile'
import LoadMore from './LoadMore'

const CompaniesAndGamesList = (props) => {
    
    let itemCountIncrement = 18;
    if(window.innerWidth <= 800) {
        itemCountIncrement = 9;
    }
    const [itemCountMax, setItemCountMax] = useState(itemCountIncrement);

    const onLoadMore = () => {
        setItemCountMax(itemCountMax+itemCountIncrement);
    };
    
    const isGame = (obj) => {
        if( ('company_id' in obj) || ('game_id' in obj)) {
            return true;
        }
        return false;
    };
    
    const getViewer = (obj) => {
        if( isGame(obj) ) {
            return obj['viewers'];
        } else {
            return obj['viewer_count_average'];
        }
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
            if( isGame(value) ) {
                return <GameTile key={'game_'+value.game_id} game={value}/>
            } else {
                return <CompanyTile key={'company_'+value.id} company={value}/>
            }
        });

        if(itemCountMax < tiles.length) {
            loadMore = <LoadMore onLoadMore={onLoadMore} />
        }

        tiles = tiles.slice(0, itemCountMax);
        tileGrid = <div className="CompaniesGrid"> {tiles} </div>
    }
    
    return (
        <div className="CompaniesAndGamesList">
            {tileGrid}
            {loadMore}
        </div>
    );
};

export default CompaniesAndGamesList;