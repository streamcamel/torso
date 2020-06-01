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
    
    if(props.data && props.data.length > 0) {
        let count = 0;
        let tiles = [];

        props.data.sort(sorterMoreToLess);        

        for(var anObject of props.data){
            if(count >= itemCountMax)
                break;
            
            if( props.filter &&
                props.filter!=='' && 
                anObject.name.toLocaleLowerCase().indexOf(props.filter)===-1) {
                continue;
            }
            
            if( isGame(anObject) ) {
                tiles.push(
                    <GameTile key={'game_'+anObject.game_id} game={anObject}/>
                );
            } else {
                tiles.push(
                    <CompanyTile key={'company_'+anObject.id} company={anObject}/>
                );
            }
            count++;
        }

        tileGrid = <div className="CompaniesGrid"> {tiles} </div>
    }
    
    return (
        <div className="CompaniesAndGamesList">
            {tileGrid}
            <LoadMore onLoadMore={onLoadMore} />
        </div>
    );
};

export default CompaniesAndGamesList;