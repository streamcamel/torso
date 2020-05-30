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
    

    let tileGrid = '';
    
    if(props.data !== undefined && props.data !== null && props.data.length > 0) {
        let count = 0;
        let tiles = [];
        
        for(var anObject of props.data){
            if(count >= itemCountMax)
                break;
            
            if( props.filter !== undefined &&
                props.filter !== null && 
                props.filter!=='' && 
                anObject.name.toLocaleLowerCase().indexOf(props.filter)===-1) {
                continue;
            }
            
            if( ('company_id' in anObject) || ('game_id' in anObject)) {
                //this is a game tile
                tiles.push(
                    <GameTile key={'game_'+anObject.game_id} game={anObject}/>
                );
            } else {
                //this is a company tile
                tiles.push(
                    <CompanyTile key={'company_'+anObject.id} company={anObject}/>
                );
            }
            count++;
        }

        tileGrid = <div className="CompaniesGrid"> {tiles} </div>
    }
    
    return (
        <div className="CompaniesListPage">
            {tileGrid}
            <LoadMore onLoadMore={onLoadMore} />
        </div>
    );
};

export default CompaniesAndGamesList;